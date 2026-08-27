import { getSyllabus, syllabus as defaultSyllabus } from "./syllabus.js";
import { auth, db, provider } from "./firebase-config.js";
import { onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";
import { doc, getDoc, setDoc } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

// ---------- State ----------
let currentUser = null;
let progressData = {};
let studentProfile = null;
let syllabus = defaultSyllabus;
let activeSubjectIndex = 0;
let activeUnitIndex = 0;

// ---------- Firestore helpers ----------
async function getSavedData() {
    if (!currentUser) return {};
    const docRef = doc(db, "users", currentUser.uid);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) return docSnap.data().progress || {};
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
    if (docSnap.exists() && docSnap.data().profile) return docSnap.data().profile;
    return null;
}

// ---------- DOM ----------
const loadingScreen = document.getElementById("loadingScreen");
const topicsApp = document.getElementById("topicsApp");
const subjectNav = document.getElementById("subjectNav");
const subjectTitle = document.getElementById("subjectTitle");
const subjectMeta = document.getElementById("subjectMeta");
const subjectProgressFill = document.getElementById("subjectProgressFill");
const subjectProgressText = document.getElementById("subjectProgressText");
const unitTabs = document.getElementById("unitTabs");
const topicsGrid = document.getElementById("topicsGrid");
const sidebarRingFill = document.getElementById("sidebarRingFill");
const sidebarPct = document.getElementById("sidebarPct");

// ---------- Auth ----------
onAuthStateChanged(auth, async (user) => {
    if (user) {
        currentUser = user;
        try {
            studentProfile = await getStudentProfile();
        } catch (e) {
            console.error("Error loading profile:", e);
        }

        if (!studentProfile) {
            // No profile: go back to dashboard to set up
            window.location.href = "index.html";
            return;
        }

        syllabus = getSyllabus(studentProfile) || defaultSyllabus;

        try {
            progressData = await getSavedData();
        } catch (e) {
            console.error("Error loading progress:", e);
            progressData = {};
        }

        // Check URL param for subject
        const urlParams = new URLSearchParams(window.location.search);
        const subjectId = urlParams.get("subject");
        if (subjectId) {
            const idx = syllabus.subjects.findIndex(s => s.id === subjectId);
            if (idx >= 0) activeSubjectIndex = idx;
        }

        buildSidebar();
        selectSubject(activeSubjectIndex);
        updateOverallProgress();

        loadingScreen.classList.add("hidden");
        topicsApp.classList.remove("hidden");
    } else {
        window.location.href = "index.html";
    }
});

// ---------- Build sidebar subject list ----------
function buildSidebar() {
    subjectNav.innerHTML = "";
    syllabus.subjects.forEach((subject, index) => {
        const btn = document.createElement("button");
        btn.className = "tp-subject-btn";
        btn.dataset.index = index;

        // Compute subject progress
        const { completed, total } = getSubjectProgress(subject);
        const pct = total === 0 ? 0 : Math.round((completed / total) * 100);
        const isRedZone = pct < 35;

        btn.innerHTML = `
            <span class="tp-subject-icon">${subject.icon || "📘"}</span>
            <span class="tp-subject-name">${subject.name}</span>
            <span class="tp-subject-pct ${isRedZone ? "tp-red-zone" : ""}">${pct}%</span>
        `;

        btn.addEventListener("click", () => {
            activeSubjectIndex = index;
            activeUnitIndex = 0;
            selectSubject(index);
        });

        subjectNav.appendChild(btn);
    });
}

// ---------- Select a subject ----------
function selectSubject(index) {
    const subject = syllabus.subjects[index];
    if (!subject) return;

    // Highlight active sidebar button
    Array.from(subjectNav.children).forEach((btn, i) => {
        btn.classList.toggle("active", i === index);
    });

    // Update header
    const { completed, total } = getSubjectProgress(subject);
    const pct = total === 0 ? 0 : Math.round((completed / total) * 100);

    subjectTitle.textContent = subject.name;
    subjectMeta.textContent = `${subject.units.length} Units · ${total} Topics · ${completed} Completed`;
    subjectProgressFill.style.width = pct + "%";
    subjectProgressText.textContent = pct + "% Complete";

    // Build unit tabs
    buildUnitTabs(subject);
    selectUnit(activeUnitIndex);
}

