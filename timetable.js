// ============================================================
//  TIMETABLE.JS — RISE Class Timetable (AI Text Extraction)
// ============================================================

// 🔑 REPLACE THIS WITH YOUR GEMINI API KEY
const GEMINI_API_KEY = "YOUR_API_KEY_HERE";

const STORAGE_KEY = 'rise_timetables_json';
const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5 MB

// ---------- DOM Elements ----------
const uploadZone = document.getElementById('uploadZone');
const fileInput = document.getElementById('fileInput');
const browseBtn = document.getElementById('browseBtn');
const uploadSemester = document.getElementById('uploadSemester');
const uploadProgress = document.getElementById('uploadProgress');
const gridContainer = document.getElementById('gridContainer');
const emptyState = document.getElementById('emptyState');
const filterSemester = document.getElementById('filterSemester');
const filterClearBtn = document.getElementById('filterClearBtn');

const toast = document.getElementById('toast');
const toastText = document.getElementById('toastText');

// ---------- LocalStorage Helpers ----------

function getTimetables() {
    try {
        const raw = localStorage.getItem(STORAGE_KEY);
        return raw ? JSON.parse(raw) : [];
    } catch {
        return [];
    }
}

function saveTimetables(data) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
}

// ---------- Toast ----------

function showToast(message) {
    toastText.textContent = message;
    toast.classList.add('show');
    setTimeout(() => toast.classList.remove('show'), 3000);
}

// ---------- Render Text Grid ----------

function renderGrid() {
    const timetables = getTimetables();
    const filterVal = filterSemester.value;

    const filtered = filterVal
        ? timetables.filter(t => t.semester === filterVal)
        : timetables;

    gridContainer.innerHTML = '';

    if (filtered.length === 0) {
        emptyState.classList.remove('hidden');
        if (filterVal && timetables.length > 0) {
            document.querySelector('.tt-empty-title').textContent = 'No Timetable for Semester ' + filterVal;
            document.querySelector('.tt-empty-sub').textContent = 'Try selecting a different semester or upload a new image.';
        } else {
            document.querySelector('.tt-empty-title').textContent = 'No Timetables Yet';
            document.querySelector('.tt-empty-sub').textContent = 'Upload an image above to extract your schedule.';
        }
        return;
    }

    emptyState.classList.add('hidden');

    filtered.forEach(item => {
        // Create Semester Wrapper
        const semWrapper = document.createElement('div');
        semWrapper.style.marginBottom = '40px';

        const semHeader = document.createElement('div');
        semHeader.style.display = 'flex';
        semHeader.style.justifyContent = 'space-between';
        semHeader.style.alignItems = 'center';
        semHeader.style.marginBottom = '20px';
        
        semHeader.innerHTML = `
            <h3 style="font-family:'Playfair Display',serif; font-size: 24px; color: var(--teal); margin: 0;">
                Semester ${item.semester} Schedule
            </h3>
            <button class="tt-day-delete" data-sem="${item.semester}">🗑️ Delete Semester</button>
        `;
        
        semWrapper.appendChild(semHeader);

        const schedule = item.schedule || {};
        const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

        days.forEach(day => {
            if (schedule[day] && schedule[day].length > 0) {
                const dayGroup = document.createElement('div');
                dayGroup.className = 'tt-day-group';

                const dayTitle = document.createElement('div');
                dayTitle.className = 'tt-day-title';
                dayTitle.textContent = day;
                dayGroup.appendChild(dayTitle);

                const classList = document.createElement('div');
                classList.className = 'tt-class-list';

                schedule[day].forEach(cls => {
                    const classItem = document.createElement('div');
                    classItem.className = 'tt-class-item';
                    
                    classItem.innerHTML = `
                        <div class="tt-class-time">${cls.time || 'TBA'}</div>
                        <div class="tt-class-subject">${cls.subject || 'Unknown Subject'}</div>
                    `;
                    classList.appendChild(classItem);
                });

                dayGroup.appendChild(classList);
                semWrapper.appendChild(dayGroup);
            }
        });

        gridContainer.appendChild(semWrapper);
    });

    // Attach delete listeners
    document.querySelectorAll('.tt-day-delete').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const sem = e.target.getAttribute('data-sem');
            if (confirm(`Are you sure you want to delete Semester ${sem} timetable?`)) {
                let all = getTimetables();
                all = all.filter(t => t.semester !== sem);
                saveTimetables(all);
                renderGrid();
                showToast(`Semester ${sem} deleted`);
            }
        });
    });
}

// ---------- Filter ----------

filterSemester.addEventListener('change', renderGrid);
filterClearBtn.addEventListener('click', () => {
    filterSemester.value = '';
    renderGrid();
});

// ---------- Drag & Drop ----------

uploadZone.addEventListener('dragover', (e) => {
    e.preventDefault();
    uploadZone.classList.add('dragover');
});

uploadZone.addEventListener('dragleave', (e) => {
    e.preventDefault();
    uploadZone.classList.remove('dragover');
});

