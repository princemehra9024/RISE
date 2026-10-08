const fs = require('fs');
const path = require('path');

const homeJsPath = path.join('d:\\ALL-WEB-SITE\\priyanshu', 'home.js');

let js = fs.readFileSync(homeJsPath, 'utf8');

// 1. Change 'const dummyPosts =' to 'let dummyPosts ='
js = js.replace('const dummyPosts = [', 'let dummyPosts = [');

// 2. Before the first renderPosts() call at the end of the file, merge the localStorage posts.
// The file calls renderPosts(); renderLeaderboard(); renderBadges(); at the end.
const initCode = `
// --- Initialize Custom Posts ---
try {
    const customPosts = JSON.parse(localStorage.getItem('customFeedPosts') || '[]');
    if (customPosts.length > 0) {
        dummyPosts = [...customPosts, ...dummyPosts];
    }
} catch (e) {
    console.error("Error loading custom posts", e);
}

renderPosts();`;

js = js.replace('renderPosts();', initCode);

// 3. Inject image rendering in renderPosts()
const oldContentBlock = `<div class="post-content">
                    \${post.content}
                </div>`;
const newContentBlock = `<div class="post-content">
                    \${post.content}
                    \${post.image ? \`<div style="margin-top: 15px; border-radius: 12px; overflow: hidden; max-height: 250px; display: flex; align-items: center; justify-content: center; background: rgba(28, 61, 53, 0.05); padding: 15px;"><img src="\${post.image}" alt="Post Image" style="max-width: 100%; max-height: 220px; object-fit: contain; filter: drop-shadow(0 4px 12px rgba(0,0,0,0.15));"></div>\` : ''}
                </div>`;

js = js.replace(oldContentBlock, newContentBlock);

// 4. Update the avatar color handling because custom posts have 'color' and 'initials' instead of avatarColor
const oldAvatarBlock = `<div class="post-avatar" style="background: \${post.avatarColor}">\${post.author.charAt(0)}</div>`;
const newAvatarBlock = `<div class="post-avatar" style="background: \${post.avatarColor || post.color || 'var(--coral-500)'}">\${post.initials || post.author.charAt(0)}</div>`;

js = js.replace(oldAvatarBlock, newAvatarBlock);

fs.writeFileSync(homeJsPath, js);
console.log("Updated home.js");
