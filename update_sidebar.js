const fs = require('fs');
const path = require('path');

const newSidebar = `
            <nav class="sidebar-nav">
                <!-- Profile Section -->
                <a href="profile.html" class="sb-nav-item" id="navProfile">
                    <span class="sb-icon">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>
                    </span>
                    <span>Profile</span>
                </a>

                <div class="nav-section-title">STUDY</div>
                <a href="index.html" class="sb-nav-item" id="navDashboard">
                    <span class="sb-icon">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
                    </span>
                    <span>Attendance</span>
                </a>
                <a href="#" class="sb-nav-item">
                    <span class="sb-icon">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="8" y1="6" x2="21" y2="6"></line><line x1="8" y1="12" x2="21" y2="12"></line><line x1="8" y1="18" x2="21" y2="18"></line><line x1="3" y1="6" x2="3.01" y2="6"></line><line x1="3" y1="12" x2="3.01" y2="12"></line><line x1="3" y1="18" x2="3.01" y2="18"></line></svg>
                    </span>
                    <span>Syllabus</span>
                </a>
                <a href="old-papers.html" class="sb-nav-item">
                    <span class="sb-icon">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline><line x1="16" y1="13" x2="8" y2="13"></line><line x1="16" y1="17" x2="8" y2="17"></line><polyline points="10 9 9 9 8 9"></polyline></svg>
                    </span>
                    <span>Old Papers</span>
                </a>
                <a href="#" class="sb-nav-item">
                    <span class="sb-icon">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"></path><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"></path></svg>
                    </span>
                    <span>Notes</span>
                </a>
                <a href="ai-study.html" class="sb-nav-item ai-assistant-link">
                    <span class="sb-icon">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path></svg>
                    </span>
                    <span>AI Assistant</span>
                    <span class="nav-soon-badge">Soon</span>
                </a>
                <a href="timetable.html" class="sb-nav-item">
                    <span class="sb-icon">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline></svg>
                    </span>
                    <span>Timetable</span>
                </a>

                <div class="nav-section-title">COMMUNITY</div>
                <a href="#" class="sb-nav-item">
                    <span class="sb-icon">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path></svg>
                    </span>
                    <span>Q&A</span>
                    <span class="nav-soon-badge">Soon</span>
                </a>
                <a href="leaderboard.html" class="sb-nav-item">
                    <span class="sb-icon">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="8" r="7"></circle><polyline points="8.21 13.89 7 23 12 20 17 23 15.79 13.88"></polyline></svg>
                    </span>
                    <span>Leaderboard</span>
                    <span class="nav-soon-badge">Soon</span>
                </a>
                <a href="#" class="sb-nav-item">
                    <span class="sb-icon">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle><path d="M23 21v-2a4 4 0 0 0-3-3.87"></path><path d="M16 3.13a4 4 0 0 1 0 7.75"></path></svg>
                    </span>
                    <span>Study Groups</span>
                    <span class="nav-soon-badge">Soon</span>
                </a>
                <a href="work.html" class="sb-nav-item">
                    <span class="sb-icon">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z"></path></svg>
                    </span>
                    <span>Projects</span>
                    <span class="nav-soon-badge">Soon</span>
                </a>
                <a href="#" class="sb-nav-item">
                    <span class="sb-icon">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="7" width="20" height="14" rx="2" ry="2"></rect><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"></path></svg>
                    </span>
                    <span>Placement Board</span>
                    <span class="nav-soon-badge">Soon</span>
                </a>

                <div class="nav-section-title">ME</div>
                <a href="#" class="sb-nav-item">
                    <span class="sb-icon">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"></path></svg>
                    </span>
                    <span>Badges</span>
                </a>
            </nav>
`;

const dir = 'd:\\ALL-WEB-SITE\\priyanshu';

fs.readdirSync(dir).forEach(file => {
    if (file.endsWith('.html')) {
        let content = fs.readFileSync(path.join(dir, file), 'utf8');
        
        // Remove the existing sidebar-nav
        const navRegex = /<nav class="sidebar-nav">[\s\S]*?<\/nav>/;
        const userRegex = /<div class="sidebar-user">[\s\S]*?<\/div>\s*<\/aside>/;
        
        let updated = content.replace(navRegex, newSidebar.trim());
        
        // Let's NOT remove sidebar user for now, but in the request, the user wants structure exactly same. Let me just remove sidebar-user since it's not in the design and profile is at the top.
        updated = updated.replace(userRegex, '</aside>');
        
        // fix active state based on file
        // a simple way: we will reset active class dynamically or just leave it off and let JS handle it, but wait, usually active class is statically added.
        // Let's dynamically add active class to the current page.
        if (file === 'index.html') {
            updated = updated.replace('<span>Attendance</span>', '<span>Attendance</span>').replace('id="navDashboard"', 'id="navDashboard" class="sb-nav-item active"');
            updated = updated.replace('class="sb-nav-item" id="navDashboard"', 'class="sb-nav-item active" id="navDashboard"');
        } else if (file === 'old-papers.html' || file === 'upload-paper.html') {
             updated = updated.replace('href="old-papers.html" class="sb-nav-item"', 'href="old-papers.html" class="sb-nav-item active"');
        } else if (file === 'profile.html') {
             updated = updated.replace('href="profile.html" class="sb-nav-item" id="navProfile"', 'href="profile.html" class="sb-nav-item active" id="navProfile"');
        } else if (file === 'timetable.html') {
             updated = updated.replace('href="timetable.html" class="sb-nav-item"', 'href="timetable.html" class="sb-nav-item active"');
        } else if (file === 'leaderboard.html') {
             updated = updated.replace('href="leaderboard.html" class="sb-nav-item"', 'href="leaderboard.html" class="sb-nav-item active"');
        } else if (file === 'work.html') {
             updated = updated.replace('href="work.html" class="sb-nav-item"', 'href="work.html" class="sb-nav-item active"');
        } else if (file === 'ai-study.html') {
             updated = updated.replace('href="ai-study.html" class="sb-nav-item ai-assistant-link"', 'href="ai-study.html" class="sb-nav-item ai-assistant-link active"');
        }

        fs.writeFileSync(path.join(dir, file), updated);
        console.log(`Updated ${file}`);
    }
});
