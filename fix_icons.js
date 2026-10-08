const fs = require('fs');
const path = require('path');

const dir = 'd:\\ALL-WEB-SITE\\priyanshu';

fs.readdirSync(dir).forEach(file => {
    if (file.endsWith('.html')) {
        let content = fs.readFileSync(path.join(dir, file), 'utf8');
        let updated = content;
        
        // AI Assistant 4-point sparkle
        const aiOldIcon = '<path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path>';
        const aiNewIcon = '<path d="M12 2l2.4 7.6 7.6 2.4-7.6 2.4-2.4 7.6-2.4-7.6-7.6-2.4 7.6-2.4 2.4-7.6z"></path>';
        
        // Badges award icon
        const badgesOldIcon = '<path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"></path>';
        const badgesNewIcon = '<circle cx="12" cy="8" r="7"></circle><polyline points="8.21 13.89 7 23 12 20 17 23 15.79 13.88"></polyline>';

        const leaderboardOldIcon = '<circle cx="12" cy="8" r="7"></circle><polyline points="8.21 13.89 7 23 12 20 17 23 15.79 13.88"></polyline>';
        const leaderboardNewIcon = '<path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6"></path><path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18"></path><path d="M4 22h16"></path><path d="M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20.24 7 22"></path><path d="M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20.24 17 22"></path><path d="M18 2H6v7a6 6 0 0 0 12 0V2z"></path>';

        updated = updated.split(leaderboardOldIcon).join(leaderboardNewIcon);
        updated = updated.split(badgesOldIcon).join(badgesNewIcon);
        updated = updated.split(aiOldIcon).join(aiNewIcon);
        
        if (content !== updated) {
            fs.writeFileSync(path.join(dir, file), updated);
            console.log(`Updated icons in ${file}`);
        }
    }
});
