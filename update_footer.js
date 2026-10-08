const fs = require('fs');
const path = require('path');

const dir = 'd:\\ALL-WEB-SITE\\priyanshu';

const oldCredits = `<div class="rf-credit-item is-founder">
                    <span class="rf-credit-av" style="background:linear-gradient(135deg,#E8856A,#F5C842)">P</span>
                    <div class="rf-credit-info">
                        <span class="rf-credit-name">Priyanshu</span>
                        <span class="rf-credit-role">Founder &amp; Visionary</span>
                    </div>
                </div>
                <div class="rf-credit-item">
                    <span class="rf-credit-av" style="background:linear-gradient(135deg,#E8856A,#c96b50)">P</span>
                    <div class="rf-credit-info">
                        <span class="rf-credit-name">Prince Mehra</span>
                        <span class="rf-credit-role">Lead Developer</span>
                    </div>
                </div>`;

const newCredits = `<div class="rf-credits-grid">
                    <div class="rf-credit-item is-founder">
                        <span class="rf-credit-av" style="background:linear-gradient(135deg,#E8856A,#F5C842)">P</span>
                        <div class="rf-credit-info">
                            <span class="rf-credit-name">Priyanshu</span>
                            <span class="rf-credit-role">Founder</span>
                        </div>
                    </div>
                    <div class="rf-credit-item">
                        <span class="rf-credit-av" style="background:linear-gradient(135deg,#E8856A,#c96b50)">P</span>
                        <div class="rf-credit-info">
                            <span class="rf-credit-name">Prince Mehra</span>
                            <span class="rf-credit-role">Lead Developer</span>
                        </div>
                    </div>
                </div>`;

fs.readdirSync(dir).forEach(file => {
    if (file.endsWith('.html')) {
        let content = fs.readFileSync(path.join(dir, file), 'utf8');
        
        // Remove spaces and normalize to make replace more robust
        let normalizedOld = oldCredits.replace(/\s+/g, ' ');
        
        let fileContentNormalized = content.replace(/\s+/g, ' ');
        if (fileContentNormalized.includes(normalizedOld)) {
            // Find start index
            const startIndex = fileContentNormalized.indexOf(normalizedOld);
            // Replace by matching the regex or just a string replace
            let updated = content.replace(/<div class="rf-credit-item is-founder">[\s\S]*?Lead Developer<\/span>\s*<\/div>\s*<\/div>/, newCredits);
            
            if (updated !== content) {
                fs.writeFileSync(path.join(dir, file), updated);
                console.log(`Updated footer in ${file}`);
            }
        }
    }
});
