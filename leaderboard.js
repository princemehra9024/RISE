import { db } from './firebase-config.js';
import { collection, query, orderBy, getDocs, limit } from 'https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js';

document.addEventListener('DOMContentLoaded', async () => {
    const podiumContainer = document.getElementById('podiumContainer');
    const leaderboardList = document.getElementById('leaderboardList');

    try {
        const q = query(collection(db, "users"), orderBy("quizPoints", "desc"), limit(50));
        const querySnapshot = await getDocs(q);
        
        let users = [];
        querySnapshot.forEach((doc) => {
            const data = doc.data();
            // Only include users who have actually played quizzes
            if (data.quizPoints && data.quizPoints > 0) {
                users.push({
                    id: doc.id,
                    name: data.profile?.fullName || 'Anonymous Scholar',
                    points: data.quizPoints || 0,
                    played: data.quizzesPlayed || 0
                });
            }
        });

        // If not enough users, add some mock data for demonstration
        if (users.length < 3) {
            const mockUsers = [
                { name: "Priyanshu", points: 1500, played: 15 },
                { name: "Prince Mehra", points: 1250, played: 12 },
                { name: "Alex Johnson", points: 900, played: 10 },
                { name: "Sarah Smith", points: 850, played: 9 },
                { name: "Mike Davis", points: 720, played: 8 }
            ];
            mockUsers.forEach(m => {
                if (!users.find(u => u.name === m.name)) users.push(m);
            });
            users.sort((a, b) => b.points - a.points);
        }

        renderLeaderboard(users);

    } catch (error) {
        console.error("Error fetching leaderboard: ", error);
        leaderboardList.innerHTML = `<div style="text-align:center; padding: 20px; color: red;">Failed to load leaderboard.</div>`;
    }

    function renderLeaderboard(users) {
        podiumContainer.innerHTML = '';
        leaderboardList.innerHTML = '';

        // Render Top 3 (Podium)
        // Order for flex is usually 2, 1, 3 so 1st place is in the middle
        const podiumOrder = [
            { rank: 2, user: users[1] },
            { rank: 1, user: users[0] },
            { rank: 3, user: users[2] }
        ];

        podiumOrder.forEach(item => {
            if (!item.user) return;
            const initials = item.user.name.charAt(0).toUpperCase();
            const crown = item.rank === 1 ? `<div class="crown">👑</div>` : '';
            
            const html = `
                <div class="podium-item rank-${item.rank}">
                    ${crown}
                    <div class="podium-avatar">${initials}</div>
                    <div class="podium-name">${item.user.name}</div>
                    <div class="podium-points">${item.user.points} pts</div>
                    <div class="podium-block">${item.rank}</div>
                </div>
            `;
            podiumContainer.insertAdjacentHTML('beforeend', html);
        });

        // Render List (Rank 4+)
        for (let i = 3; i < users.length; i++) {
            const user = users[i];
            const initials = user.name.charAt(0).toUpperCase();
            const rank = i + 1;
            
            const html = `
                <div class="list-item">
                    <div class="col-rank">#${rank}</div>
                    <div class="col-scholar">
                        <div class="list-avatar">${initials}</div>
                        <span>${user.name}</span>
                    </div>
                    <div class="col-quizzes">${user.played} quizzes</div>
                    <div class="col-points">${user.points} pts</div>
                </div>
            `;
            leaderboardList.insertAdjacentHTML('beforeend', html);
        }
    }
});
