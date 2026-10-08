import { getSyllabus, syllabus as defaultSyllabus } from "./syllabus.js";
import { auth, db, provider } from "./firebase-config.js";
import { onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";
import { doc, getDoc, setDoc } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

// ---------- State ----------
let currentUser = null;
let progressData = {};
let studentProfile = null;
let syllabus = defaultSyllabus;
let activeSubjectIndex = 0;
let activeUnitIndex = 0;

// ---------- Firestore helpers ----------
async function getSavedData() {
    if (!currentUser) return {};
    const docRef = doc(db, "users", currentUser.uid);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) return docSnap.data().progress || {};
    return {};
}

async function saveData(data) {
    if (!currentUser) return;
    const docRef = doc(db, "users", currentUser.uid);
    await setDoc(docRef, { progress: data }, { merge: true });
}

async function getStudentProfile() {
    if (!currentUser) return null;
    const docRef = doc(db, "users", currentUser.uid);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists() && docSnap.data().profile) return docSnap.data().profile;
    return null;
}

// ---------- DOM ----------
const loadingScreen = document.getElementById("loadingScreen");
const topicsApp = document.getElementById("topicsApp");
const subjectNav = document.getElementById("subjectNav");
const subjectTitle = document.getElementById("subjectTitle");
const subjectMeta = document.getElementById("subjectMeta");
const subjectProgressFill = document.getElementById("subjectProgressFill");
const subjectProgressText = document.getElementById("subjectProgressText");
const unitTabs = document.getElementById("unitTabs");
const topicsGrid = document.getElementById("topicsGrid");
const sidebarRingFill = document.getElementById("sidebarRingFill");
const sidebarPct = document.getElementById("sidebarPct");

// ---------- Auth ----------
onAuthStateChanged(auth, async (user) => {
    if (user) {
        currentUser = user;
        try {
            studentProfile = await getStudentProfile();
        } catch (e) {
            console.error("Error loading profile:", e);
        }

        if (!studentProfile) {
            // No profile: go back to dashboard to set up
            window.location.href = "study.html";
            return;
        }

        syllabus = getSyllabus(studentProfile) || defaultSyllabus;

        try {
            progressData = await getSavedData();
        } catch (e) {
            console.error("Error loading progress:", e);
            progressData = {};
        }

        // Check URL param for subject
        const urlParams = new URLSearchParams(window.location.search);
        const subjectId = urlParams.get("subject");
        if (subjectId) {
            const idx = syllabus.subjects.findIndex(s => s.id === subjectId);
            if (idx >= 0) activeSubjectIndex = idx;
        }

        buildSidebar();
        selectSubject(activeSubjectIndex);
        updateOverallProgress();

        loadingScreen.classList.add("hidden");
        topicsApp.classList.remove("hidden");
    } else {
        window.location.href = "study.html";
    }
});

// ---------- Build sidebar subject list ----------
function buildSidebar() {
    subjectNav.innerHTML = "";
    syllabus.subjects.forEach((subject, index) => {
        const btn = document.createElement("button");
        btn.className = "tp-subject-btn";
        btn.dataset.index = index;

        // Compute subject progress
        const { completed, total } = getSubjectProgress(subject);
        const pct = total === 0 ? 0 : Math.round((completed / total) * 100);
        const isRedZone = pct < 35;

        btn.innerHTML = `
            <span class="tp-subject-icon">${subject.icon || "📘"}</span>
            <span class="tp-subject-name">${subject.name}</span>
            <span class="tp-subject-pct ${isRedZone ? "tp-red-zone" : ""}">${pct}%</span>
        `;

        btn.addEventListener("click", () => {
            activeSubjectIndex = index;
            activeUnitIndex = 0;
            selectSubject(index);
        });

        subjectNav.appendChild(btn);
    });
}

// ---------- Select a subject ----------
function selectSubject(index) {
    const subject = syllabus.subjects[index];
    if (!subject) return;

    // Highlight active sidebar button
    Array.from(subjectNav.children).forEach((btn, i) => {
        btn.classList.toggle("active", i === index);
    });

    // Update header
    const { completed, total } = getSubjectProgress(subject);
    const pct = total === 0 ? 0 : Math.round((completed / total) * 100);

    subjectTitle.textContent = subject.name;
    subjectMeta.textContent = `${subject.units.length} Units · ${total} Topics · ${completed} Completed`;
    subjectProgressFill.style.width = pct + "%";
    subjectProgressText.textContent = pct + "% Complete";

    // Build unit tabs
    buildUnitTabs(subject);
    selectUnit(activeUnitIndex);
}

