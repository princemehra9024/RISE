import { auth, db } from './firebase-config.js';
import {
    collection,
    addDoc,
    getDocs,
    onSnapshot,
    query,
    orderBy,
    limit,
    serverTimestamp,
    doc,
    updateDoc,
    deleteDoc
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";
import { onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";

// --- State ---
let currentMainTab = 'feed'; // 'feed' | 'chat'
let studentSemester = localStorage.getItem('studentSemester') || '1';
let studentBranch = localStorage.getItem('studentBranch') || 'IMCA';
let studentName = 'Student';
let semesterChatMessages = [];
let chatAttachedImageBase64 = null;
let chatUnsubscribe = null;
let currentUser = null;
let activeTab = 'all';
let selectedCategory = 'General';
let attachedImageBase64 = null;
let customPosts = [];
let firestorePosts = [];
const expandedComments = new Set();

// --- Default Starter Posts ---
const defaultDummyPosts = [
    {
        id: 'p1',
        author: 'Riya Kapoor',
        authorId: 'default_1',
        avatarColor: 'linear-gradient(135deg, #FF6B6B, #FF8E53)',
        initials: 'RK',
        time: '2 hours ago',
        category: 'Notes',
        content: 'Just finished my Data Structures notes! Binary trees finally make sense. Let me know if anyone wants a copy!',
        likes: 24,
        likedBy: [],
        comments: [
            { id: 'c1', author: 'Aarav', text: 'Please send the link!' }
        ],
        isLiked: false,
        createdAt: new Date(Date.now() - 2 * 3600 * 1000).toISOString()
    },
    {
        id: 'p2',
        author: 'Dev Patel',
        authorId: 'default_2',
        avatarColor: 'linear-gradient(135deg, #4facfe, #00f2fe)',
        initials: 'DP',
        time: '5 hours ago',
        category: 'Question',
        content: 'Does anyone have the syllabus for DBMS Unit 4? The official portal is down again.',
        likes: 12,
        likedBy: [],
        comments: [],
        isLiked: false,
        createdAt: new Date(Date.now() - 5 * 3600 * 1000).toISOString()
    },
    {
        id: 'p3',
        author: 'Aarav Sharma',
        authorId: 'default_3',
        avatarColor: 'linear-gradient(135deg, #43e97b, #38f9d7)',
        initials: 'AS',
        time: '1 day ago',
        category: 'General',
        content: 'Hackathon this weekend! Who is joining? We need one more frontend dev.',
        likes: 45,
        likedBy: [],
        comments: [],
        isLiked: false,
        createdAt: new Date(Date.now() - 24 * 3600 * 1000).toISOString()
    }
];

const topAchievers = [
    { rank: 1, name: 'Riya Kapoor', score: 340, color: 'gold' },
    { rank: 2, name: 'Kabir Singh', score: 310, color: 'silver' },
    { rank: 3, name: 'Meera Joshi', score: 285, color: 'bronze' },
    { rank: 4, name: 'Dev Patel', score: 240, color: '' },
    { rank: 5, name: 'Naina Thakur', score: 225, color: '' }
];

const userBadges = [
    { name: 'Quiz Master', img: 'badge1.jpg', hint: 'Score 90%+ in 5 quizzes', locked: false },
    { name: '7-Day Streak', img: 'badge2.jpg', hint: 'Study for 7 consecutive days', locked: false },
    { name: 'First Note', img: 'badge3.jpg', hint: 'Upload your first study note', locked: false },
    { name: 'Night Owl', img: 'badge3.jpg', hint: 'Study past midnight (Locked)', locked: true },
    { name: 'Social Butterfly', img: 'badge1.jpg', hint: 'Get 50 likes on a post (Locked)', locked: true }
];

// --- Helpers ---
function getRandomGradient() {
    const gradients = [
        'linear-gradient(135deg, #E8856A, #F5C842)',
        'linear-gradient(135deg, #1C3D35, #2D5A4A)',
        'linear-gradient(135deg, #4facfe, #00f2fe)',
        'linear-gradient(135deg, #43e97b, #38f9d7)',
        'linear-gradient(135deg, #fa709a, #fee140)',
        'linear-gradient(135deg, #667eea, #764ba2)'
    ];
    return gradients[Math.floor(Math.random() * gradients.length)];
}

function formatRelativeTime(dateString) {
    if (!dateString) return 'Just now';
    const date = new Date(dateString);
    if (isNaN(date.getTime())) return 'Recently';
    const seconds = Math.floor((Date.now() - date.getTime()) / 1000);
    if (seconds < 60) return 'Just now';
    const minutes = Math.floor(seconds / 60);
    if (minutes < 60) return `${minutes}m ago`;
    const hours = Math.floor(minutes / 60);
    if (hours < 24) return `${hours}h ago`;
    const days = Math.floor(hours / 24);
    if (days < 7) return `${days}d ago`;
    return date.toLocaleDateString(undefined, { month: 'short', day: 'numeric' });
}

function linkify(text) {
    if (!text) return '';
    const urlPattern = /(https?:\/\/[^\s]+)/g;
    return text.replace(urlPattern, (url) => {
        return `<a href="${url}" target="_blank" rel="noopener noreferrer">${url}</a>`;
    });
}

function showToast(message) {
    const toast = document.getElementById('minimalToast');
    if (!toast) return;
    toast.textContent = message;
    toast.classList.remove('hidden');
    clearTimeout(toast._timeout);
    toast._timeout = setTimeout(() => {
        toast.classList.add('hidden');
    }, 2800);
}

// Compress image via Canvas to max 1000px, returning high-quality WebP/JPEG data URL
function compressImage(file, maxWidth = 1000, quality = 0.82) {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = (e) => {
            const img = new Image();
            img.onload = () => {
                let width = img.width;
                let height = img.height;
                if (width > maxWidth) {
                    height = Math.round((height * maxWidth) / width);
                    width = maxWidth;
                }
                const canvas = document.createElement('canvas');
                canvas.width = width;
                canvas.height = height;
                const ctx = canvas.getContext('2d');
                ctx.drawImage(img, 0, 0, width, height);
                // Export WebP if supported, fallback to JPEG
                const dataUrl = canvas.toDataURL('image/jpeg', quality);
                resolve(dataUrl);
            };
            img.onerror = reject;
            img.src = e.target.result;
        };
        reader.onerror = reject;
        reader.readAsDataURL(file);
    });
}

