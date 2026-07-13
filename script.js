// ========================================
// STUDENT DASHBOARD
// script.js
// ========================================

// ---------- Local Storage ----------

function getSavedData() {
    return JSON.parse(localStorage.getItem("studyProgress")) || {};
}

function saveData(data) {
    localStorage.setItem("studyProgress", JSON.stringify(data));
}

let progressData = getSavedData();

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

// ========================================
// INITIAL LOAD
// ========================================

createSubjectCards();

updateDashboard();

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