// ---------- Build unit tabs ----------
function buildUnitTabs(subject) {
    unitTabs.innerHTML = "";
    subject.units.forEach((unit, uIndex) => {
        const tab = document.createElement("button");
        const isExtra = unit.name.toLowerCase().startsWith("extra");
        tab.className = `tp-unit-tab${isExtra ? " tp-unit-tab-extra" : ""}`;
        // Show short label for tabs: use unit name or fallback
        tab.textContent = unit.name || `Unit ${uIndex + 1}`;
        tab.addEventListener("click", () => {
            activeUnitIndex = uIndex;
            selectUnit(uIndex);
        });
        unitTabs.appendChild(tab);
    });
}

// ---------- Select a unit ----------
function selectUnit(uIndex) {
    const subject = syllabus.subjects[activeSubjectIndex];
    if (!subject || !subject.units[uIndex]) return;

    // Highlight active tab
    Array.from(unitTabs.children).forEach((tab, i) => {
        tab.classList.toggle("active", i === uIndex);
    });

    const unit = subject.units[uIndex];
    renderTopics(subject, unit, uIndex);
}

// ---------- Render topics as pills ----------
function renderTopics(subject, unit, uIndex) {
    topicsGrid.innerHTML = "";

    unit.topics.forEach((topic, topicIndex) => {
        const topicKey = `${subject.id}-${uIndex}-${topicIndex}`;
        const state = progressData[topicKey] || 0; // 0 = Pending, 1 = In Progress, 2 = Completed
        
        let pillClass = "";
        let icon = "";
        if (state === 1) {
            pillClass = "in-progress";
            icon = "⏱";
        } else if (state === 2) {
            pillClass = "done";
            icon = "✓";
        }

        const pill = document.createElement("div");
        pill.className = `tp-pill ${pillClass}`;
        pill.innerHTML = `
            <span class="tp-pill-check">${icon}</span>
            <span class="tp-pill-text">${topic}</span>
            <div class="tp-pill-actions">
                <button class="tp-action-btn tp-copy" title="Copy Topic">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="9" y="9" width="13" height="13" rx="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/></svg>
                </button>
                <button class="tp-action-btn tp-ai" title="Study with AI">
                    <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"/></svg>
                </button>
            </div>
        `;

        const copyBtn = pill.querySelector('.tp-copy');
        const aiBtn = pill.querySelector('.tp-ai');
        
        copyBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            navigator.clipboard.writeText(topic).then(() => {
                const orig = copyBtn.innerHTML;
                copyBtn.innerHTML = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="20 6 9 17 4 12"/></svg>';
                setTimeout(() => copyBtn.innerHTML = orig, 1500);
            });
        });

        aiBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            window.location.href = "ai-study.html?topic=" + encodeURIComponent(topic);
        });

        pill.addEventListener("click", (e) => {
            if (e.target.closest(".tp-action-btn")) return;
            let newState = (progressData[topicKey] || 0) + 1;
            if (newState > 2) newState = 0;
            
            const prevSubProgress = getSubjectProgress(subject);
            const wasSub100 = prevSubProgress.total > 0 && prevSubProgress.completed === prevSubProgress.total;
            
            const prevUnitProgress = getUnitProgress(subject, uIndex);
            const wasUnit100 = prevUnitProgress.total > 0 && prevUnitProgress.completed === prevUnitProgress.total;

            progressData[topicKey] = newState;
            saveData(progressData);

            // Toggle visual
            pill.classList.remove("done", "in-progress");
            if (newState === 1) {
                pill.classList.add("in-progress");
                pill.querySelector(".tp-pill-check").textContent = "⏱";
            } else if (newState === 2) {
                pill.classList.add("done");
                pill.querySelector(".tp-pill-check").textContent = "✓";
            } else {
                pill.querySelector(".tp-pill-check").textContent = "";
            }

            // Update all progress indicators
            refreshProgressUI();
            
            const newSubProgress = getSubjectProgress(subject);
            const isSubNow100 = newSubProgress.total > 0 && newSubProgress.completed === newSubProgress.total;

            const newUnitProgress = getUnitProgress(subject, uIndex);
            const isUnitNow100 = newUnitProgress.total > 0 && newUnitProgress.completed === newUnitProgress.total;
            
            const stickerModal = document.getElementById("completionSticker");
            const stickerTitle = document.getElementById("stickerTitle");
            const stickerMsg = document.getElementById("stickerMsg");

            if (!wasSub100 && isSubNow100) {
                if (stickerTitle) stickerTitle.textContent = "Subject Completed!";
                if (stickerMsg) stickerMsg.textContent = "Awesome job! You've mastered all the topics in this subject.";
                if (stickerModal) stickerModal.classList.remove("hidden");
            } else if (!wasUnit100 && isUnitNow100) {
                if (stickerTitle) stickerTitle.textContent = "Unit Completed!";
                if (stickerMsg) stickerMsg.textContent = "Great work! You've finished all topics in this unit.";
                if (stickerModal) stickerModal.classList.remove("hidden");
            }
        });

        topicsGrid.appendChild(pill);
    });
}

