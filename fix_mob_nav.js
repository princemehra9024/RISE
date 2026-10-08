const fs = require('fs');
const path = require('path');

const newMobNav = `
        <nav class="mobile-bottom-nav">
            <a href="index.html" class="mob-nav-home">
                <span class="mob-icon"><svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path><polyline points="9 22 9 12 15 12 15 22"></polyline></svg></span>
                <span>Home</span>
            </a>
            <a href="study.html" class="mob-nav-study">
                <span class="mob-icon"><svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg></span>
                <span>Study</span>
            </a>
            <a href="old-papers.html" class="mob-nav-papers">
                <span class="mob-icon"><svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline><line x1="16" y1="13" x2="8" y2="13"></line><line x1="16" y1="17" x2="8" y2="17"></line><polyline points="10 9 9 9 8 9"></polyline></svg></span>
                <span>Papers</span>
            </a>
            <a href="events.html" class="mob-nav-events">
                <span class="mob-icon"><svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect><line x1="16" y1="2" x2="16" y2="6"></line><line x1="8" y1="2" x2="8" y2="6"></line><line x1="3" y1="10" x2="21" y2="10"></line></svg></span>
                <span>Events</span>
            </a>
            <a href="profile.html" class="mob-nav-profile">
                <span class="mob-icon"><svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg></span>
                <span>Profile</span>
            </a>
        </nav>
`;

const dir = 'd:\\ALL-WEB-SITE\\priyanshu';

fs.readdirSync(dir).forEach(file => {
    if (file.endsWith('.html')) {
        let content = fs.readFileSync(path.join(dir, file), 'utf8');
        
        // Match the mobile bottom nav
        const mobNavRegex = /<nav class="mobile-bottom-nav">[\s\S]*?<\/nav>/;
        if (!content.match(mobNavRegex)) return;

        let updated = content.replace(mobNavRegex, newMobNav.trim());
        
        // Fix active class based on page
        if (file === 'index.html') {
             updated = updated.replace('class="mob-nav-home"', 'class="mob-nav-home active"');
        } else if (file === 'study.html') {
             updated = updated.replace('class="mob-nav-study"', 'class="mob-nav-study active"');
        } else if (file === 'old-papers.html') {
             updated = updated.replace('class="mob-nav-papers"', 'class="mob-nav-papers active"');
        } else if (file === 'events.html') {
             updated = updated.replace('class="mob-nav-events"', 'class="mob-nav-events active"');
        } else if (file === 'profile.html') {
             updated = updated.replace('class="mob-nav-profile"', 'class="mob-nav-profile active"');
        }

        // Make sure we just remove the specific classes so they don't break CSS if they aren't used for styling
        updated = updated.replace(/class="mob-nav-[a-z]+"/g, '');
        updated = updated.replace(/class="mob-nav-[a-z]+ active"/g, 'class="active"');

        fs.writeFileSync(path.join(dir, file), updated);
        console.log(`Updated mobile nav in ${file}`);
    }
});
