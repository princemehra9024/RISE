import { getSyllabus, syllabus as defaultSyllabus } from "./syllabus.js";
import { auth, db } from "./firebase-config.js";
import { signOut as firebaseSignOut, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";
import { doc, getDoc, collection, getDocs } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

// ---------- Elements ----------

const profileLoading = document.getElementById("profileLoading");
const profileNotLoggedIn = document.getElementById("profileNotLoggedIn");
const profileContent = document.getElementById("profileContent");

// ---------- Helpers ----------

function countTotalTopics(syl) {
    let total = 0;
    syl.subjects.forEach(subject => {
        subject.units.forEach(unit => {
            total += unit.topics.length;
        });
    });
    return total;
}

async function getAllUsersProgress(syl) {
    const usersRef = collection(db, "users");
    const snapshot = await getDocs(usersRef);
    const users = [];
    const totalTopics = countTotalTopics(syl);

    snapshot.forEach(docSnap => {
        const data = docSnap.data();
        const profile = data.profile || {};
        const progress = data.progress || {};

        let completed = 0;
        syl.subjects.forEach(subject => {
            subject.units.forEach((unit, ui) => {
                unit.topics.forEach((_, ti) => {
                    if (progress[`${subject.id}-${ui}-${ti}`]) completed++;
                });
            });
        });

        users.push({
            uid: docSnap.id,
            name: profile.studentName || "Unknown",
            progress: totalTopics === 0 ? 0 : Math.round(completed * 100 / totalTopics),
            completed: completed,
            total: totalTopics,
        });
    });

    users.sort((a, b) => b.progress - a.progress);
    users.forEach((u, i) => { u.rank = i + 1; });
    return users;
}

// ---------- Auth State ----------

onAuthStateChanged(auth, async (user) => {
    if (!user) {
        profileLoading.classList.add("hidden");
        profileNotLoggedIn.classList.remove("hidden");
        return;
    }

    try {
        const docRef = doc(db, "users", user.uid);
        const docSnap = await getDoc(docRef);

        if (!docSnap.exists() || !docSnap.data().profile) {
            profileLoading.textContent = "Profile not set up yet. Redirecting...";
            setTimeout(() => { window.location.href = "index.html"; }, 1500);
            return;
        }

        const userData = docSnap.data();
        const profile = userData.profile;
        const progressData = userData.progress || {};

        // Resolve correct syllabus for this student's semester
        const syllabus = getSyllabus(profile) || defaultSyllabus;

        // Hide loading, show content
        profileLoading.classList.add("hidden");
        profileContent.classList.remove("hidden");

        // -- Populate Student Info --
        document.getElementById("pfAvatar").src = user.photoURL || "";
        document.getElementById("pfName").textContent = profile.studentName || "--";
        document.getElementById("pfEmail").textContent = user.email || "--";
        document.getElementById("pfBranch").textContent = profile.branch || "--";
        document.getElementById("pfSemester").textContent = `Sem ${profile.semester}`;
        document.getElementById("pfRollNumber").textContent = `Roll: ${profile.rollNumber}`;
        document.getElementById("pfCollege").textContent = profile.college || "--";
        document.getElementById("pfGoal").textContent = profile.goal || "--";

        // -- Contribution Stars --
        const contribPts   = userData.contributionPoints || 0;
        const totalUploads = userData.totalUploads || 0;
        renderContribStars(contribPts, totalUploads);

        // -- Calculate Progress Analytics --
        let total = 0, completed = 0;
        syllabus.subjects.forEach(subject => {
            subject.units.forEach((unit, ui) => {
                unit.topics.forEach((_, ti) => {
                    total++;
                    if (progressData[`${subject.id}-${ui}-${ti}`]) completed++;
                });
            });
        });

        const pct = total === 0 ? 0 : Math.round(completed * 100 / total);
        const remaining = total - completed;

        document.getElementById("pfProgress").textContent = pct + "%";
        document.getElementById("pfProgressBar").style.width = pct + "%";
        document.getElementById("pfCompleted").textContent = `${completed} / ${total}`;
        document.getElementById("pfRemaining").textContent = remaining;
        document.getElementById("pfReadiness").textContent = pct + "%";

        // -- Build Subject-wise Report --
        const reportContainer = document.getElementById("subjectReportContainer");
        reportContainer.innerHTML = "";

        syllabus.subjects.forEach(subject => {
            let subTotal = 0, subDone = 0;
            const remainingTopicsList = [];

            subject.units.forEach((unit, ui) => {
                unit.topics.forEach((topic, ti) => {
                    subTotal++;
                    const key = `${subject.id}-${ui}-${ti}`;
                    if (progressData[key]) {
                        subDone++;
                    } else {
                        remainingTopicsList.push({ topic, unit: unit.name });
                    }
                });
            });

            const subPct = subTotal === 0 ? 0 : Math.round(subDone * 100 / subTotal);

            const card = document.createElement("div");
            card.className = "pf-report-card";

            let remainingHTML = "";
            if (remainingTopicsList.length > 0) {
                remainingHTML = `
                    <div class="pf-remaining-section">
                        <div class="pf-remaining-header" data-toggle="remaining">
                            <span>${remainingTopicsList.length} remaining topics</span>
                            <span class="pf-toggle-arrow">&#9660;</span>
                        </div>
                        <ul class="pf-remaining-list" style="display:none;">
                            ${remainingTopicsList.map(t => `<li><span class="pf-remaining-unit">${t.unit}</span> ${t.topic}</li>`).join("")}
                        </ul>
                    </div>
                `;
            } else {
                remainingHTML = `<div class="pf-completed-badge">All topics completed</div>`;
            }

            card.innerHTML = `
                <div class="pf-report-top">
                    <div>
                        <h4>${subject.name}</h4>
                        <span class="pf-report-count">${subDone} / ${subTotal} topics</span>
                    </div>
                    <span class="pf-report-pct">${subPct}%</span>
                </div>
                <div class="pf-report-bar"><div class="pf-report-fill" style="width:${subPct}%"></div></div>
                ${remainingHTML}
            `;

            reportContainer.appendChild(card);
        });

        // Toggle events for remaining topics
        reportContainer.querySelectorAll(".pf-remaining-header").forEach(header => {
            header.addEventListener("click", () => {
                const list = header.nextElementSibling;
                const arrow = header.querySelector(".pf-toggle-arrow");
                if (list.style.display === "none") {
                    list.style.display = "block";
                    arrow.innerHTML = "&#9650;";
                } else {
                    list.style.display = "none";
                    arrow.innerHTML = "&#9660;";
                }
            });
        });

        // -- Load Leaderboard --
        const leaderboardBody = document.getElementById("leaderboardBody");
        const leaderboardLoading = document.getElementById("leaderboardLoading");
        const pfRankBadge = document.getElementById("pfRankBadge");
        leaderboardBody.innerHTML = "";
        leaderboardLoading.style.display = "block";

        try {
            const allUsers = await getAllUsersProgress(syllabus);
            leaderboardLoading.style.display = "none";

            const myEntry = allUsers.find(u => u.uid === user.uid);
            if (myEntry) {
                pfRankBadge.textContent = `Rank #${myEntry.rank} / ${allUsers.length} students`;
            } else {
                pfRankBadge.textContent = `-- / ${allUsers.length}`;
            }

            allUsers.forEach(u => {
                const tr = document.createElement("tr");
                const isMe = u.uid === user.uid;
                if (isMe) tr.classList.add("pf-leaderboard-me");

                let rankDisplay = u.rank;
                if (u.rank === 1) rankDisplay = "1st";
                else if (u.rank === 2) rankDisplay = "2nd";
                else if (u.rank === 3) rankDisplay = "3rd";
                else rankDisplay = u.rank + "th";

                const displayName = isMe ? `${u.name} (You)` : `Student #${u.rank}`;

                tr.innerHTML = `
                    <td class="pf-rank-cell">
                        <span class="pf-rank-num ${u.rank <= 3 ? 'pf-rank-top' : ''}">${rankDisplay}</span>
                    </td>
                    <td>
                        <span class="pf-lb-name">${displayName}</span>
                    </td>
                    <td>
                        <div class="pf-lb-progress-wrap">
                            <div class="pf-lb-progress-bar"><div class="pf-lb-progress-fill" style="width:${u.progress}%"></div></div>
                            <span class="pf-lb-pct">${u.progress}%</span>
                        </div>
                    </td>
                    <td class="pf-lb-topics">${u.completed} / ${u.total}</td>
                `;

                leaderboardBody.appendChild(tr);
            });

        } catch (err) {
            leaderboardLoading.textContent = "Could not load leaderboard. Check Firestore rules.";
            console.error("Leaderboard error:", err);
        }

        // -- Edit Profile Button --
        document.getElementById("pfEditBtn").addEventListener("click", () => {
            window.location.href = "index.html?edit=1";
        });

        // -- Sign Out Button --
        document.getElementById("pfSignOutBtn").addEventListener("click", async () => {
            await firebaseSignOut(auth);
            window.location.href = "index.html";
        });

    } catch (err) {
        profileLoading.textContent = "Error loading profile.";
        console.error("Profile load error:", err);
    }
});

// ============================================================
//  CONTRIBUTION STARS RENDERER
// ============================================================
const CONTRIB_TIERS = [
    { name: "First Spark",    icon: "🌟", min: 1,   color: "#FBBF24" },
    { name: "Bronze Star",    icon: "🥉", min: 10,  color: "#CD7F32" },
    { name: "Silver Scholar", icon: "🥈", min: 30,  color: "#C0C0C0" },
    { name: "Gold Guardian",  icon: "🥇", min: 60,  color: "#FFD700" },
    { name: "Legend",         icon: "👑", min: 100, color: "#A855F7" },
];

function renderContribStars(pts, uploads) {
    const section = document.getElementById("pfContribSection");
    if (!section) return;
    section.style.display = "block";

    // Points & uploads
    document.getElementById("pfContribPts").textContent    = `${pts} pts`;
    document.getElementById("pfTotalUploads").textContent  = uploads;

    // Light up stars
    const stars = document.querySelectorAll("#pfStarsRow .pf-star");
    let lit = 0;
    CONTRIB_TIERS.forEach((t, i) => { if (pts >= t.min) lit = i + 1; });
    stars.forEach((s, i) => {
        if (i < lit) {
            s.style.filter = "none";
            s.style.transform = "scale(1.1)";
        } else {
            s.style.filter = "grayscale(1) brightness(0.4)";
            s.style.transform = "scale(1)";
        }
    });

    // Current tier badge
    let currentTier = null;
    CONTRIB_TIERS.forEach(t => { if (pts >= t.min) currentTier = t; });
    const tierEl = document.getElementById("pfCurrentTier");
    if (currentTier) {
        tierEl.textContent = `${currentTier.icon} ${currentTier.name}`;
        tierEl.style.color = currentTier.color;
        tierEl.style.borderColor = currentTier.color + "44";
        tierEl.style.background  = currentTier.color + "1A";
    } else {
        tierEl.textContent = "🎯 Not Yet Contributed";
        tierEl.style.color = "#9896B8";
    }

    // Tier list
    document.getElementById("pfTierList").innerHTML = CONTRIB_TIERS.map(t => {
        const achieved = pts >= t.min;
        return `
        <div style="display:flex;align-items:center;gap:12px;padding:12px 16px;border-radius:12px;
                    background:${achieved ? t.color + '14' : 'rgba(255,255,255,0.03)'};
                    border:1px solid ${achieved ? t.color + '33' : 'transparent'};
                    transition:all 0.2s;">
            <span style="font-size:22px;">${t.icon}</span>
            <span style="font-size:14px;font-weight:700;color:${achieved ? '#F1F0FF' : '#6B6A8A'};flex:1;">${t.name}</span>
            <span style="font-size:12px;font-weight:700;color:${achieved ? t.color : '#4D4D6B'};">
                ${achieved ? '✓ Achieved' : t.min + '+ pts'}
            </span>
        </div>`;
    }).join("");

    // Next milestone progress bar
    const nextTier = CONTRIB_TIERS.find(t => pts < t.min);
    const milestoneEl  = document.getElementById("pfNextMilestone");
    const milestoneBar = document.getElementById("pfMilestoneBar");
    const milestoneText = document.getElementById("pfNextMilestoneText");

    if (nextTier) {
        const prevMin = CONTRIB_TIERS[CONTRIB_TIERS.indexOf(nextTier) - 1]?.min || 0;
        const pct = Math.min(100, Math.round((pts - prevMin) / (nextTier.min - prevMin) * 100));
        milestoneEl.style.display = "block";
        milestoneText.textContent = `${nextTier.icon} ${nextTier.name} — ${nextTier.min - pts} more points needed (upload ${Math.ceil((nextTier.min - pts) / 10)} more paper${Math.ceil((nextTier.min - pts) / 10) > 1 ? 's' : ''})`;
        setTimeout(() => { milestoneBar.style.width = pct + "%"; }, 100);
    } else {
        milestoneEl.style.display = "none";
    }
}
