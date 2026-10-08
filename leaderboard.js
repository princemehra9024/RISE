import { db, auth } from './firebase-config.js';
import { collection, query, getDocs } from 'https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js';
import { onAuthStateChanged } from 'https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js';

document.addEventListener('DOMContentLoaded', () => {
    const podiumContainer = document.getElementById('podiumContainer');
    const leaderboardList = document.getElementById('leaderboardList');
    const tabs = document.querySelectorAll('.lb-tab');

    // Tab interactions (UI only for now)
    tabs.forEach(tab => {
        tab.addEventListener('click', () => {
            tabs.forEach(t => t.classList.remove('active'));
            tab.classList.add('active');
        });
    });

    // Wait for auth state before fetching leaderboard
    onAuthStateChanged(auth, async (user) => {
        if (!user) {
            // Not logged in — show a message
            podiumContainer.innerHTML = '';
            leaderboardList.innerHTML = `
                <div style="text-align: center; padding: 30px; color: rgba(28,61,53,0.6);">
                    <div style="font-size: 2.5rem; margin-bottom: 12px;">🔒</div>
                    <p style="font-weight: 600; margin-bottom: 6px;">Please log in to view the leaderboard</p>
                    <a href="study.html" style="color: #E8856A; font-weight: 700; text-decoration: none;">Go to Dashboard →</a>
                </div>
            `;
            return;
        }

        // User is logged in — fetch leaderboard
        try {
            const q = query(collection(db, "users"));
            const querySnapshot = await getDocs(q);
            
            let users = [];
            querySnapshot.forEach((docSnap) => {
                const data = docSnap.data();
                const profile = data.profile || {};
                
                // The name is stored as profile.studentName
                const name = profile.studentName || '';
                const points = data.quizPoints || 0;
                const played = data.quizzesPlayed || 0;
                
                // Only include users who have a real name
                if (name && name.trim() !== '') {
                    users.push({
                        id: docSnap.id,
                        name: name.trim(),
                        points: points,
                        played: played
                    });
                }
            });

            // Sort by points descending
            users.sort((a, b) => b.points - a.points);
            
            // Take top 50
            users = users.slice(0, 50);

            renderLeaderboard(users);

        } catch (error) {
            console.error("Error fetching leaderboard: ", error);
            leaderboardList.innerHTML = `<div style="text-align:center; padding: 20px; color: red;">Failed to load leaderboard. Please refresh the page.</div>`;
        }
    });

    function getAvatarColor(rank) {
        const colors = [
            'linear-gradient(135deg, #FFD700, #FDB931)',
            'linear-gradient(135deg, #E0E0E0, #9E9E9E)',
            'linear-gradient(135deg, #E29B5A, #CD7F32)',
            'linear-gradient(135deg, #667eea, #764ba2)',
            'linear-gradient(135deg, #f093fb, #f5576c)',
            'linear-gradient(135deg, #4facfe, #00f2fe)',
            'linear-gradient(135deg, #43e97b, #38f9d7)',
            'linear-gradient(135deg, #fa709a, #fee140)'
        ];
        return colors[(rank - 1) % colors.length];
    }

    function renderLeaderboard(users) {
        podiumContainer.innerHTML = '';
        leaderboardList.innerHTML = '';

        // If no users exist, show empty state
        if (users.length === 0) {
            podiumContainer.innerHTML = `
                <div style="text-align: center; padding: 40px; width: 100%;">
                    <div style="font-size: 3rem; margin-bottom: 16px;">🏆</div>
                    <h3 style="color: #1C3D35; font-family: 'Playfair Display', serif; margin-bottom: 8px;">No Scores Yet!</h3>
                    <p style="color: rgba(28,61,53,0.5); font-size: 0.95rem;">Be the first to participate in a quiz and claim the #1 spot!</p>
                    <a href="events.html" style="display: inline-block; margin-top: 16px; padding: 12px 28px; background: #1C3D35; color: white; border-radius: 10px; text-decoration: none; font-weight: 700; transition: all 0.3s;" onmouseover="this.style.transform='translateY(-2px)'; this.style.boxShadow='0 8px 25px rgba(28,61,53,0.3)'" onmouseout="this.style.transform=''; this.style.boxShadow=''">Take a Quiz ✦</a>
                </div>
            `;
            return;
        }

        // Podium (top 3)
        const podiumOrder = [
            { rank: 2, user: users[1] },
            { rank: 1, user: users[0] },
            { rank: 3, user: users[2] }
        ];

        podiumOrder.forEach(item => {
            if (!item.user) return;
            const initials = item.user.name.charAt(0).toUpperCase();
            
            const html = `
                <div class="podium-item rank-${item.rank}">
                    <div class="podium-avatar-wrapper">
                        <div class="podium-avatar">${initials}</div>
                        <div class="diamond-badge">
                            <span>${item.rank}</span>
                        </div>
                    </div>
                    <div class="podium-name">${item.user.name}</div>
                    <div class="podium-points">${item.user.points} pts</div>
                    <div class="podium-played">${item.user.played} quiz${item.user.played !== 1 ? 'zes' : ''}</div>
                </div>
            `;
            podiumContainer.insertAdjacentHTML('beforeend', html);
        });

        // List (rank 4+)
        for (let i = 3; i < users.length; i++) {
            const user = users[i];
            const initials = user.name.charAt(0).toUpperCase();
            const rank = i + 1;
            const bg = getAvatarColor(rank);
            
            const html = `
                <div class="list-item" style="animation-delay: ${(i - 3) * 0.1}s">
                    <div class="col-rank">${rank}</div>
                    <div class="col-scholar">
                        <div class="list-avatar" style="background: ${bg}">${initials}</div>
                        <div class="scholar-details">
                            <span class="scholar-name">${user.name}</span>
                            <span class="scholar-quizzes">${user.played} quiz${user.played !== 1 ? 'zes' : ''} played</span>
                        </div>
                    </div>
                    <div class="col-points">${user.points}</div>
                </div>
            `;
            leaderboardList.insertAdjacentHTML('beforeend', html);
        }

        // Animate points counting up for podium items
        animatePodiumPoints();
    }

    function animatePodiumPoints() {
        const podiumPts = document.querySelectorAll('.podium-points');
        podiumPts.forEach(el => {
            const text = el.textContent;
            const match = text.match(/(\d+)/);
            if (!match) return;
            const target = parseInt(match[1]);
            el.textContent = '0 pts';
            
            const start = performance.now();
            const duration = 1500;
            
            function update(now) {
                const elapsed = now - start;
                const progress = Math.min(elapsed / duration, 1);
                const eased = 1 - Math.pow(1 - progress, 3);
                const current = Math.round(eased * target);
                el.textContent = `${current} pts`;
                if (progress < 1) requestAnimationFrame(update);
            }
            
            // Delay start to match podium pop-in animation
            setTimeout(() => requestAnimationFrame(update), 600);
        });
    }
});
