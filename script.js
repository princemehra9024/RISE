// ========================================
// STUDENT DASHBOARD
// script.js
// ========================================

import { syllabus } from "./syllabus.js";
import { auth, db, provider } from "./firebase-config.js";
import { signInWithPopup, signOut as firebaseSignOut, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";
import { doc, getDoc, setDoc } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

// ---------- Auth & User State ----------

let currentUser = null;
let progressData = {};

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

// Auth Elements
const loginScreen = document.getElementById("loginScreen");
const dashboard = document.getElementById("dashboard");
const profileName = document.getElementById("profileName");
const profileImage = document.getElementById("profileImage");
const signOutBtn = document.getElementById("signOutBtn");
const firebaseLoginBtn = document.getElementById("firebaseLoginBtn");

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
        
        // Update Profile UI
        profileName.textContent = currentUser.displayName || currentUser.email;
        profileImage.src = currentUser.photoURL || "";

        // Hide Login, Show Dashboard
        loginScreen.classList.add("hidden");
        dashboard.classList.remove("hidden");

        // Load User Data from Firestore
        progressData = await getSavedData();
        createSubjectCards();
        updateDashboard();
    } else {
        // Clear user state
        currentUser = null;
        progressData = {};
        
        // Hide Dashboard, Show Login
        dashboard.classList.add("hidden");
        loginScreen.classList.remove("hidden");
    }
});

// ========================================
// INITIAL LOAD
// ========================================

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
        
            <h2>${subject.icon} ${subject.name}</h2>

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

    subjectTitle.innerHTML = `${subject.icon} ${subject.name}`;

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

                <span>▼</span>

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

}