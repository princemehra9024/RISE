import { getSyllabus, syllabus as defaultSyllabus } from "./syllabus.js";
import { auth, db, provider } from "./firebase-config.js";
import { signInWithPopup, signOut as firebaseSignOut, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";
import { doc, getDoc, setDoc, collection, getDocs } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

// ---------- Auth & User State ----------

// Firebase Auth requires localhost, 127.0.0.1 is not authorized by default.
if (window.location.hostname === '127.0.0.1') {
    window.location.hostname = 'localhost';
}

let currentUser = null;
let progressData = {};
let studentProfile = null;
let syllabus = defaultSyllabus; // resolved per-profile after login
let growthChart = null;

// ---------- Cloud Firestore Database ----------

async function getSavedData() {
    if (!currentUser) return {};
    const docRef = doc(db, "users", currentUser.uid);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
        return docSnap.data().progress || {};
    }
    return {};
}

async function saveData(data) {
    if (!currentUser) return;
    const docRef = doc(db, "users", currentUser.uid);
    await setDoc(docRef, { progress: data }, { merge: true });
}

async function getStudentProfile() {
    if (!currentUser) return null;
    const docRef = doc(db, "users", currentUser.uid);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists() && docSnap.data().profile) {
        return docSnap.data().profile;
    }
    return null;
}

async function saveStudentProfile(profile) {
    if (!currentUser) return;
    const docRef = doc(db, "users", currentUser.uid);
    await setDoc(docRef, { profile }, { merge: true });
}

// ---------- Elements ----------

const subjectsContainer = document.getElementById("subjectsContainer");
const subjectView = document.getElementById("subjectView");
const subjectTitle = document.getElementById("subjectTitle");
const unitsContainer = document.getElementById("unitsContainer");

const completedTopics = document.getElementById("completedTopics");
const remainingTopics = document.getElementById("remainingTopics");
const overallPercentage = document.getElementById("overallPercentage");
const overallProgress = document.getElementById("overallProgress");
const totalSubjects = document.getElementById("totalSubjects");
const backBtn = document.getElementById("backBtn");
const circleProgress = document.getElementById("circleProgress");
const heroName = document.getElementById("heroName");

// Auth Elements
const loginScreen = document.getElementById("loginScreen");
const dashboard = document.getElementById("dashboard");
const profileName = document.getElementById("profileName");
const profileImage = document.getElementById("profileImage");
const signOutBtn = document.getElementById("signOutBtn");
const firebaseLoginBtn = document.getElementById("firebaseLoginBtn");

// Profile Setup Elements
const profileSetupScreen = document.getElementById("profileSetupScreen");
const profileSetupForm = document.getElementById("profileSetupForm");
const inputStudentName = document.getElementById("inputStudentName");
const inputRollNumber = document.getElementById("inputRollNumber");
const inputBranch = document.getElementById("inputBranch");
const inputSemester = document.getElementById("inputSemester");
const inputCollege = document.getElementById("inputCollege");
const inputGoal = document.getElementById("inputGoal");
const profileSemBadge = document.getElementById("profileSemBadge");
const viewProfileBtn = document.getElementById("viewProfileBtn");

// ========================================
// AUTHENTICATION
// ========================================

firebaseLoginBtn.addEventListener("click", async () => {
    const originalText = firebaseLoginBtn.innerHTML;
    firebaseLoginBtn.disabled = true;
    firebaseLoginBtn.innerHTML = `<span style="opacity:0.7">Signing in...</span>`;
    try {
        await signInWithPopup(auth, provider);
    } catch (error) {
        console.error("Login Failed:", error);
        firebaseLoginBtn.disabled = false;
        firebaseLoginBtn.innerHTML = originalText;
        // Show user-friendly error
        let msg = "Login failed. Please try again.";
        if (error.code === "auth/popup-blocked") {
            msg = "Popup was blocked! Please allow popups for this site and try again.";
        } else if (error.code === "auth/popup-closed-by-user") {
            msg = "Sign-in was cancelled. Please try again.";
        } else if (error.code === "auth/network-request-failed") {
            msg = "Network error. Check your internet connection and try again.";
        } else if (error.code === "auth/unauthorized-domain") {
            msg = "This domain is not authorized in Firebase. Add it to Firebase Console → Authentication → Authorized Domains.";
        }
        const errDiv = document.createElement("div");
        errDiv.style.cssText = "color:#e05a4e;background:rgba(224,90,78,0.1);border:1px solid rgba(224,90,78,0.3);border-radius:10px;padding:10px 14px;font-size:13px;margin-top:12px;text-align:center;";
        errDiv.textContent = msg;
        const existing = firebaseLoginBtn.parentNode.querySelector(".login-error-msg");
        if (existing) existing.remove();
        errDiv.className = "login-error-msg";
        firebaseLoginBtn.parentNode.insertBefore(errDiv, firebaseLoginBtn.nextSibling);
    }
});

