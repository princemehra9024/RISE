// ai-study.js — RISE AI Study Assistant (Google Gemini 2.5 Flash)

// ========== CONFIG ==========
const GEMINI_API_KEY = "AQ.Ab8RN6IEYFV5qpUC2cqbDEvqaClyhMFkR2R09EP6a3kXgW601Q";
const GEMINI_MODEL  = "gemini-3.6-flash";
const GEMINI_URL    = `https://generativelanguage.googleapis.com/v1beta/models/${GEMINI_MODEL}:streamGenerateContent?alt=sse&key=${GEMINI_API_KEY}`;

const SYSTEM_PROMPT = `You are Astra — a brilliant, friendly, and encouraging intelligent study companion for university students.
- Give clear, well-structured answers using proper markdown (headings, bold, lists, code blocks).
- For code: always specify the language after triple backticks (e.g. \`\`\`python).
- For math: explain step by step.
- Be concise but thorough. Use examples when helpful.
- End with a key takeaway when appropriate.`;

// ========== STATE ==========
let conversationHistory = []; // [{role:"user"|"assistant", content:"..."}]
let isStreaming = false;
let abortCtrl   = null;

// ========== CHAT STORAGE ==========
const STORAGE_KEY = "rise_ai_chats_v2";
let allChats    = JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]");
let activeChatId = null;

const genId = () => Date.now().toString(36) + Math.random().toString(36).slice(2, 6);

function saveChats() {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(allChats));
}

function createNewChat() {
    const chat = { id: genId(), title: "New chat", messages: [], createdAt: Date.now() };
    allChats.unshift(chat);
    activeChatId = chat.id;
    conversationHistory = [];
    saveChats();
    return chat;
}

function getActiveChat() { return allChats.find(c => c.id === activeChatId); }


// Convert our simple format → Gemini API format
function toGemini(msgs) {
    return msgs.map(m => ({
        role: m.role === "assistant" ? "model" : "user",
        parts: [{ text: m.content }]
    }));
}