// ---------- Build unit tabs ----------
function buildUnitTabs(subject) {
    unitTabs.innerHTML = "";
    subject.units.forEach((unit, uIndex) => {
        const tab = document.createElement("button");
        tab.className = "tp-unit-tab";
        tab.textContent = `Unit ${uIndex + 1}`;
        tab.addEventListener("click", () => {
            activeUnitIndex = uIndex;
            selectUnit(uIndex);
        });
        unitTabs.appendChild(tab);
    });
}

// ---------- Select a unit ----------
function selectUnit(uIndex) {
    const subject = syllabus.subjects[activeSubjectIndex];
    if (!subject || !subject.units[uIndex]) return;

    // Highlight active tab
    Array.from(unitTabs.children).forEach((tab, i) => {
        tab.classList.toggle("active", i === uIndex);
    });

    const unit = subject.units[uIndex];
    renderTopics(subject, unit, uIndex);
}

// ---------- Render topics as pills ----------
function renderTopics(subject, unit, uIndex) {
    topicsGrid.innerHTML = "";

    unit.topics.forEach((topic, topicIndex) => {
        const topicKey = `${subject.id}-${uIndex}-${topicIndex}`;
        const isDone = !!progressData[topicKey];

        const pill = document.createElement("div");
        pill.className = `tp-pill ${isDone ? "done" : ""}`;
        pill.innerHTML = `
            <span class="tp-pill-check">${isDone ? "✓" : ""}</span>
            <span>${topic}</span>
        `;

        pill.addEventListener("click", () => {
            const newState = !progressData[topicKey];
            progressData[topicKey] = newState;
            saveData(progressData);

            // Toggle visual
            pill.classList.toggle("done", newState);
            pill.querySelector(".tp-pill-check").textContent = newState ? "✓" : "";

            // Update all progress indicators
            refreshProgressUI();
        });

        topicsGrid.appendChild(pill);
    });
}

// ---------- Refresh all progress numbers ----------
function refreshProgressUI() {
    const subject = syllabus.subjects[activeSubjectIndex];
    if (!subject) return;

    // Subject progress
    const { completed, total } = getSubjectProgress(subject);
    const pct = total === 0 ? 0 : Math.round((completed / total) * 100);
    subjectProgressFill.style.width = pct + "%";
    subjectProgressText.textContent = pct + "% Complete";
    subjectMeta.textContent = `${subject.units.length} Units · ${total} Topics · ${completed} Completed`;

    // Update sidebar badges
    syllabus.subjects.forEach((s, i) => {
        const btn = subjectNav.children[i];
        if (!btn) return;
        const sp = getSubjectProgress(s);
        const sPct = sp.total === 0 ? 0 : Math.round((sp.completed / sp.total) * 100);
        const badge = btn.querySelector(".tp-subject-pct");
        if (badge) {
            badge.textContent = sPct + "%";
            badge.classList.toggle("tp-red-zone", sPct < 35);
        }
    });

    updateOverallProgress();
}

// ---------- Overall progress ----------
function updateOverallProgress() {
    let total = 0, completed = 0;
    syllabus.subjects.forEach(subject => {
        subject.units.forEach((unit, uIndex) => {
            unit.topics.forEach((_, tIndex) => {
                total++;
                if (progressData[`${subject.id}-${uIndex}-${tIndex}`]) completed++;
            });
        });
    });

    const overall = total === 0 ? 0 : Math.round((completed / total) * 100);
    sidebarPct.textContent = overall + "%";

    // SVG ring: circumference = 2π × 34 ≈ 213.63
    const circumference = 213.63;
    const offset = circumference - (overall / 100) * circumference;
    sidebarRingFill.style.strokeDashoffset = offset;
}

// ---------- Helper: get subject progress ----------
function getSubjectProgress(subject) {
    let total = 0, completed = 0;
    subject.units.forEach((unit, uIndex) => {
        unit.topics.forEach((_, tIndex) => {
            total++;
            if (progressData[`${subject.id}-${uIndex}-${tIndex}`]) completed++;
        });
    });
    return { completed, total };
}