signOutBtn.addEventListener("click", async () => {
    await firebaseSignOut(auth);
});

onAuthStateChanged(auth, async (user) => {
    if (user) {
        currentUser = user;

        // Update Google Profile UI
        profileName.textContent = currentUser.displayName || currentUser.email;
        profileImage.src = currentUser.photoURL || "";

        // Hide Login
        loginScreen.classList.add("hidden");

        // Load Student Profile from Firestore
        try {
            studentProfile = await getStudentProfile();
        } catch (error) {
            console.error("Error loading profile:", error);
            studentProfile = null;
        }

        if (!studentProfile) {
            // First time user (or error): show profile setup
            dashboard.classList.add("hidden");
            profileSetupScreen.classList.remove("hidden");
        } else {
            // Returning user: show dashboard
            updateHeaderBadge(studentProfile);

            // Check if editing
            const urlParams = new URLSearchParams(window.location.search);
            if (urlParams.get('edit') === '1') {
                dashboard.classList.add("hidden");
                profileSetupScreen.classList.remove("hidden");
                
                inputStudentName.value = studentProfile.studentName || "";
                inputRollNumber.value = studentProfile.rollNumber || "";
                inputBranch.value = studentProfile.branch || "";
                inputSemester.value = studentProfile.semester || "";
                inputCollege.value = studentProfile.college || "";
                inputGoal.value = studentProfile.goal || "";
            } else {
                profileSetupScreen.classList.add("hidden");
                dashboard.classList.remove("hidden");
            }

            // Resolve correct syllabus for this student's semester
            syllabus = getSyllabus(studentProfile) || defaultSyllabus;

            // Load Progress Data from Firestore
            try {
                progressData = await getSavedData();
            } catch (error) {
                console.error("Error loading progress:", error);
                progressData = {};
            }
            createSubjectCards();
            updateDashboard();
        }
    } else {
        // Clear user state
        currentUser = null;
        progressData = {};
        studentProfile = null;

        // Hide Dashboard & Setup, Show Login
        dashboard.classList.add("hidden");
        profileSetupScreen.classList.add("hidden");
        loginScreen.classList.remove("hidden");
    }
});

// ========================================
// PROFILE SETUP FORM
// ========================================

profileSetupForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    const saveBtn = document.getElementById("saveProfileBtn");
    const originalBtnText = saveBtn.textContent;
    saveBtn.textContent = "Saving...";
    saveBtn.disabled = true;

    // Remove any previous error
    const existingErr = profileSetupForm.querySelector(".setup-error-msg");
    if (existingErr) existingErr.remove();

    const profile = {
        studentName: inputStudentName.value.trim(),
        rollNumber: inputRollNumber.value.trim(),
        branch: inputBranch.value,
        semester: inputSemester.value,
        college: inputCollege.value.trim(),
        goal: inputGoal.value.trim() || "Study hard & excel!",
    };

    try {
        await saveStudentProfile(profile);
        studentProfile = profile;

        updateHeaderBadge(profile);

        // Remove edit param if it was there
        window.history.replaceState({}, document.title, window.location.pathname);

        // Show dashboard
        profileSetupScreen.classList.add("hidden");
        dashboard.classList.remove("hidden");

        // Resolve correct syllabus for this student's semester
        syllabus = getSyllabus(studentProfile) || defaultSyllabus;

        // Load Progress
        try {
            progressData = await getSavedData();
        } catch (err) {
            console.warn("Could not load progress data:", err);
            progressData = {};
        }
        createSubjectCards();
        updateDashboard();

        saveBtn.textContent = originalBtnText;
        saveBtn.disabled = false;
    } catch (error) {
        console.error("Profile save failed:", error);
        saveBtn.textContent = originalBtnText;
        saveBtn.disabled = false;

        // Show error message in the form
        let errMsg = "Failed to save profile. Please try again.";
        if (error.code === "permission-denied") {
            errMsg = "Permission denied. Check your Firestore security rules in Firebase Console.";
        } else if (error.code === "unavailable" || error.message?.includes("network")) {
            errMsg = "Network error. Check your internet connection and try again.";
        }
        const errDiv = document.createElement("div");
        errDiv.className = "setup-error-msg";
        errDiv.style.cssText = "color:#e05a4e;background:rgba(224,90,78,0.1);border:1px solid rgba(224,90,78,0.3);border-radius:10px;padding:10px 14px;font-size:13px;margin-top:12px;text-align:center;";
        errDiv.textContent = errMsg;
        saveBtn.parentNode.insertBefore(errDiv, saveBtn);
    }
});

