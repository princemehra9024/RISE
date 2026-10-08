const fs = require('fs');
const path = require('path');

const newSidebar = `
            <nav class="sidebar-nav">
                <!-- Profile Section -->
                <a href="index.html" class="sb-nav-item" id="navHome">
                    <span class="sb-icon">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path><polyline points="9 22 9 12 15 12 15 22"></polyline></svg>
                    </span>
                    <span>Home</span>
                </a>

                <a href="profile.html" class="sb-nav-item" id="navProfile">
                    <span class="sb-icon">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>
                    </span>
                    <span>Profile</span>
                </a>

                <div class="nav-section-title">STUDY</div>
                <a href="study.html" class="sb-nav-item">
                    <span class="sb-icon">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
                    </span>
                    <span>Study</span>
                </a>

                <a href="old-papers.html" class="sb-nav-item">
                    <span class="sb-icon">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline><line x1="16" y1="13" x2="8" y2="13"></line><line x1="16" y1="17" x2="8" y2="17"></line><polyline points="10 9 9 9 8 9"></polyline></svg>
                    </span>
                    <span>Old Papers</span>
                </a>

                <a href="ai-study.html" class="sb-nav-item ai-assistant-link">
                    <span class="sb-icon">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path></svg>
                    </span>
                    <span>AI Assistant</span>
                </a>

                <a href="timetable.html" class="sb-nav-item">
                    <span class="sb-icon">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline></svg>
                    </span>
                    <span>Timetable</span>
                </a>

                <div class="nav-section-title">COMMUNITY</div>

                <a href="index.html#create-post" class="sb-nav-item">
                    <span class="sb-icon">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 20h9"></path><path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"></path></svg>
                    </span>
                    <span>Create Post</span>
                </a>

                <a href="leaderboard.html" class="sb-nav-item">
                    <span class="sb-icon">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="8" r="7"></circle><polyline points="8.21 13.89 7 23 12 20 17 23 15.79 13.88"></polyline></svg>
                    </span>
                    <span>Leaderboard</span>
                </a>

                <a href="events.html" class="sb-nav-item">
                    <span class="sb-icon">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect><line x1="16" y1="2" x2="16" y2="6"></line><line x1="8" y1="2" x2="8" y2="6"></line><line x1="3" y1="10" x2="21" y2="10"></line></svg>
                    </span>
                    <span>Events</span>
                </a>

                <a href="work.html" class="sb-nav-item">
                    <span class="sb-icon">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z"></path></svg>
                    </span>
                    <span>Projects</span>
                </a>
            </nav>`;

const dir = 'd:\\ALL-WEB-SITE\\priyanshu';

fs.readdirSync(dir).forEach(file => {
    if (file.endsWith('.html')) {
        let content = fs.readFileSync(path.join(dir, file), 'utf8');
        
        // Remove the existing sidebar-nav
        const navRegex = /<nav class="sidebar-nav">[\s\S]*?<\/nav>/;
        
        let updated = content.replace(navRegex, newSidebar.trim());
        
        // fix active state based on file
        if (file === 'index.html') {
             updated = updated.replace('href="index.html" class="sb-nav-item"', 'href="index.html" class="sb-nav-item active"');
        } else if (file === 'study.html') {
             updated = updated.replace('href="study.html" class="sb-nav-item"', 'href="study.html" class="sb-nav-item active"');
        } else if (file === 'events.html') {
             updated = updated.replace('href="events.html" class="sb-nav-item"', 'href="events.html" class="sb-nav-item active"');
        } else if (file === 'old-papers.html' || file === 'upload-paper.html') {
             updated = updated.replace('href="old-papers.html" class="sb-nav-item"', 'href="old-papers.html" class="sb-nav-item active"');
        } else if (file === 'profile.html') {
             updated = updated.replace('href="profile.html" class="sb-nav-item"', 'href="profile.html" class="sb-nav-item active"');
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
