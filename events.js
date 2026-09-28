// events.js

import { db, auth } from './firebase-config.js';
import { collection, addDoc, onSnapshot, query, orderBy, doc, setDoc, increment } from 'https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js';
import { onAuthStateChanged } from 'https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js';

document.addEventListener('DOMContentLoaded', () => {
    // MODALS
    const orgModal = document.getElementById('eventModalOverlay');
    const joinModal = document.getElementById('joinQuizModalOverlay');
    const playModal = document.getElementById('playQuizModalOverlay');

    // BUTTONS & FORMS
    const btnOpenOrgModal = document.getElementById('btnOpenAddModal');
    const eventsContainer = document.getElementById('dynamicEventsContainer');
    const formAddEvent = document.getElementById('formAddEvent');
    const formJoinQuiz = document.getElementById('formJoinQuiz');
    
    // QUIZ STATE
    let currentQuiz = null;
    let currentQuestionIndex = 0;
    let score = 0;
    let allQuizzes = [];
    let currentUser = null;

    onAuthStateChanged(auth, (user) => {
        currentUser = user;
    });

    // --- 1. MODAL HELPERS ---
    const closeAllModals = () => {
        orgModal.classList.remove('active');
        joinModal.classList.remove('active');
        playModal.classList.remove('active');
        document.body.style.overflow = '';
    };

    document.querySelectorAll('.modal-close').forEach(btn => {
        btn.addEventListener('click', closeAllModals);
    });

    // --- 2. ORGANIZE QUIZ (CREATE) ---
    const btnAddQuestionBtn = document.getElementById('btnAddQuestionBtn');
    const questionsContainer = document.getElementById('questionsContainer');
    let questionCount = 0;

    const addQuestionBlock = () => {
        questionCount++;
        const qHtml = `
            <div class="q-block" style="background: rgba(28,61,53,0.05); padding: 15px; border-radius: 8px; margin-bottom: 15px; border: 1px solid rgba(28,61,53,0.1);">
                <input type="text" class="q-text" placeholder="Question ${questionCount}" required style="margin-bottom: 10px; font-weight: bold;">
                <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 10px; margin-bottom: 10px;">
                    <input type="text" class="q-optA" placeholder="Option A" required>
                    <input type="text" class="q-optB" placeholder="Option B" required>
                    <input type="text" class="q-optC" placeholder="Option C" required>
                    <input type="text" class="q-optD" placeholder="Option D" required>
                </div>
                <select class="q-correct" required>
                    <option value="" disabled selected>Select Correct Answer...</option>
                    <option value="A">Option A</option>
                    <option value="B">Option B</option>
                    <option value="C">Option C</option>
                    <option value="D">Option D</option>
                </select>
            </div>
        `;
        questionsContainer.insertAdjacentHTML('beforeend', qHtml);
    };

    btnAddQuestionBtn.addEventListener('click', addQuestionBlock);

    const csvUpload = document.getElementById('csvUpload');
    if (csvUpload) {
        csvUpload.addEventListener('change', (e) => {
            const file = e.target.files[0];
            if (!file) return;
            
            const reader = new FileReader();
            reader.onload = (event) => {
                const text = event.target.result;
                const lines = text.split(/\r?\n/);
                let addedCount = 0;
                
                const parseCSVLine = (str) => {
                    let ret = [], keep = false, curr = '';
                    for (let i = 0; i < str.length; i++) {
                        let c = str[i];
                        if (c === '"') {
                            keep = !keep;
                        } else if (c === ',' && !keep) {
                            ret.push(curr.trim());
                            curr = '';
                        } else {
                            curr += c;
                        }
                    }
                    ret.push(curr.trim());
                    return ret.map(c => c.replace(/^"|"$/g, '').trim());
                };
                
                lines.forEach((line, index) => {
                    if (!line.trim()) return;
                    
                    let cols = parseCSVLine(line);
                    
                    if (cols.length >= 6) {
                        // Forgiving parsing: if > 6 columns, assume all extra commas were in the question
                        let questionText = cols.slice(0, cols.length - 5).join(', ');
                        let optA = cols[cols.length - 5];
                        let optB = cols[cols.length - 4];
                        let optC = cols[cols.length - 3];
                        let optD = cols[cols.length - 2];
                        let correctRaw = cols[cols.length - 1];
                        
                        // Skip header
                        if (index === 0 && (questionText.toLowerCase().includes('question') || correctRaw.toLowerCase().includes('correct'))) return;
                        
                        let blocks = document.querySelectorAll('.q-block');
                        let newBlock = blocks[blocks.length - 1];
                        
                        // Check if the last block is empty, if not, add a new one
                        if (newBlock) {
                            let isEmpty = !newBlock.querySelector('.q-text').value && 
                                          !newBlock.querySelector('.q-optA').value && 
                                          !newBlock.querySelector('.q-optB').value && 
                                          !newBlock.querySelector('.q-optC').value && 
                                          !newBlock.querySelector('.q-optD').value;
                            if (!isEmpty) {
                                addQuestionBlock();
                                blocks = document.querySelectorAll('.q-block');
                                newBlock = blocks[blocks.length - 1];
                            }
                        } else {
                            addQuestionBlock();
                            blocks = document.querySelectorAll('.q-block');
                            newBlock = blocks[blocks.length - 1];
                        }
                        
                        newBlock.querySelector('.q-text').value = questionText;
                        newBlock.querySelector('.q-optA').value = optA;
                        newBlock.querySelector('.q-optB').value = optB;
                        newBlock.querySelector('.q-optC').value = optC;
                        newBlock.querySelector('.q-optD').value = optD;
                        
                        const correctOpt = correctRaw.toUpperCase().replace(/[^ABCD]/g, '').substring(0, 1);
                        if (['A', 'B', 'C', 'D'].includes(correctOpt)) {
                            newBlock.querySelector('.q-correct').value = correctOpt;
                        }
                        addedCount++;
                    }
                });
                
                if (addedCount > 0) {
                    alert(`Successfully imported ${addedCount} questions from CSV!`);
                } else {
                    alert('Could not parse CSV. Ensure it has at least 6 columns (Question, Option A, Option B, Option C, Option D, Correct Option).');
                }
            };
            reader.readAsText(file);
            e.target.value = ''; // Reset input
        });
    }

    formAddEvent.addEventListener('submit', async (e) => {
        e.preventDefault();
        const eventName = document.getElementById('inputEventName').value.trim();
        const eventDesc = document.getElementById('inputEventDesc').value.trim();
        const orgName = document.getElementById('inputOrgName').value.trim();

        const qBlocks = document.querySelectorAll('.q-block');
        if (qBlocks.length === 0) {
            alert('Please add at least one question!');
            return;
        }

        const questions = [];
        qBlocks.forEach(block => {
            questions.push({
                q: block.querySelector('.q-text').value,
                a: block.querySelector('.q-optA').value,
                b: block.querySelector('.q-optB').value,
                c: block.querySelector('.q-optC').value,
                d: block.querySelector('.q-optD').value,
                correct: block.querySelector('.q-correct').value
            });
        });

        const newQuiz = {
            name: eventName,
            desc: eventDesc,
            questions: questions,
            organizer: orgName,
            createdAt: new Date().getTime()
        };

        try {
            await addDoc(collection(db, 'quizzes'), newQuiz);
            closeAllModals();
            formAddEvent.reset();
            questionsContainer.innerHTML = '';
            questionCount = 0;
        } catch (error) {
            console.error("Error adding document: ", error);
            alert("Failed to publish quiz.");
        }
    });

    // --- 3. RENDER GRID ---
    const renderQuizzes = (events) => {
        eventsContainer.innerHTML = '';

        // Add Card
        const addCardHTML = `
            <div class="event-card add-card" id="btnOpenAddModalDynamic">
                <div class="add-icon-wrap">
                    <span class="add-icon">+</span>
                </div>
                <div class="add-title">Organize New Quiz</div>
                <div class="add-desc">Click here to create a quiz and challenge your peers.</div>
            </div>
        `;
        eventsContainer.insertAdjacentHTML('beforeend', addCardHTML);
        
        document.getElementById('btnOpenAddModalDynamic').addEventListener('click', () => {
            orgModal.classList.add('active');
            document.body.style.overflow = 'hidden';
            if (questionCount === 0) addQuestionBlock(); // Add first empty question
        });

        // Custom Quizzes
        events.forEach(evt => {
            let orgInitials = evt.organizer ? evt.organizer.charAt(0).toUpperCase() : 'S';
            let orgName = evt.organizer || 'Student';
            
            const cardHTML = `
                <div class="event-card">
                    <div class="ec-header">
                        <span class="ec-badge">Community Quiz</span>
                        <span class="ec-date">${evt.questions.length} Qs</span>
                    </div>
                    <h3 class="ec-title">${evt.name}</h3>
                    <p class="ec-desc">${evt.desc}</p>
                    <div class="ec-footer">
                        <div class="ec-org">
                            <div class="ec-org-av">${orgInitials}</div>
                            <span class="ec-org-name">${orgName}</span>
                        </div>
                        <button class="ec-action-btn join-btn" data-id="${evt.id}">Join / View</button>
                    </div>
                </div>
            `;
            eventsContainer.insertAdjacentHTML('beforeend', cardHTML);
        });

        // Join Buttons
        document.querySelectorAll('.join-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const quizId = e.target.getAttribute('data-id');
                currentQuiz = allQuizzes.find(q => q.id === quizId);
                
                if (currentQuiz) {
                    document.getElementById('joinQuizTitle').innerText = currentQuiz.name;
                    joinModal.classList.add('active');
                    document.body.style.overflow = 'hidden';
                }
            });
        });
    };

    // Initialize with Firebase realtime listener
    const q = query(collection(db, "quizzes"), orderBy("createdAt", "desc"));
    onSnapshot(q, (snapshot) => {
        allQuizzes = [];
        snapshot.forEach((doc) => {
            allQuizzes.push({ id: doc.id, ...doc.data() });
        });
        renderQuizzes(allQuizzes);
    });

    // --- 4. JOIN & PLAY QUIZ ---
    formJoinQuiz.addEventListener('submit', (e) => {
        e.preventDefault();
        const joinName = document.getElementById('joinName').value;
        
        closeAllModals();
        
        // Setup Play Modal
        document.getElementById('playQuizTitle').innerText = currentQuiz.name;
        document.getElementById('playQuizParticipant').innerText = `Playing as: ${joinName}`;
        currentQuestionIndex = 0;
        score = 0;
        
        document.getElementById('btnClosePlayModal').style.display = 'none';

        document.getElementById('playQuizContent').classList.remove('hidden');
        document.getElementById('btnNextQuestion').classList.add('hidden'); // hidden initially
        document.getElementById('playQuizResult').classList.add('hidden');
        
        renderQuestion();
        playModal.classList.add('active');
        document.body.style.overflow = 'hidden';
    });

    const renderQuestion = () => {
        if (!currentQuiz) return;
        
        document.getElementById('playQuizProgress').innerText = `${currentQuestionIndex + 1} / ${currentQuiz.questions.length}`;
        const q = currentQuiz.questions[currentQuestionIndex];
        
        const content = document.getElementById('playQuizContent');
        content.innerHTML = `
            <h3 style="font-size: 1.4rem; color: #1C3D35; margin-bottom: 24px; line-height: 1.4;">${currentQuestionIndex + 1}. ${q.q}</h3>
            <div style="display: flex; flex-direction: column; gap: 12px;" id="optionsGroup">
                <label class="quiz-option" data-val="A">
                    <div class="opt-letter">A</div>
                    <div class="opt-text">${q.a}</div>
                </label>
                <label class="quiz-option" data-val="B">
                    <div class="opt-letter">B</div>
                    <div class="opt-text">${q.b}</div>
                </label>
                <label class="quiz-option" data-val="C">
                    <div class="opt-letter">C</div>
                    <div class="opt-text">${q.c}</div>
                </label>
                <label class="quiz-option" data-val="D">
                    <div class="opt-letter">D</div>
                    <div class="opt-text">${q.d}</div>
                </label>
            </div>
        `;
        
        const btnNext = document.getElementById('btnNextQuestion');
        btnNext.innerText = (currentQuestionIndex === currentQuiz.questions.length - 1) ? 'Finish Quiz' : 'Next Question';
        btnNext.classList.add('hidden');
        
        let answered = false;
        const options = content.querySelectorAll('.quiz-option');
        options.forEach(opt => {
            opt.addEventListener('click', function() {
                if (answered) return;
                answered = true;
                
                const selectedVal = this.getAttribute('data-val');
                const correctVal = q.correct;
                
                if (selectedVal === correctVal) {
                    this.classList.add('correct');
                    score++;
                } else {
                    this.classList.add('wrong');
                    const correctEl = content.querySelector(`.quiz-option[data-val="${correctVal}"]`);
                    if (correctEl) correctEl.classList.add('correct');
                }
                
                options.forEach(o => {
                    o.style.cursor = 'not-allowed';
                    o.style.pointerEvents = 'none';
                });
                
                // Auto-advance after 1.5 seconds
                setTimeout(() => {
                    currentQuestionIndex++;
                    
                    if (currentQuestionIndex < currentQuiz.questions.length) {
                        renderQuestion();
                    } else {
                        // FINISH
                        document.getElementById('playQuizContent').classList.add('hidden');
                        document.getElementById('btnNextQuestion').classList.add('hidden');
                        document.getElementById('playQuizResult').classList.remove('hidden');
                        document.getElementById('resultScore').innerText = `${score} / ${currentQuiz.questions.length}`;

                        // Award points
                        if (currentUser) {
                            const userRef = doc(db, 'users', currentUser.uid);
                            setDoc(userRef, {
                                quizPoints: increment(score * 10), // 10 points per correct answer
                                quizzesPlayed: increment(1)
                            }, { merge: true }).catch(err => console.error("Error updating points: ", err));
                        }
                        
                        // Prevent replay
                        const joinBtn = document.querySelector(`.join-btn[data-id="${currentQuiz.id}"]`);
                        if (joinBtn) {
                            joinBtn.innerText = 'Completed';
                            joinBtn.style.opacity = '0.5';
                            joinBtn.style.cursor = 'not-allowed';
                            joinBtn.style.pointerEvents = 'none';
                        }
                    }
                }, 1500);
            });
        });
    };

    document.getElementById('btnFinishQuiz').addEventListener('click', () => {
        closeAllModals();
        formJoinQuiz.reset();
    });

});