uploadZone.addEventListener('drop', (e) => {
    e.preventDefault();
    uploadZone.classList.remove('dragover');

    const file = e.dataTransfer.files[0];
    if (file) handleFile(file);
});

browseBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    fileInput.click();
});

uploadZone.addEventListener('click', (e) => {
    if (e.target === uploadZone || e.target.closest('.tt-upload-icon') || e.target.closest('.tt-upload-title') || e.target.closest('.tt-upload-sub')) {
        fileInput.click();
    }
});

fileInput.addEventListener('change', (e) => {
    const file = e.target.files[0];
    if (file) handleFile(file);
    fileInput.value = ''; 
});

uploadSemester.addEventListener('click', (e) => e.stopPropagation());

// ---------- File Handling & Gemini API ----------

async function handleFile(file) {
    const validTypes = ['image/jpeg', 'image/png', 'image/webp'];
    if (!validTypes.includes(file.type)) {
        showToast('⚠️ Only JPG, PNG, WEBP images allowed');
        return;
    }

    if (file.size > MAX_FILE_SIZE) {
        showToast('⚠️ File too large! Max 5 MB');
        return;
    }

    if (GEMINI_API_KEY === "YOUR_API_KEY_HERE" || !GEMINI_API_KEY) {
        showToast('⚠️ Please set GEMINI_API_KEY inside timetable.js first!');
        return;
    }

    const semester = uploadSemester.value;
    if (!semester) {
        showToast('⚠️ Please select a semester first');
        uploadSemester.style.borderColor = '#DC3545';
        setTimeout(() => uploadSemester.style.borderColor = '', 2000);
        return;
    }

    const timetables = getTimetables();
    const existing = timetables.find(t => t.semester === semester);
    if (existing) {
        if (!confirm(`You already have a timetable for Semester ${semester}. Replace it?`)) {
            return;
        }
    }

    // Show progress
    uploadProgress.classList.add('active');
    
    try {
        const base64Data = await readFileAsBase64(file);
        
        // Strip the data:image... prefix
        const base64Clean = base64Data.split(',')[1];
        
        const scheduleJSON = await callGeminiAPI(base64Clean, file.type, GEMINI_API_KEY);
        
        if (!scheduleJSON) {
            throw new Error("Failed to parse timetable");
        }

        // Save
        const idx = timetables.findIndex(t => t.semester === semester);
        if (idx !== -1) timetables.splice(idx, 1);
        
        timetables.push({
            semester: semester,
            schedule: scheduleJSON,
            uploadedAt: new Date().toISOString()
        });

        timetables.sort((a, b) => Number(a.semester) - Number(b.semester));
        saveTimetables(timetables);
        
        uploadSemester.value = '';
        renderGrid();
        showToast(`✅ Semester ${semester} timetable extracted and saved!`);
        
    } catch (err) {
        console.error(err);
        showToast('⚠️ AI Error: Could not extract timetable. Make sure the image is clear and API key is valid.');
    } finally {
        uploadProgress.classList.remove('active');
    }
}

function readFileAsBase64(file) {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = () => resolve(reader.result);
        reader.onerror = reject;
        reader.readAsDataURL(file);
    });
}

async function callGeminiAPI(base64Image, mimeType, apiKey) {
    const prompt = `
        You are an expert OCR and data extraction system.
        Extract the class schedule from this timetable image. 
        Focus ONLY on the days Monday to Sunday. Ignore irrelevant header text.
        
        Return the output STRICTLY as a raw JSON object where keys are the days of the week (e.g., 'Monday', 'Tuesday'), and values are arrays of objects with 'time' (string) and 'subject' (string). 
        
        Example:
        {
          "Monday": [
            {"time": "09:00 AM - 10:00 AM", "subject": "Mathematics"},
            {"time": "10:00 AM - 11:00 AM", "subject": "Physics"}
          ],
          "Tuesday": []
        }
        
        CRITICAL: Do NOT include any markdown formatting (like \`\`\`json). Return ONLY the raw JSON string starting with { and ending with }.
    `;

    const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`;
    
    const response = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            contents: [{
                parts: [
                    { text: prompt },
                    { inline_data: { mime_type: mimeType, data: base64Image } }
                ]
            }]
        })
    });

    const data = await response.json();
    
    if (data.error) {
        console.error("Gemini API Error:", data.error);
        throw new Error(data.error.message);
    }

    let textRes = data.candidates[0].content.parts[0].text.trim();
    
    // Clean up if the model accidentally included markdown
    if (textRes.startsWith('\`\`\`json')) {
        textRes = textRes.replace(/\`\`\`json/g, '').replace(/\`\`\`/g, '').trim();
    } else if (textRes.startsWith('\`\`\`')) {
        textRes = textRes.replace(/\`\`\`/g, '').trim();
    }

    return JSON.parse(textRes);
}

// ---------- Init ----------
renderGrid();