// ---------- Refresh all progress numbers ----------
function refreshProgressUI() {
    const subject = syllabus.subjects[activeSubjectIndex];
    if (!subject) return;

    // Subject progress
    const { completed, total } = getSubjectProgress(subject);
    const pct = total === 0 ? 0 : Math.round((completed / total) * 100);
    subjectProgressFill.style.width = pct + "%";
    subjectProgressText.textContent = pct + "% Complete";
    subjectMeta.textContent = `${subject.units.length} Units · ${total} Topics · ${completed} Completed`;

    // Update sidebar badges
    syllabus.subjects.forEach((s, i) => {
        const btn = subjectNav.children[i];
        if (!btn) return;
        const sp = getSubjectProgress(s);
        const sPct = sp.total === 0 ? 0 : Math.round((sp.completed / sp.total) * 100);
        const badge = btn.querySelector(".tp-subject-pct");
        if (badge) {
            badge.textContent = sPct + "%";
            badge.classList.toggle("tp-red-zone", sPct < 35);
        }
    });

    updateOverallProgress();
}

// ---------- Overall progress ----------
function updateOverallProgress() {
    let total = 0, completed = 0;
    syllabus.subjects.forEach(subject => {
        subject.units.forEach((unit, uIndex) => {
            unit.topics.forEach((_, tIndex) => {
                total++;
                if (progressData[`${subject.id}-${uIndex}-${tIndex}`] === 2) completed++;
            });
        });
    });

    const overall = total === 0 ? 0 : Math.round((completed / total) * 100);
    sidebarPct.textContent = overall + "%";

    // SVG ring: circumference = 2π × 34 ≈ 213.63
    const circumference = 213.63;
    const offset = circumference - (overall / 100) * circumference;
    sidebarRingFill.style.strokeDashoffset = offset;
}

// ---------- Helper: get subject progress ----------
function getSubjectProgress(subject) {
    let total = 0, completed = 0;
    subject.units.forEach((unit, uIndex) => {
        unit.topics.forEach((_, tIndex) => {
            total++;
            if (progressData[`${subject.id}-${uIndex}-${tIndex}`] === 2) completed++;
        });
    });
    return { completed, total };
}

// ---------- Helper: get unit progress ----------
function getUnitProgress(subject, uIndex) {
    let total = 0, completed = 0;
    const unit = subject.units[uIndex];
    if (unit) {
        unit.topics.forEach((_, tIndex) => {
            total++;
            if (progressData[`${subject.id}-${uIndex}-${tIndex}`] === 2) completed++;
        });
    }
    return { completed, total };
}

// ---------- Close Sticker Modal ----------
const closeStickerBtn = document.getElementById("closeStickerBtn");
if (closeStickerBtn) {
    closeStickerBtn.addEventListener("click", () => {
        const modal = document.getElementById("completionSticker");
        if (modal) modal.classList.add("hidden");
    });
}
