import { auth } from './firebase-config.js';

// --- Dummy Data ---
let dummyPosts = [
    {
        id: 'p1',
        author: 'Riya Kapoor',
        avatarColor: 'linear-gradient(135deg, #FF6B6B, #FF8E53)',
        time: '2 hours ago',
        content: 'Just finished my Data Structures notes! Binary trees finally make sense. Let me know if anyone wants a copy!',
        likes: 24,
        comments: 5,
        isLiked: false,
        isFollowing: false
    },
    {
        id: 'p2',
        author: 'Dev Patel',
        avatarColor: 'linear-gradient(135deg, #4facfe, #00f2fe)',
        time: '5 hours ago',
        content: 'Does anyone have the syllabus for DBMS Unit 4? The official portal is down again.',
        likes: 12,
        comments: 8,
        isLiked: true,
        isFollowing: true
    },
    {
        id: 'p3',
        author: 'Aarav Sharma',
        avatarColor: 'linear-gradient(135deg, #43e97b, #38f9d7)',
        time: '1 day ago',
        content: 'Hackathon this weekend! Who is joining? We need one more frontend dev.',
        likes: 45,
        comments: 12,
        isLiked: false,
        isFollowing: false
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

// --- Render Posts ---
function renderPosts() {
    const container = document.getElementById('postsContainer');
    if (!container) return;

    container.innerHTML = '';
    dummyPosts.forEach(post => {
        const likeIconColor = post.isLiked ? 'var(--coral)' : 'currentColor';
        const postHTML = `
            <div class="post-card">
                <div class="post-header">
                    <div class="post-author-wrapper">
                        <div class="post-avatar" style="background: ${post.avatarColor || post.color || 'var(--coral-500)'}">${post.initials || post.author.charAt(0)}</div>
                        <div class="post-meta">
                            <span class="post-author">${post.author}</span>
                            <span class="post-time">${post.time}</span>
                        </div>
                    </div>
                    <button class="follow-btn ${post.isFollowing ? 'following' : ''}" onclick="toggleFollow('${post.id}')" id="follow-btn-${post.id}">
                        ${post.isFollowing ? 'Following' : 'Follow'}
                    </button>
                </div>
                <div class="post-content">
                    ${post.content}
                    ${post.image ? `<div style="margin-top: 15px; border-radius: 12px; overflow: hidden; max-height: 250px; display: flex; align-items: center; justify-content: center; background: rgba(28, 61, 53, 0.05); padding: 15px;"><img src="${post.image}" alt="Post Image" style="max-width: 100%; max-height: 220px; object-fit: contain; filter: drop-shadow(0 4px 12px rgba(0,0,0,0.15));"></div>` : ''}
                </div>
                <div class="post-actions">
                    <button class="post-action-btn ${post.isLiked ? 'liked' : ''}" onclick="toggleLike('${post.id}')" id="like-btn-${post.id}">
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="${post.isLiked ? 'var(--coral)' : 'none'}" stroke="${likeIconColor}" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                            <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
                        </svg>
                        <span id="like-count-${post.id}">${post.likes}</span>
                    </button>
                    <button class="post-action-btn">
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                            <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"></path>
                        </svg>
                        ${post.comments}
                    </button>
                    <button class="post-action-btn">
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                            <circle cx="18" cy="5" r="3"></circle>
                            <circle cx="6" cy="12" r="3"></circle>
                            <circle cx="18" cy="19" r="3"></circle>
                            <line x1="8.59" y1="13.51" x2="15.42" y2="17.49"></line>
                            <line x1="15.41" y1="6.51" x2="8.59" y2="10.49"></line>
                        </svg>
                        Share
                    </button>
                </div>
            </div>
        `;
        container.insertAdjacentHTML('beforeend', postHTML);
    });
}

window.toggleLike = (postId) => {
    const post = dummyPosts.find(p => p.id === postId);
    if (!post) return;
    
    post.isLiked = !post.isLiked;
    post.likes += post.isLiked ? 1 : -1;
    
    // Re-render specifically for performance if needed, but for now re-render all
    
// --- Initialize Custom Posts ---
try {
    const customPosts = JSON.parse(localStorage.getItem('customFeedPosts') || '[]');
    if (customPosts.length > 0) {
        dummyPosts = [...customPosts, ...dummyPosts];
    }
} catch (e) {
    console.error("Error loading custom posts", e);
}

renderPosts();
};

window.toggleFollow = (postId) => {
    const post = dummyPosts.find(p => p.id === postId);
    if (!post) return;
    
    post.isFollowing = !post.isFollowing;
    
    // Optionally find all posts by this author and follow them too
    const author = post.author;
    dummyPosts.forEach(p => {
        if (p.author === author) {
            p.isFollowing = post.isFollowing;
        }
    });

    renderPosts();
};

// --- Render Leaderboard ---
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

// --- Render Badges ---
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
    
    // Auto slide logic (one badge at a time)
    let currentBadgeIndex = 0;
    setInterval(() => {
        if (container.matches(':hover')) return; // pause on hover
        
        currentBadgeIndex++;
        if (currentBadgeIndex >= userBadges.length) {
            currentBadgeIndex = 0;
        }
        
        container.scrollTo({
            left: currentBadgeIndex * container.clientWidth,
            behavior: 'smooth'
        });
    }, 3500); // Wait 3.5s, then slide to next
}

// --- Quiz Modal ---
window.openQuizModal = () => {
    // Simulate a quick quiz delay
    setTimeout(() => {
        document.getElementById('quizModal').classList.add('active');
    }, 500);
};

window.closeQuizModal = () => {
    document.getElementById('quizModal').classList.remove('active');
};

// --- Init ---
document.addEventListener('DOMContentLoaded', () => {
    renderPosts();
    renderLeaderboard();
    renderBadges();
    
    // Tab switching
    const tabs = document.querySelectorAll('.feed-tab');
    tabs.forEach(tab => {
        tab.addEventListener('click', (e) => {
            tabs.forEach(t => t.classList.remove('active'));
            e.target.classList.add('active');
            // Mock refresh posts
            renderPosts();
        });
    });
});
