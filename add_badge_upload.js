const fs = require('fs');
const path = require('path');

const eventsHtmlPath = path.join('d:\\ALL-WEB-SITE\\priyanshu', 'events.html');
const eventsCssPath = path.join('d:\\ALL-WEB-SITE\\priyanshu', 'events.css');

// 1. Update events.html
let html = fs.readFileSync(eventsHtmlPath, 'utf8');
const searchString = '<div class="form-group">\n                    <label>Quiz Questions</label>';
const replacementHtml = `
                <div class="form-group">
                    <label>Quiz Badge Image</label>
                    <div class="badge-upload-box" id="badgeUploadBox" onclick="document.getElementById('inputBadgeImage').click()">
                        <input type="file" id="inputBadgeImage" accept="image/*" class="badge-upload-input" hidden>
                        <div class="badge-upload-content" id="badgeUploadContent">
                            <span class="upload-icon">
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect><circle cx="8.5" cy="8.5" r="1.5"></circle><polyline points="21 15 16 10 5 21"></polyline></svg>
                            </span>
                            <span class="upload-text">Upload Custom Badge</span>
                            <span class="upload-subtext">Click to browse (JPG, PNG)</span>
                        </div>
                    </div>
                </div>

                <div class="form-group">
                    <label>Quiz Questions</label>`;

html = html.replace(/<div class="form-group">\s*<label>Quiz Questions<\/label>/, replacementHtml.trimStart());
fs.writeFileSync(eventsHtmlPath, html);

// 2. Update events.css
let css = fs.readFileSync(eventsCssPath, 'utf8');
const newCss = `

/* ============================================================
   BADGE UPLOAD BOX
   ============================================================ */
.badge-upload-box {
    width: 100%;
    border: 2px dashed rgba(28, 61, 53, 0.3);
    border-radius: 12px;
    background: #FAF7F2;
    padding: 24px;
    text-align: center;
    cursor: pointer;
    transition: all 0.3s ease;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    position: relative;
    overflow: hidden;
}

.badge-upload-box:hover {
    border-color: #E8856A;
    background: rgba(232, 133, 106, 0.05);
}

.badge-upload-box.has-image {
    padding: 0;
    border-style: solid;
    border-color: #1C3D35;
}

.badge-upload-content {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 8px;
    pointer-events: none;
}

.badge-upload-box .upload-icon {
    color: #1C3D35;
    background: rgba(28, 61, 53, 0.1);
    width: 48px;
    height: 48px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-bottom: 4px;
}

.badge-upload-box .upload-text {
    font-size: 0.95rem;
    font-weight: 600;
    color: #1C3D35;
}

.badge-upload-box .upload-subtext {
    font-size: 0.75rem;
    color: rgba(28, 61, 53, 0.6);
}

.badge-preview-img {
    width: 100%;
    height: 140px;
    object-fit: contain;
    background: transparent;
    padding: 10px;
}
`;
css += newCss;
fs.writeFileSync(eventsCssPath, css);

console.log("Updated HTML and CSS.");