// --- Posts Loading & Merging ---
function loadLocalPosts() {
    try {
        customPosts = JSON.parse(localStorage.getItem('customFeedPosts') || '[]');
    } catch (e) {
        customPosts = [];
    }
}

function saveLocalPosts() {
    try {
        localStorage.setItem('customFeedPosts', JSON.stringify(customPosts));
    } catch (e) {
        console.warn("Could not save to localStorage", e);
    }
}

function getAllPosts() {
    // Merge Firestore posts with local custom posts (deduped by ID) + dummy posts
    const postMap = new Map();

    // 1. First add firestore posts
    firestorePosts.forEach(p => postMap.set(p.id, p));

    // 2. Add local custom posts
    customPosts.forEach(p => {
        if (!postMap.has(p.id)) {
            postMap.set(p.id, p);
        }
    });

    // 3. Add default posts
    defaultDummyPosts.forEach(p => {
        if (!postMap.has(p.id)) {
            postMap.set(p.id, p);
        }
    });

    let list = Array.from(postMap.values());

    // Compute isLiked status for currentUser
    list = list.map(p => {
        const likedBy = Array.isArray(p.likedBy) ? p.likedBy : [];
        const isLiked = currentUser ? likedBy.includes(currentUser.uid) : !!p.isLiked;
        return {
            ...p,
            isLiked,
            time: p.createdAt ? formatRelativeTime(p.createdAt) : (p.time || 'Recently')
        };
    });

    // Sort or filter according to activeTab
    if (activeTab === 'popular') {
        list.sort((a, b) => (b.likes || 0) - (a.likes || 0));
    } else if (activeTab === 'Notes') {
        list = list.filter(p => (p.category || '').toLowerCase() === 'notes');
        list.sort((a, b) => new Date(b.createdAt || 0) - new Date(a.createdAt || 0));
    } else if (activeTab === 'Question') {
        list = list.filter(p => (p.category || '').toLowerCase() === 'question');
        list.sort((a, b) => new Date(b.createdAt || 0) - new Date(a.createdAt || 0));
    } else {
        // Latest
        list.sort((a, b) => new Date(b.createdAt || 0) - new Date(a.createdAt || 0));
    }

    return list;
}

