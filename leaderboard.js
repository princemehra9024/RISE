import { db } from './firebase-config.js';
import { collection, query, orderBy, getDocs, limit } from 'https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js';

document.addEventListener('DOMContentLoaded', async () => {
    const podiumContainer = document.getElementById('podiumContainer');
    const leaderboardList = document.getElementById('leaderboardList');
    const tabs = document.querySelectorAll('.lb-tab');

    // Tab interactions (UI only for now)
    tabs.forEach(tab => {
        tab.addEventListener('click', () => {
            tabs.forEach(t => t.classList.remove('active'));
            tab.classList.add('active');
            // Here you could refetch data based on time periods
        });
    });

    try {
        const q = query(collection(db, "users"));
        const querySnapshot = await getDocs(q);
        
        let users = [];
        querySnapshot.forEach((doc) => {
            const data = doc.data();
            users.push({
                id: doc.id,
                name: data.profile?.fullName || data.fullName || data.name || 'Anonymous Scholar',
                points: data.quizPoints || 0,
                played: data.quizzesPlayed || 0
            });
        });

        // Sort by points descending
        users.sort((a, b) => b.points - a.points);
        
        // Take top 50
        users = users.slice(0, 50);

        renderLeaderboard(users);

    } catch (error) {
        console.error("Error fetching leaderboard: ", error);
        leaderboardList.innerHTML = `<div style="text-align:center; padding: 20px; color: red;">Failed to load leaderboard.</div>`;
    }

    function getAvatarColor(rank) {
        const colors = [
            'linear-gradient(135deg, #FFD700, #FDB931)',
            'linear-gradient(135deg, #E0E0E0, #9E9E9E)',
            'linear-gradient(135deg, #E29B5A, #CD7F32)',
            'linear-gradient(135deg, #D4A5FF, #9B4DFF)',
            'linear-gradient(135deg, #FF9A9E, #FECFEF)',
            'linear-gradient(135deg, #84FAB0, #8FD3F4)'
        ];
        return colors[(rank - 1) % colors.length];
    }

    function renderLeaderboard(users) {
        podiumContainer.innerHTML = '';
        leaderboardList.innerHTML = '';

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
                </div>
            `;
            podiumContainer.insertAdjacentHTML('beforeend', html);
        });

        // List
        for (let i = 3; i < users.length; i++) {
            const user = users[i];
            const initials = user.name.charAt(0).toUpperCase();
            const rank = i + 1;
            const bg = getAvatarColor(rank);
            
            const html = `
                <div class="list-item" style="animation-delay: ${i * 0.1}s">
                    <div class="col-rank">${rank}</div>
                    <div class="col-scholar">
                        <div class="list-avatar" style="background: ${bg}">${initials}</div>
                        <div class="scholar-details">
                            <span class="scholar-name">${user.name}</span>
                        </div>
                    </div>
                    <div class="col-points">${user.points}</div>
                </div>
            `;
            leaderboardList.insertAdjacentHTML('beforeend', html);
        }
    }
});