// ========================================
// HEADER BADGE
// ========================================

function updateHeaderBadge(profile) {
    if (profileSemBadge && profile) {
        profileSemBadge.textContent = `${profile.branch} · Sem ${profile.semester}`;
    }
    
    const heroCourseBadge = document.getElementById("heroCourseBadge");
    if (heroCourseBadge && profile) {
        heroCourseBadge.textContent = `${profile.branch} — Semester ${profile.semester}`;
        heroCourseBadge.style.display = "inline-block";
    }

    const name = profile?.studentName || currentUser?.displayName || "Student";
    if (profileName) profileName.textContent = name;
    if (heroName)    heroName.textContent = name + "!";
}

// ========================================
// INITIAL LOAD
// ========================================

viewProfileBtn.addEventListener("click", () => {
    window.location.href = "profile.html";
});

document.getElementById("oldPapersBtn").addEventListener("click", () => {
    window.location.href = "old-papers.html";
});

// Highlight active sidebar nav
document.getElementById("navDashboard")?.addEventListener("click", (e) => {
    e.preventDefault();
    subjectView.classList.add("hidden");
    subjectsContainer.style.display = "grid";
});

// Note: createSubjectCards and updateDashboard are called after Firebase loads data.

backBtn.addEventListener("click", () => {

    subjectView.classList.add("hidden");

    subjectsContainer.style.display = "grid";

});

// ========================================
// CREATE SUBJECT CARDS
// ========================================

function createSubjectCards() {

    subjectsContainer.innerHTML = "";

    totalSubjects.textContent = syllabus.subjects.length;

    syllabus.subjects.forEach(subject => {

        const card = document.createElement("div");

        card.className = "subject-card";

        card.innerHTML = `
        
            <h2>${subject.name}</h2>

            <div class="mini-progress">

                <div
                    class="mini-fill"
                    id="${subject.id}-bar">
                </div>

            </div>

            <p id="${subject.id}-text">

                0%

            </p>

            <button data-id="${subject.id}">

                Open Subject

            </button>

        `;

        card.querySelector("button").addEventListener("click", () => {

            window.location.href = `topics.html?subject=${subject.id}`;

        });

        subjectsContainer.appendChild(card);

    });

}

// ========================================
// OPEN SUBJECT
// ========================================

function openSubject(subjectId) {

    const subject = syllabus.subjects.find(s => s.id === subjectId);

    if (!subject) return;

    subjectsContainer.style.display = "none";

    subjectView.classList.remove("hidden");

    subjectTitle.innerHTML = `${subject.name}`;

    unitsContainer.innerHTML = `
        <div class="unit-tabs" id="unitTabs"></div>
        <div class="unit-topics-container" id="unitTopicsContainer"></div>
    `;

    const tabsContainer = document.getElementById("unitTabs");
    const topicsContainer = document.getElementById("unitTopicsContainer");

    function renderTopics(uIndex) {
        // Update active tab style
        Array.from(tabsContainer.children).forEach((tab, idx) => {
            if (idx === uIndex) tab.classList.add("active-tab");
            else tab.classList.remove("active-tab");
        });

        const unit = subject.units[uIndex];
        let topicsHTML = "";
        
        unit.topics.forEach((topic, topicIndex) => {
            const topicKey = `${subject.id}-${uIndex}-${topicIndex}`;
            const checked = progressData[topicKey] ? "checked" : "";
            const completedClass = progressData[topicKey] ? "completed" : "";
            topicsHTML += `
                <label class="topic-pill ${completedClass}">
                    <input type="checkbox" class="topic-checkbox" data-key="${topicKey}" ${checked} style="display: none;">
                    <span>${topic}</span>
                </label>
            `;
        });
        
        topicsContainer.innerHTML = `
            <div class="unit-topics-header">
                <h3>${unit.name}</h3>
            </div>
            <div class="topic-list" style="display: block; padding-top: 0;">
                ${topicsHTML}
            </div>
        `;
        
        // Re-attach checkbox events for newly rendered topics
        addCheckboxEvents();
    }

    subject.units.forEach((unit, unitIndex) => {
        const tab = document.createElement("button");
        tab.className = "unit-tab";
        tab.textContent = `Unit ${unitIndex + 1}`;
        tab.addEventListener("click", () => renderTopics(unitIndex));
        tabsContainer.appendChild(tab);
    });

    // Initial render of first unit
    if (subject.units.length > 0) {
        renderTopics(0);
    }
}

// ========================================
// UNIT OPEN/CLOSE
// ========================================