// --- Render Posts ---
function renderPosts() {
    const container = document.getElementById('postsContainer');
    if (!container) return;

    const posts = getAllPosts();

    if (posts.length === 0) {
        container.innerHTML = `
            <div class="feed-empty-state">
                <div class="feed-empty-icon">✦</div>
                <div style="font-weight: 700; color: var(--teal); margin-bottom: 4px;">No posts yet</div>
                <div style="font-size: 0.88rem;">Be the first to share notes or ask a question in this tab!</div>
            </div>
        `;
        return;
    }

    container.innerHTML = posts.map(post => {
        const isAuthor = currentUser && (post.authorId === currentUser.uid);
        const hasComments = Array.isArray(post.comments) && post.comments.length > 0;
        const commentsCount = Array.isArray(post.comments) ? post.comments.length : 0;
        const isExpanded = expandedComments.has(post.id);

        const avatarContent = post.authorPhoto
            ? `<img src="${post.authorPhoto}" alt="${post.author}">`
            : `<span>${post.initials || (post.author ? post.author.charAt(0).toUpperCase() : 'S')}</span>`;

        const imageBlock = post.image ? `
            <div class="post-image-container" onclick="openPostImageModal('${post.id}')" title="Click to view full image">
                <img src="${post.image}" alt="Post Image" loading="lazy">
            </div>
        ` : '';

        const commentsBlock = isExpanded ? `
            <div class="post-comments-drawer" id="comments-drawer-${post.id}">
                <div class="comments-list">
                    ${commentsCount > 0 ? post.comments.map(c => `
                        <div class="comment-bubble">
                            <span class="comment-author">${c.author || 'Peer'}:</span>
                            <span class="comment-text">${c.text}</span>
                        </div>
                    `).join('') : '<div style="font-size:0.8rem; color:#9CA3AF; padding: 4px 0;">No comments yet. Start the conversation!</div>'}
                </div>
                <div class="comment-input-row">
                    <input type="text" class="comment-input-field" id="comment-input-${post.id}" placeholder="Write a comment..." onkeydown="if(event.key==='Enter') submitComment('${post.id}')">
                    <button class="comment-submit-btn" onclick="submitComment('${post.id}')" title="Send comment">
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="9 18 15 12 9 6"></polyline></svg>
                    </button>
                </div>
            </div>
        ` : '';

        return `
            <div class="post-card" id="post-${post.id}">
                <div class="post-header">
                    <div class="post-author-wrapper">
                        <div class="post-avatar" style="background: ${post.avatarColor || 'var(--coral)'}">
                            ${avatarContent}
                        </div>
                        <div class="post-meta">
                            <div class="post-author-row">
                                <span class="post-author">${post.author}</span>
                                ${post.category ? `<span class="post-category-tag">#${post.category}</span>` : ''}
                            </div>
                            <span class="post-time">${post.time}</span>
                        </div>
                    </div>
                    <div class="post-header-actions">
                        ${isAuthor ? `
                            <button class="post-delete-btn" onclick="deletePost('${post.id}')" title="Delete post">
                                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path></svg>
                            </button>
                        ` : ''}
                    </div>
                </div>

                <div class="post-content">
                    ${linkify(post.content || '')}
                </div>

                ${imageBlock}

                <div class="post-actions">
                    <button class="post-action-btn ${post.isLiked ? 'liked' : ''}" onclick="toggleLike('${post.id}')" id="like-btn-${post.id}">
                        <svg width="17" height="17" viewBox="0 0 24 24" fill="${post.isLiked ? 'var(--coral)' : 'none'}" stroke="currentColor" stroke-width="2">
                            <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
                        </svg>
                        <span>${post.likes || 0}</span>
                    </button>

                    <button class="post-action-btn" onclick="toggleComments('${post.id}')">
                        <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"></path>
                        </svg>
                        <span>${commentsCount}</span>
                    </button>

                    <button class="post-action-btn" onclick="sharePost('${post.id}')">
                        <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <circle cx="18" cy="5" r="3"></circle>
                            <circle cx="6" cy="12" r="3"></circle>
                            <circle cx="18" cy="19" r="3"></circle>
                            <line x1="8.59" y1="13.51" x2="15.42" y2="17.49"></line>
                            <line x1="15.41" y1="6.51" x2="8.59" y2="10.49"></line>
                        </svg>
                        <span>Share</span>
                    </button>
                </div>

                ${commentsBlock}
            </div>
        `;
    }).join('');
}

// --- Create Post ---
async function handlePublishPost() {
    const input = document.getElementById('postContentInput');
    const submitBtn = document.getElementById('submitPostBtn');
    if (!input || !submitBtn) return;

    const content = input.value.trim();
    if (!content && !attachedImageBase64) {
        showToast("Please enter some text or attach an image ✦");
        input.focus();
        return;
    }

    submitBtn.disabled = true;
    submitBtn.innerHTML = '<span>Publishing...</span>';

    const authorName = currentUser?.displayName || 'Student';
    const authorInitials = authorName
        .split(' ')
        .map(n => n[0])
        .join('')
        .substring(0, 2)
        .toUpperCase() || 'ST';

    const newPost = {
        author: authorName,
        authorId: currentUser?.uid || 'guest_' + Date.now(),
        authorPhoto: currentUser?.photoURL || '',
        initials: authorInitials,
        avatarColor: getRandomGradient(),
        content: content,
        image: attachedImageBase64 || null,
        category: selectedCategory,
        likes: 0,
        likedBy: [],
        comments: [],
        createdAt: new Date().toISOString()
    };

    // 1. Try writing to Firestore
    let savedToFirestore = false;
    try {
        const postsRef = collection(db, "posts");
        const docRef = await addDoc(postsRef, {
            ...newPost,
            serverTimestamp: serverTimestamp()
        });
        newPost.id = docRef.id;
        savedToFirestore = true;
        console.log("Post created in Firestore with ID:", docRef.id);
    } catch (err) {
        console.warn("Firestore post save fallback to local storage:", err);
        newPost.id = 'post_' + Date.now();
    }

    // 2. Always maintain in local storage for instant offline / fallback access
    customPosts.unshift(newPost);
    saveLocalPosts();

    // 3. Reset form
    input.value = '';
    clearAttachedImage();
    const charCount = document.getElementById('postCharCount');
    if (charCount) charCount.textContent = '0/1000';

    submitBtn.disabled = false;
    submitBtn.innerHTML = `
        <span>Publish</span>
        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <line x1="22" y1="2" x2="11" y2="13"></line>
            <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
        </svg>
    `;

    renderPosts();
    showToast("Post shared with community! ✦");
}

function clearAttachedImage() {
    attachedImageBase64 = null;
    const previewContainer = document.getElementById('imagePreviewContainer');
    const previewImg = document.getElementById('imagePreviewImg');
    const fileInput = document.getElementById('postImageFileInput');
    if (previewContainer) previewContainer.classList.add('hidden');
    if (previewImg) previewImg.src = '';
    if (fileInput) fileInput.value = '';
}

// --- Likes & Comments ---
window.toggleLike = async (postId) => {
    const posts = getAllPosts();
    const post = posts.find(p => p.id === postId);
    if (!post) return;

    const uid = currentUser?.uid || 'guest_user';
    const likedBy = Array.isArray(post.likedBy) ? post.likedBy : [];
    const hasLiked = likedBy.includes(uid) || post.isLiked;

    if (hasLiked) {
        post.likes = Math.max(0, (post.likes || 1) - 1);
        post.likedBy = likedBy.filter(id => id !== uid);
        post.isLiked = false;
    } else {
        post.likes = (post.likes || 0) + 1;
        post.likedBy = [...likedBy, uid];
        post.isLiked = true;
    }

    // Sync to local
    const localPost = customPosts.find(p => p.id === postId);
    if (localPost) {
        localPost.likes = post.likes;
        localPost.likedBy = post.likedBy;
        saveLocalPosts();
    }

    // Sync to Firestore if it's a Firestore post
    if (!postId.startsWith('p') && !postId.startsWith('post_')) {
        try {
            const postDocRef = doc(db, "posts", postId);
            await updateDoc(postDocRef, {
                likes: post.likes,
                likedBy: post.likedBy
            });
        } catch (e) {
            console.warn("Could not sync like to Firestore", e);
        }
    }

    renderPosts();
};

window.toggleComments = (postId) => {
    if (expandedComments.has(postId)) {
        expandedComments.delete(postId);
    } else {
        expandedComments.add(postId);
    }
    renderPosts();
    if (expandedComments.has(postId)) {
        setTimeout(() => {
            const input = document.getElementById(`comment-input-${postId}`);
            if (input) input.focus();
        }, 50);
    }
};

window.submitComment = async (postId) => {
    const input = document.getElementById(`comment-input-${postId}`);
    if (!input) return;
    const text = input.value.trim();
    if (!text) return;

    const posts = getAllPosts();
    const post = posts.find(p => p.id === postId);
    if (!post) return;

    const authorName = currentUser?.displayName || 'Peer';
    const newComment = {
        id: 'c_' + Date.now(),
        author: authorName,
        text: text,
        createdAt: new Date().toISOString()
    };

    if (!Array.isArray(post.comments)) post.comments = [];
    post.comments.push(newComment);

    // Save locally
    const localPost = customPosts.find(p => p.id === postId);
    if (localPost) {
        if (!Array.isArray(localPost.comments)) localPost.comments = [];
        localPost.comments.push(newComment);
        saveLocalPosts();
    }

    // Save to Firestore
    if (!postId.startsWith('p') && !postId.startsWith('post_')) {
        try {
            const postDocRef = doc(db, "posts", postId);
            await updateDoc(postDocRef, {
                comments: post.comments
            });
        } catch (e) {
            console.warn("Could not sync comment to Firestore", e);
        }
    }

    input.value = '';
    renderPosts();
    showToast("Comment added! ✦");
};

window.deletePost = async (postId) => {
    if (!confirm("Are you sure you want to delete this post?")) return;

    // Delete locally
    customPosts = customPosts.filter(p => p.id !== postId);
    saveLocalPosts();

    // Delete from Firestore
    if (!postId.startsWith('p') && !postId.startsWith('post_')) {
        try {
            await deleteDoc(doc(db, "posts", postId));
        } catch (e) {
            console.warn("Could not delete from Firestore", e);
        }
    }

    renderPosts();
    showToast("Post deleted ✦");
};

window.sharePost = (postId) => {
    const posts = getAllPosts();
    const post = posts.find(p => p.id === postId);
    if (!post) return;

    const shareUrl = window.location.origin + window.location.pathname + '#post-' + postId;
    if (navigator.clipboard) {
        navigator.clipboard.writeText(shareUrl).then(() => {
            showToast("Link copied to clipboard! ✦");
        }).catch(() => {
            showToast("Shared: " + post.content.substring(0, 30) + "...");
        });
    } else {
        showToast("Shared: " + post.content.substring(0, 30) + "...");
    }
};

window.openPostImageModal = (postId) => {
    const posts = getAllPosts();
    const post = posts.find(p => p.id === postId);
    if (!post || !post.image) return;

    const modal = document.getElementById('imageLightboxModal');
    const modalImg = document.getElementById('imageLightboxImg');
    if (modal && modalImg) {
        modalImg.src = post.image;
        modal.classList.remove('hidden');
    }
};

// --- Realtime Firestore Sync ---
function setupFirestoreListener() {
    try {
        const postsRef = collection(db, "posts");
        const q = query(postsRef, orderBy("createdAt", "desc"), limit(50));

        onSnapshot(q, (snapshot) => {
            const loaded = [];
            snapshot.forEach((docSnap) => {
                const data = docSnap.data();
                loaded.push({
                    id: docSnap.id,
                    ...data
                });
            });
            firestorePosts = loaded;
            renderPosts();
        }, (error) => {
            console.warn("Firestore snapshot listener notice (fallback mode active):", error.message);
            // Fallback: still render local and default posts smoothly
            renderPosts();
        });
    } catch (err) {
        console.warn("Could not attach snapshot listener:", err);
        renderPosts();
    }
}


// ============================================================
// SEMESTER GROUP CHAT SYSTEM (Same-Semester Access Only)
// ============================================================
function updateSemesterChatUI() {
    const tabSemBadge = document.getElementById('chatTabSemBadge');
    const roomTitle = document.getElementById('chatRoomTitle');
    const roomSub = document.getElementById('chatRoomSub');
    const headerBadge = document.getElementById('chatHeaderSemBadge');
    const inputField = document.getElementById('chatInputText');

    if (tabSemBadge) tabSemBadge.textContent = `Sem ${studentSemester}`;
    if (roomTitle) roomTitle.textContent = `Semester ${studentSemester} Group Chat`;
    if (roomSub) roomSub.textContent = `🔒 Exclusive to verified ${studentBranch} · Sem ${studentSemester} students`;
    if (headerBadge) headerBadge.textContent = `✦ Sem ${studentSemester} Room`;
    if (inputField) inputField.placeholder = `Message Semester ${studentSemester} classmates...`;
}

async function resolveStudentSemester(user) {
    if (user) {
        studentName = user.displayName || 'Student';
        try {
            const userDoc = await getDoc(doc(db, "users", user.uid));
            if (userDoc.exists() && userDoc.data().profile) {
                const prof = userDoc.data().profile;
                if (prof.semester) studentSemester = prof.semester.toString();
                if (prof.branch) studentBranch = prof.branch;
                if (prof.studentName) studentName = prof.studentName;
                localStorage.setItem('studentSemester', studentSemester);
                localStorage.setItem('studentBranch', studentBranch);
            }
        } catch (e) {
            console.warn("Could not fetch user profile for semester chat:", e);
        }
    } else {
        // Check DOM badges if available
        const semBadge = document.getElementById('profileSemBadge');
        if (semBadge && semBadge.textContent.includes('Sem')) {
            const match = semBadge.textContent.match(/Sem\s*(\d+)/i);
            if (match) studentSemester = match[1];
        }
    }

    updateSemesterChatUI();
    setupChatListener();
}

function loadLocalChatMessages() {
    try {
        const cached = localStorage.getItem(`chat_cache_sem_${studentSemester}`);
        if (cached) {
            semesterChatMessages = JSON.parse(cached);
        }
    } catch (e) {
        semesterChatMessages = [];
    }
}

function saveLocalChatMessages() {
    try {
        localStorage.setItem(`chat_cache_sem_${studentSemester}`, JSON.stringify(semesterChatMessages));
    } catch (e) {
        console.warn("Could not cache chat messages", e);
    }
}

function renderChatMessages() {
    const container = document.getElementById('chatMessagesContainer');
    if (!container) return;

    if (!semesterChatMessages || semesterChatMessages.length === 0) {
        container.innerHTML = `
            <div class="chat-empty-state">
                <div class="chat-empty-icon">💬</div>
                <div class="chat-empty-title">Welcome to Semester ${studentSemester} Group Chat!</div>
                <div class="chat-empty-desc">This chat room is exclusively for students in Semester ${studentSemester}. Share study updates, ask questions, or say hi to your classmates!</div>
            </div>
        `;
        return;
    }

    const currentUid = currentUser?.uid;

    container.innerHTML = semesterChatMessages.map(msg => {
        const isMine = currentUid ? (msg.senderId === currentUid) : false;
        const initials = msg.senderInitials || (msg.senderName ? msg.senderName.substring(0, 2).toUpperCase() : 'ST');
        const avatarContent = msg.senderPhoto
            ? `<img src="${msg.senderPhoto}" alt="${msg.senderName}">`
            : initials;

        const timeStr = msg.createdAt ? new Date(msg.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : '';

        const imageBlock = msg.image ? `
            <img src="${msg.image}" alt="Chat Image" class="chat-msg-img" onclick="openDirectImageModal('${msg.image}')">
        ` : '';

        return `
            <div class="chat-message-row ${isMine ? 'mine' : ''}">
                <div class="chat-msg-avatar" style="background: ${msg.senderColor || 'var(--teal)'}" title="${msg.senderName}">
                    ${avatarContent}
                </div>
                <div class="chat-msg-content">
                    ${!isMine ? `<span class="chat-msg-sender">${msg.senderName}</span>` : ''}
                    <div class="chat-msg-bubble">
                        ${linkify(msg.text || '')}
                        ${imageBlock}
                    </div>
                    <span class="chat-msg-time">${timeStr}</span>
                </div>
            </div>
        `;
    }).join('');

    // Auto-scroll to bottom
    container.scrollTop = container.scrollHeight;
}

function setupChatListener() {
    if (chatUnsubscribe) {
        chatUnsubscribe();
        chatUnsubscribe = null;
    }

    loadLocalChatMessages();
    renderChatMessages();

    try {
        const chatRoomCol = collection(db, "semester_chats", `sem_${studentSemester}`, "messages");
        const q = query(chatRoomCol, orderBy("createdAt", "asc"), limit(120));

        chatUnsubscribe = onSnapshot(q, (snapshot) => {
            const loaded = [];
            snapshot.forEach(docSnap => {
                loaded.push({
                    id: docSnap.id,
                    ...docSnap.data()
                });
            });
            if (loaded.length > 0) {
                semesterChatMessages = loaded;
                saveLocalChatMessages();
                renderChatMessages();
            }
        }, (error) => {
            console.warn("Semester chat listener note (local fallback active):", error.message);
            renderChatMessages();
        });
    } catch (e) {
        console.warn("Could not start semester chat listener:", e);
        renderChatMessages();
    }
}

async function sendChatMessage() {
    const input = document.getElementById('chatInputText');
    const sendBtn = document.getElementById('chatSendBtn');
    if (!input) return;

    const text = input.value.trim();
    if (!text && !chatAttachedImageBase64) return;

    const myName = currentUser?.displayName || studentName || 'Student';
    const myInitials = myName.split(' ').map(n => n[0]).join('').substring(0, 2).toUpperCase() || 'ST';

    const newMsg = {
        senderId: currentUser?.uid || 'guest_' + Date.now(),
        senderName: myName,
        senderPhoto: currentUser?.photoURL || '',
        senderInitials: myInitials,
        senderColor: getRandomGradient(),
        text: text,
        image: chatAttachedImageBase64 || null,
        semester: studentSemester,
        branch: studentBranch,
        createdAt: new Date().toISOString()
    };

    // 1. Optimistic local update
    semesterChatMessages.push(newMsg);
    saveLocalChatMessages();
    renderChatMessages();

    // 2. Clear input & attached photo immediately
    input.value = '';
    clearChatAttachedImage();

    // 3. Write to Firestore
    try {
        const chatCol = collection(db, "semester_chats", `sem_${studentSemester}`, "messages");
        await addDoc(chatCol, {
            ...newMsg,
            serverTimestamp: serverTimestamp()
        });
    } catch (err) {
        console.warn("Chat message written to local cache, Firestore write failed:", err);
    }
}

function clearChatAttachedImage() {
    chatAttachedImageBase64 = null;
    const previewBar = document.getElementById('chatImagePreviewBar');
    const previewThumb = document.getElementById('chatImagePreviewThumb');
    const fileInput = document.getElementById('chatFileInput');
    if (previewBar) previewBar.classList.add('hidden');
    if (previewThumb) previewThumb.src = '';
    if (fileInput) fileInput.value = '';
}

window.openDirectImageModal = (imgSrc) => {
    const modal = document.getElementById('imageLightboxModal');
    const modalImg = document.getElementById('imageLightboxImg');
    if (modal && modalImg) {
        modalImg.src = imgSrc;
        modal.classList.remove('hidden');
    }
};

// --- Leaderboard & Badges ---
function renderLeaderboard() {
    const container = document.getElementById('miniLeaderboardContainer');
    if (!container) return;

    container.innerHTML = '';
    topAchievers.forEach(achiever => {
        const itemHTML = `
            <div class="lm-item">
                <div class="lm-rank ${achiever.color}">${achiever.rank}</div>
                <div class="lm-avatar">${achiever.name.substring(0, 2).toUpperCase()}</div>
                <div class="lm-name">${achiever.name}</div>
                <div class="lm-score">${achiever.score} pts</div>
            </div>
        `;
        container.insertAdjacentHTML('beforeend', itemHTML);
    });
}

function renderBadges() {
    const container = document.getElementById('badgesCarousel');
    if (!container) return;

    container.innerHTML = '';
    userBadges.forEach(badge => {
        const lockedClass = badge.locked ? 'locked' : '';
        const itemHTML = `
            <div class="badge-item ${lockedClass}" title="${badge.hint}">
                <img src="${badge.img}" alt="${badge.name}" class="badge-img">
                <span class="badge-name">${badge.name}</span>
                <span class="badge-hint">${badge.locked ? 'Locked' : ''}</span>
            </div>
        `;
        container.insertAdjacentHTML('beforeend', itemHTML);
    });

    let currentBadgeIndex = 0;
    setInterval(() => {
        if (container.matches(':hover')) return;
        currentBadgeIndex++;
        if (currentBadgeIndex >= userBadges.length) {
            currentBadgeIndex = 0;
        }
        container.scrollTo({
            left: currentBadgeIndex * container.clientWidth,
            behavior: 'smooth'
        });
    }, 3500);
}

// Quiz Modal
window.openQuizModal = () => {
    setTimeout(() => {
        const modal = document.getElementById('quizModal');
        if (modal) modal.classList.add('active');
    }, 300);
};

window.closeQuizModal = () => {
    const modal = document.getElementById('quizModal');
    if (modal) modal.classList.remove('active');
};

// --- Initialization ---
document.addEventListener('DOMContentLoaded', () => {
    // --- 0. Two-Part Switcher (Community Feed vs Semester Chat) ---
    const tabFeed = document.getElementById('tabCommunityFeed');
    const tabChat = document.getElementById('tabGroupChat');
    const feedView = document.getElementById('feedView');
    const chatView = document.getElementById('chatView');

    function switchView(target) {
        currentMainTab = target;
        if (target === 'feed') {
            if (tabFeed) tabFeed.classList.add('active');
            if (tabChat) tabChat.classList.remove('active');
            if (feedView) feedView.classList.remove('hidden');
            if (chatView) chatView.classList.add('hidden');
        } else {
            if (tabChat) tabChat.classList.add('active');
            if (tabFeed) tabFeed.classList.remove('active');
            if (chatView) chatView.classList.remove('hidden');
            if (feedView) feedView.classList.add('hidden');
            // Auto scroll chat to bottom when switching to it
            setTimeout(() => {
                const container = document.getElementById('chatMessagesContainer');
                if (container) container.scrollTop = container.scrollHeight;
            }, 50);
        }
    }

    if (tabFeed) tabFeed.addEventListener('click', () => switchView('feed'));
    if (tabChat) tabChat.addEventListener('click', () => switchView('chat'));

    // Chat image attach button
    const chatAttachBtn = document.getElementById('chatAttachBtn');
    const chatFileInput = document.getElementById('chatFileInput');
    const chatRemoveImgBtn = document.getElementById('chatRemoveImageBtn');
    if (chatAttachBtn && chatFileInput) {
        chatAttachBtn.addEventListener('click', () => chatFileInput.click());
        chatFileInput.addEventListener('change', async (e) => {
            const file = e.target.files && e.target.files[0];
            if (!file) return;
            try {
                const compressed = await compressImage(file, 800, 0.8);
                chatAttachedImageBase64 = compressed;
                const previewBar = document.getElementById('chatImagePreviewBar');
                const previewThumb = document.getElementById('chatImagePreviewThumb');
                if (previewBar && previewThumb) {
                    previewThumb.src = compressed;
                    previewBar.classList.remove('hidden');
                }
            } catch (err) {
                console.error("Chat image compression error", err);
            }
        });
    }

    if (chatRemoveImgBtn) {
        chatRemoveImgBtn.addEventListener('click', clearChatAttachedImage);
    }

    // Chat Send button & Enter key
    const chatSendBtn = document.getElementById('chatSendBtn');
    const chatInput = document.getElementById('chatInputText');
    if (chatSendBtn) {
        chatSendBtn.addEventListener('click', sendChatMessage);
    }
    if (chatInput) {
        chatInput.addEventListener('keydown', (e) => {
            if (e.key === 'Enter') {
                e.preventDefault();
                sendChatMessage();
            }
        });
    }

    loadLocalPosts();
    renderPosts();
    renderLeaderboard();
    renderBadges();
    setupFirestoreListener();

    // 1. Auth State Observer
    onAuthStateChanged(auth, async (user) => {
        currentUser = user;
        await resolveStudentSemester(user);
        currentUser = user;
        const nameEl = document.getElementById('postCreatorName');
        const avatarEl = document.getElementById('postCreatorAvatar');

        if (user) {
            const displayName = user.displayName || 'Student';
            if (nameEl) nameEl.textContent = displayName;
            if (avatarEl) {
                if (user.photoURL) {
                    avatarEl.innerHTML = `<img src="${user.photoURL}" alt="${displayName}">`;
                } else {
                    avatarEl.textContent = displayName.charAt(0).toUpperCase();
                }
            }
        }
        renderPosts();
    });

    // 2. Feed Tab Switching
    const tabButtons = document.querySelectorAll('.feed-tab');
    tabButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            tabButtons.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            activeTab = btn.dataset.tab || 'all';
            renderPosts();
        });
    });

    // 3. Category Pills in Create Post
    const categoryPills = document.querySelectorAll('.category-pill');
    categoryPills.forEach(pill => {
        pill.addEventListener('click', () => {
            categoryPills.forEach(p => p.classList.remove('active'));
            pill.classList.add('active');
            selectedCategory = pill.dataset.category || 'General';
        });
    });

    // 4. Character count on textarea
    const contentInput = document.getElementById('postContentInput');
    const charCountEl = document.getElementById('postCharCount');
    if (contentInput && charCountEl) {
        contentInput.addEventListener('input', () => {
            const len = contentInput.value.length;
            charCountEl.textContent = `${len}/1000`;
            if (len > 1000) {
                charCountEl.style.color = '#EF4444';
            } else {
                charCountEl.style.color = 'var(--gray-500)';
            }
        });
    }

    // 5. Image Attachment
    const attachBtn = document.getElementById('postAttachPhotoBtn');
    const fileInput = document.getElementById('postImageFileInput');
    const removeImgBtn = document.getElementById('removeImageBtn');

    if (attachBtn && fileInput) {
        attachBtn.addEventListener('click', () => fileInput.click());
        fileInput.addEventListener('change', async (e) => {
            const file = e.target.files && e.target.files[0];
            if (!file) return;

            if (file.size > 15 * 1024 * 1024) {
                showToast("Image too large. Please select under 15MB ✦");
                return;
            }

            try {
                showToast("Processing image... ✦");
                const compressed = await compressImage(file, 1000, 0.82);
                attachedImageBase64 = compressed;

                const previewContainer = document.getElementById('imagePreviewContainer');
                const previewImg = document.getElementById('imagePreviewImg');
                if (previewImg && previewContainer) {
                    previewImg.src = compressed;
                    previewContainer.classList.remove('hidden');
                }
                showToast("Image ready for post! ✦");
            } catch (err) {
                console.error("Image processing error", err);
                showToast("Could not process image. Please try another.");
            }
        });
    }

    if (removeImgBtn) {
        removeImgBtn.addEventListener('click', clearAttachedImage);
    }

    // 6. Publish Button
    const submitBtn = document.getElementById('submitPostBtn');
    if (submitBtn) {
        submitBtn.addEventListener('click', handlePublishPost);
    }

    // 7. Lightbox Close
    const lightboxModal = document.getElementById('imageLightboxModal');
    const lightboxClose = document.getElementById('imageLightboxClose');
    const lightboxBackdrop = document.getElementById('imageLightboxBackdrop');

    const closeLightbox = () => {
        if (lightboxModal) lightboxModal.classList.add('hidden');
    };

    if (lightboxClose) lightboxClose.addEventListener('click', closeLightbox);
    if (lightboxBackdrop) lightboxBackdrop.addEventListener('click', closeLightbox);
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') closeLightbox();
    });
});
