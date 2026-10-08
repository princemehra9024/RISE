const fs = require('fs');
const path = require('path');

const dir = 'd:\\ALL-WEB-SITE\\priyanshu';

fs.readdirSync(dir).forEach(file => {
    if (file.endsWith('.html')) {
        let content = fs.readFileSync(path.join(dir, file), 'utf8');
        
        // Replace "Home" with "Study" in the mobile bottom nav
        const updated = content.replace(
            /<span class="mob-icon">🏠<\/span>\s*<span>Home<\/span>/g,
            '<span class="mob-icon">🏠</span>\n                <span>Study</span>'
        );

        if (content !== updated) {
            fs.writeFileSync(path.join(dir, file), updated);
            console.log(`Updated mobile nav in ${file}`);
        }
    }
});
