import { syllabus } from "./syllabus.js";
import { auth, db, provider } from "./firebase-config.js";
import { signInWithPopup, signOut as firebaseSignOut, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";
import { doc, getDoc, setDoc, collection, getDocs } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

// ---------- Auth & User State ----------

let currentUser = null;
let progressData = {};
let studentProfile = null;

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
    try {
        await signInWithPopup(auth, provider);
    } catch (error) {
        console.error("Login Failed:", error);
        alert("Login failed! Did you add your Firebase keys in firebase-config.js?");
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
        studentProfile = await getStudentProfile();

        if (!studentProfile) {
            // First time user: show profile setup
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

            // Load Progress Data from Firestore
            progressData = await getSavedData();
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
    saveBtn.textContent = "Saving...";
    saveBtn.disabled = true;

    const profile = {
        studentName: inputStudentName.value.trim(),
        rollNumber: inputRollNumber.value.trim(),
        branch: inputBranch.value,
        semester: inputSemester.value,
        college: inputCollege.value.trim(),
        goal: inputGoal.value.trim() || "Study hard & excel!",
    };

    await saveStudentProfile(profile);
    studentProfile = profile;

    updateHeaderBadge(profile);

    // Remove edit param if it was there
    window.history.replaceState({}, document.title, window.location.pathname);

    // Show dashboard
    profileSetupScreen.classList.add("hidden");
    dashboard.classList.remove("hidden");

    // Load Progress
    progressData = await getSavedData();
    createSubjectCards();
    updateDashboard();

    saveBtn.textContent = "Create My Profile";
    saveBtn.disabled = false;
});

// ========================================
// HEADER BADGE
// ========================================

function updateHeaderBadge(profile) {
    if (profileSemBadge && profile) {
        profileSemBadge.textContent = `${profile.branch} · Sem ${profile.semester}`;
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

            openSubject(subject.id);

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

    unitsContainer.innerHTML = "";

    subject.units.forEach((unit, unitIndex) => {

        const unitCard = document.createElement("div");

        unitCard.className = "unit-card";

        let topicsHTML = "";

        unit.topics.forEach((topic, topicIndex) => {

            const topicKey = `${subject.id}-${unitIndex}-${topicIndex}`;

            const checked = progressData[topicKey] ? "checked" : "";

            topicsHTML += `

                <div class="topic">

                    <input
                        type="checkbox"
                        class="topic-checkbox"
                        data-key="${topicKey}"
                        ${checked}
                    >

                    <span>${topic}</span>

                </div>

            `;

        });

        unitCard.innerHTML = `

            <div class="unit-header">

                <h3>${unit.name}</h3>

                <span>&#9660;</span>

            </div>

            <div class="topic-list">

                ${topicsHTML}

            </div>

        `;

        unitsContainer.appendChild(unitCard);

    });

    addToggle();

    addCheckboxEvents();

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

    // Drive circular SVG ring (circumference = 2π × 52 ≈ 326.73)
    if (circleProgress) {
        const circumference = 326.73;
        const offset = circumference - (overall / 100) * circumference;
        circleProgress.style.strokeDashoffset = offset;
    }

}