// ========== INIT ==========
document.addEventListener("DOMContentLoaded", () => {
    // DOM refs
    const chatWindow   = document.getElementById("chatWindow");
    const chatInput    = document.getElementById("chatInput");
    const sendBtn      = document.getElementById("sendBtn");
    const welcomeMsg   = document.getElementById("welcomeMessage");
    const newChatBtn   = document.getElementById("newChatBtn");
    const sidebar      = document.getElementById("sidebar");
    const openSideBtn  = document.getElementById("openSidebarBtn");
    const closeSideBtn = document.getElementById("closeSidebarBtn");
    const overlay      = document.getElementById("sidebarOverlay");
    const historyList  = document.getElementById("historyList");
    const header       = document.querySelector(".ai-header");

    // ---- marked.js config ----
    if (typeof marked !== "undefined") {
        marked.setOptions({
            highlight(code, lang) {
                if (typeof hljs !== "undefined") {
                    if (lang && hljs.getLanguage(lang)) {
                        try { return hljs.highlight(code, { language: lang }).value; } catch(e) {}
                    }
                    try { return hljs.highlightAuto(code).value; } catch(e) {}
                }
                return code;
            },
            breaks: true,
            gfm: true
        });
    }

    // ---- Sidebar ----
    openSideBtn.addEventListener("click", () => {
        sidebar.classList.add("open");
        overlay.classList.add("visible");
    });
    const closeSidebar = () => { sidebar.classList.remove("open"); overlay.classList.remove("visible"); };
    closeSideBtn.addEventListener("click", closeSidebar);
    overlay.addEventListener("click", closeSidebar);

    // ---- Header scroll shadow ----
    chatWindow.addEventListener("scroll", () => {
        header.classList.toggle("scrolled", chatWindow.scrollTop > 10);
    });

    // ---- Input ----
    chatInput.addEventListener("input", function () {
        this.style.height = "auto";
        this.style.height = Math.min(this.scrollHeight, 200) + "px";
        sendBtn.disabled = this.value.trim() === "";
    });

    chatInput.addEventListener("keydown", e => {
        if (e.key === "Enter" && !e.shiftKey && !e.isComposing) { 
            e.preventDefault(); 
            if (!sendBtn.disabled && !isStreaming) handleSend(); 
        }
    });

    sendBtn.addEventListener("click", () => {
        isStreaming ? stopStreaming() : handleSend();
    });

    // ---- Suggestion cards ----
    document.querySelectorAll(".ai-suggest-card").forEach(card => {
        card.addEventListener("click", () => {
            const p = card.dataset.prompt;
            if (p) { chatInput.value = p; chatInput.dispatchEvent(new Event("input")); handleSend(); }
        });
    });

    // ---- New chat ----
    newChatBtn.addEventListener("click", () => { startFreshUI(); closeSidebar(); });

    function startFreshUI() {
        createNewChat();
        clearMessages();
        renderHistory();
        chatInput.focus();
    }

    function clearMessages() {
        chatWindow.querySelectorAll(".ai-message").forEach(m => m.remove());
        welcomeMsg?.classList.remove("hidden");
        chatInput.value = "";
        chatInput.style.height = "auto";
        sendBtn.disabled = true;
    }

    function updateChatTitle(chatId, text) {
        const chat = allChats.find(c => c.id === chatId);
        if (chat && chat.title === "New chat") {
            chat.title = text.slice(0, 42) + (text.length > 42 ? "…" : "");
            saveChats();
            renderHistory();
        }
    }

    function deleteChat(chatId) {
        allChats = allChats.filter(c => c.id !== chatId);
        saveChats();
        if (activeChatId === chatId) {
            allChats.length > 0 ? loadChat(allChats[0].id) : startFreshUI();
        }
        renderHistory();
    }

    // ---- History ----
    function renderHistory() {
        historyList.innerHTML = "";
        if (allChats.length === 0) {
            historyList.innerHTML = '<div class="history-empty">No conversations yet</div>';
            return;
        }
        const now = Date.now();
        const groups = { "Today": [], "Previous 7 Days": [], "Older": [] };
        allChats.forEach(c => {
            const age = now - c.createdAt;
            if (age < 86400000) groups["Today"].push(c);
            else if (age < 604800000) groups["Previous 7 Days"].push(c);
            else groups["Older"].push(c);
        });
        Object.entries(groups).forEach(([label, chats]) => {
            if (!chats.length) return;
            const g = document.createElement("div");
            g.className = "history-group";
            g.innerHTML = `<p class="history-label">${label}</p>`;
            chats.forEach(chat => {
                const btn = document.createElement("div");
                btn.className = "history-item" + (chat.id === activeChatId ? " active" : "");
                btn.innerHTML = `
                    <span class="history-item-text">${esc(chat.title)}</span>
                    <button class="history-delete" title="Delete">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M3 6h18"/><path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"/><path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"/></svg>
                    </button>`;
                btn.querySelector(".history-item-text").addEventListener("click", () => { loadChat(chat.id); closeSidebar(); });
                btn.querySelector(".history-delete").addEventListener("click", e => { e.stopPropagation(); deleteChat(chat.id); });
                g.appendChild(btn);
            });
            historyList.appendChild(g);
        });
    }

    // ---- Load chat ----
    function loadChat(chatId) {
        const chat = allChats.find(c => c.id === chatId);
        if (!chat) return;
        activeChatId = chatId;
        conversationHistory = [...chat.messages];
        chatWindow.querySelectorAll(".ai-message").forEach(m => m.remove());
        if (conversationHistory.length === 0) {
            welcomeMsg?.classList.remove("hidden");
        } else {
            welcomeMsg?.classList.add("hidden");
            conversationHistory.forEach(m => appendMsgUI(m.role, m.content));
        }
        renderHistory();
        scrollBottom();
    }

    // ---- Helpers ----
    const esc = t => { const d = document.createElement("div"); d.textContent = t; return d.innerHTML; };
    const scrollBottom = () => requestAnimationFrame(() => chatWindow.scrollTo({ top: chatWindow.scrollHeight, behavior: "smooth" }));

    function renderMarkdown(text) {
        if (typeof marked === "undefined") return esc(text).replace(/\n/g, "<br>");
        let html = marked.parse(text);
        // Inject copy button into code blocks
        const addCopyBtn = `<div class="code-block-header"><span>$1</span><button class="copy-code-btn" onclick="copyCodeBlock(this)"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="9" y="9" width="13" height="13" rx="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/></svg>Copy</button></div><pre><code class="language-$1">`;
        html = html.replace(/<pre><code class="language-(\w+)">/g, addCopyBtn);
        html = html.replace(/<pre><code>/g, `<div class="code-block-header"><span>code</span><button class="copy-code-btn" onclick="copyCodeBlock(this)"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="9" y="9" width="13" height="13" rx="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/></svg>Copy</button></div><pre><code>`);
        return html;
    }

    function appendMsgUI(role, content) {
        const div = document.createElement("div");
        div.className = `ai-message ai-message-${role === "user" ? "user" : "system"}`;
        const rendered = role === "user" ? `<p>${esc(content).replace(/\n/g, "<br>")}</p>` : renderMarkdown(content);
        const actions  = role === "assistant" ? `<div class="ai-msg-actions"><button class="msg-action-btn copy-msg-btn" title="Copy"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3"><rect x="9" y="9" width="13" height="13" rx="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/></svg></button></div>` : "";
        div.innerHTML = `<div class="ai-msg-avatar">${role === "user" ? "S" : "✦"}</div><div class="ai-msg-body"><div class="ai-msg-content">${rendered}</div>${actions}</div>`;
        div.querySelector(".copy-msg-btn")?.addEventListener("click", () => {
            navigator.clipboard.writeText(content).then(() => {
                const btn = div.querySelector(".copy-msg-btn");
                btn.innerHTML = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="20 6 9 17 4 12"/></svg>';
                setTimeout(() => { btn.innerHTML = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="9" y="9" width="13" height="13" rx="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/></svg>'; }, 2000);
            });
        });
        chatWindow.appendChild(div);
        return div;
    }

    function showTyping() {
        const div = document.createElement("div");
        div.className = "ai-message ai-message-system";
        div.id = "typingDot";
        div.innerHTML = `<div class="ai-msg-avatar">✦</div><div class="ai-msg-body"><div class="ai-msg-content"><div class="typing-indicator"><span class="typing-dot"></span><span class="typing-dot"></span><span class="typing-dot"></span></div></div></div>`;
        chatWindow.appendChild(div);
        scrollBottom();
    }
    const removeTyping = () => document.getElementById("typingDot")?.remove();

    // ---- API call ----
    async function callGemini(messages) {
        abortCtrl = new AbortController();
        isStreaming = true;
        sendBtn.classList.add("streaming");
        sendBtn.disabled = false;

        showTyping();

        try {
            const res = await fetch(GEMINI_URL, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    contents: toGemini(messages),
                    systemInstruction: { parts: [{ text: SYSTEM_PROMPT }] },
                    generationConfig: { temperature: 0.7, maxOutputTokens: 8192, topP: 0.95 }
                }),
                signal: abortCtrl.signal
            });

            if (!res.ok) {
                const err = await res.json().catch(() => ({}));
                throw new Error(err.error?.message || `HTTP ${res.status}`);
            }

            removeTyping();

            // Create streaming message container
            const msgDiv = document.createElement("div");
            msgDiv.className = "ai-message ai-message-system";
            msgDiv.innerHTML = `<div class="ai-msg-avatar">✦</div><div class="ai-msg-body"><div class="ai-msg-content"><span class="streaming-cursor">▊</span></div><div class="ai-msg-actions" style="opacity:0"><button class="msg-action-btn copy-msg-btn" title="Copy"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3"><rect x="9" y="9" width="13" height="13" rx="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/></svg></button></div></div>`;
            chatWindow.appendChild(msgDiv);
            const contentEl = msgDiv.querySelector(".ai-msg-content");

            let fullText = "";
            const reader  = res.body.getReader();
            const decoder = new TextDecoder();

            while (true) {
                const { done, value } = await reader.read();
                if (done) break;
                const chunk = decoder.decode(value, { stream: true });
                for (const line of chunk.split("\n")) {
                    const t = line.trim();
                    if (!t.startsWith("data:")) continue;
                    const data = t.slice(5).trim();
                    if (!data || data === "[DONE]") continue;
                    try {
                        const parsed = JSON.parse(data);
                        const text = parsed.candidates?.[0]?.content?.parts?.[0]?.text;
                        if (text) {
                            fullText += text;
                            contentEl.innerHTML = renderMarkdown(fullText) + '<span class="streaming-cursor">▊</span>';
                            scrollBottom();
                        }
                    } catch(e) { /* skip bad chunk */ }
                }
            }

            // Finalise
            contentEl.innerHTML = renderMarkdown(fullText);
            if (typeof hljs !== "undefined") contentEl.querySelectorAll("pre code").forEach(b => hljs.highlightElement(b));

            msgDiv.querySelector(".copy-msg-btn")?.addEventListener("click", () => {
                navigator.clipboard.writeText(fullText).then(() => {
                    const btn = msgDiv.querySelector(".copy-msg-btn");
                    btn.innerHTML = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="20 6 9 17 4 12"/></svg>';
                    setTimeout(() => { btn.innerHTML = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="9" y="9" width="13" height="13" rx="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/></svg>'; }, 2000);
                });
            });

            // Save
            conversationHistory.push({ role: "assistant", content: fullText });
            const chat = getActiveChat();
            if (chat) { chat.messages = [...conversationHistory]; saveChats(); }

        } catch (err) {
            removeTyping();
            if (err.name !== "AbortError") {
                console.error("Gemini error:", err);
                const errDiv = document.createElement("div");
                errDiv.className = "ai-message ai-message-system";
                errDiv.innerHTML = `<div class="ai-msg-avatar">✦</div><div class="ai-msg-body"><div class="ai-error-msg"><span>⚠️</span><span>${esc(err.message)}</span></div></div>`;
                chatWindow.appendChild(errDiv);
                scrollBottom();
            }
        } finally {
            isStreaming = false;
            abortCtrl   = null;
            sendBtn.classList.remove("streaming");
            sendBtn.disabled = chatInput.value.trim() === "";
        }
    }

    function stopStreaming() { abortCtrl?.abort(); }

    // ---- Send ----
    function handleSend() {
        const text = chatInput.value.trim();
        if (!text || isStreaming) return;

        if (!activeChatId) { createNewChat(); renderHistory(); }

        welcomeMsg?.classList.add("hidden");

        appendMsgUI("user", text);
        conversationHistory.push({ role: "user", content: text });

        const chat = getActiveChat();
        if (chat) { chat.messages = [...conversationHistory]; saveChats(); updateChatTitle(chat.id, text); }

        chatInput.value = "";
        chatInput.style.height = "auto";
        sendBtn.disabled = true;
        scrollBottom();

        callGemini([...conversationHistory]);
    }

    // ---- Boot ----
    if (allChats.length > 0) {
        loadChat(allChats[0].id);
    } else {
        createNewChat();
    }
    renderHistory();
    chatInput.focus();

    // ---- Auto start from topic parameter ----
    const urlParams = new URLSearchParams(window.location.search);
    const initialTopic = urlParams.get('topic');
    if (initialTopic) {
        // Clear param from URL to avoid re-triggering on refresh
        window.history.replaceState({}, document.title, "ai-study.html");
        
        chatInput.value = `Can you explain the topic: "${initialTopic}" in detail?`;
        chatInput.dispatchEvent(new Event("input"));
        setTimeout(() => handleSend(), 100); // small delay to let UI settle
    }
});

// ---- Copy code block (global) ----
window.copyCodeBlock = function(btn) {
    const code = btn.closest(".code-block-header")?.nextElementSibling?.querySelector("code");
    if (!code) return;
    navigator.clipboard.writeText(code.textContent).then(() => {
        const orig = btn.innerHTML;
        btn.innerHTML = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="20 6 9 17 4 12"/></svg>Copied!';
        btn.style.color = "#4ade80";
        setTimeout(() => { btn.innerHTML = orig; btn.style.color = ""; }, 2000);
    });
};

// ---- Inject streaming cursor CSS ----
document.head.insertAdjacentHTML("beforeend", `<style>
.streaming-cursor { animation: cur-blink .8s step-end infinite; color:#1C3D35; }
@keyframes cur-blink { 50%{opacity:0} }
.ai-msg-body { flex:1; min-width:0; }
</style>`);