function addToggle() {

    document.querySelectorAll(".unit-header").forEach(header => {

        header.addEventListener("click", () => {

            const list = header.nextElementSibling;

            if (list.style.display === "block") {

                list.style.display = "none";

            } else {

                list.style.display = "block";

            }

        });

    });

}

// ========================================
// CHECKBOX EVENTS
// ========================================

function addCheckboxEvents() {
    document.querySelectorAll(".topic-checkbox").forEach(box => {
        box.addEventListener("change", function () {
            if (this.checked) {
                this.parentElement.classList.add("completed");
            } else {
                this.parentElement.classList.remove("completed");
            }
            progressData[this.dataset.key] = this.checked;
            saveData(progressData);
            updateDashboard();
        });
    });
}

// ========================================
// UPDATE DASHBOARD
// ========================================

function updateDashboard() {

    let total = 0;

    let completed = 0;

    syllabus.subjects.forEach(subject => {

        let subjectTotal = 0;

        let subjectCompleted = 0;

        subject.units.forEach((unit, unitIndex) => {

            unit.topics.forEach((topic, topicIndex) => {

                subjectTotal++;

                total++;

                const key = `${subject.id}-${unitIndex}-${topicIndex}`;

                if (progressData[key]) {

                    completed++;

                    subjectCompleted++;

                }

            });

        });

        const percent = subjectTotal === 0
            ? 0
            : Math.round(subjectCompleted * 100 / subjectTotal);

        const bar = document.getElementById(subject.id + "-bar");

        const text = document.getElementById(subject.id + "-text");

        if (bar) {

            bar.style.width = percent + "%";

        }

        if (text) {

            text.textContent = percent + "% Completed";

        }

    });

    const overall = total === 0
        ? 0
        : Math.round(completed * 100 / total);

    completedTopics.textContent = completed;
    remainingTopics.textContent = total - completed;
    overallPercentage.textContent = overall + "%";
    overallProgress.style.width = overall + "%";

    // Chart.js Advanced Pie Chart Update
    const ctx = document.getElementById('growthChart');
    if (ctx) {
        const labels = [];
        const dataValues = []; 
        const actualPercents = [];
        const backgroundColors = [];
        
        const themeColors = ['#1C3D35', '#F5C842', '#A8D5BF', '#2D5A4A', '#E8856A'];
        const redZoneColor = '#e05a4e';

        syllabus.subjects.forEach((subject, index) => {
            let sTotal = 0;
            let sComp = 0;
            subject.units.forEach(u => {
                u.topics.forEach((t, tIndex) => {
                    sTotal++;
                    if (progressData[`${subject.id}-${subject.units.indexOf(u)}-${tIndex}`]) sComp++;
                });
            });
            const pct = sTotal === 0 ? 0 : Math.round((sComp * 100) / sTotal);
            
            // Only add the subject to the chart if it has completed topics
            // to show actual growth. If 0, it doesn't take up space in the completed section.
            labels.push(subject.name);
            dataValues.push(sComp); 
            actualPercents.push(pct);
            
            // Red zone if < 35%
            backgroundColors.push(pct < 35 ? redZoneColor : themeColors[index % themeColors.length]);
        });
        
        // Add the "Uncompleted" slice
        const remainingTotal = total - completed;
        if (remainingTotal > 0) {
            labels.push("Remaining");
            dataValues.push(remainingTotal);
            actualPercents.push(0);
            backgroundColors.push('#E5E7EB'); // Light gray for uncompleted
        }

        if (growthChart) {
            growthChart.data.labels = labels;
            growthChart.data.datasets[0].data = dataValues;
            growthChart.data.datasets[0].backgroundColor = backgroundColors;
            growthChart.data.datasets[0].actualData = actualPercents;
            growthChart.update();
        } else {
            growthChart = new Chart(ctx, {
                type: 'doughnut',
                data: {
                    labels: labels,
                    datasets: [{
                        data: dataValues,
                        actualData: actualPercents,
                        backgroundColor: backgroundColors,
                        borderWidth: 2,
                        borderColor: '#FAF7F2',
                        hoverOffset: 4
                    }]
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    cutout: '75%',
                    plugins: {
                        legend: { display: false },
                        tooltip: {
                            callbacks: {
                                label: function(context) {
                                    const labelName = context.label;
                                    if (labelName === "Remaining") {
                                        return ` ${context.raw} Topics Remaining`;
                                    }
                                    const pct = context.dataset.actualData[context.dataIndex];
                                    let label = ` ${labelName}: ${pct}% Completed`;
                                    if (pct < 35) label += ' (Red Zone)';
                                    return label;
                                }
                            }
                        }
                    }
                }
            });
        }
    }
}