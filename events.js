// events.js

import { db, auth } from './firebase-config.js';
import { collection, addDoc, onSnapshot, query, orderBy, doc, setDoc, getDoc, getDocs, increment } from 'https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js';
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
    let joinName = '';

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

    // --- SEMESTER TOGGLE SETUP ---
    const semesterToggle = document.getElementById('semesterToggle');
    const semesterSelect = document.getElementById('inputQuizSemester');
    
    if (semesterToggle) {
        semesterToggle.querySelectorAll('.sem-toggle-btn').forEach(btn => {
            btn.addEventListener('click', () => {
                semesterToggle.querySelectorAll('.sem-toggle-btn').forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
                
                if (btn.getAttribute('data-mode') === 'specific') {
                    semesterSelect.style.display = 'block';
                    semesterSelect.value = '1';
                } else {
                    semesterSelect.style.display = 'none';
                    semesterSelect.value = 'all';
                }
            });
        });
    }

    formAddEvent.addEventListener('submit', async (e) => {
        e.preventDefault();
        const eventName = document.getElementById('inputEventName').value.trim();
        const eventDesc = document.getElementById('inputEventDesc').value.trim();
        const orgName = document.getElementById('inputOrgName').value.trim();
        const quizSemester = document.getElementById('inputQuizSemester').value;

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
            semester: quizSemester,
            createdAt: new Date().getTime()
        };

        try {
            await addDoc(collection(db, 'quizzes'), newQuiz);
            
            // --- AUTOMATIC HOME PAGE POST ---
            let badgeImageBase64 = null;
            const badgePreviewImg = document.querySelector('.badge-preview-img');
            if (badgePreviewImg) {
                badgeImageBase64 = badgePreviewImg.src;
            }

            const newPost = {
                id: Date.now().toString(),
                author: orgName,
                time: "Just now",
                content: `🚀 I just published a new quiz: **${eventName}**!<br><br>${eventDesc}<br><br><a href="events.html" style="color:var(--primary-color); font-weight:600; text-decoration:none;">Join the quiz now ✦</a>`,
                likes: 0,
                comments: 0,
                isLiked: false,
                isFollowing: false,
                initials: orgName.charAt(0).toUpperCase(),
                color: "#E8856A",
                category: "Latest",
                image: badgeImageBase64 // Use badge image as the post image
            };
            
            let customPosts = JSON.parse(localStorage.getItem('customFeedPosts') || '[]');
            customPosts.unshift(newPost);
            localStorage.setItem('customFeedPosts', JSON.stringify(customPosts));
            // ---------------------------------

            closeAllModals();
            formAddEvent.reset();
            questionsContainer.innerHTML = '';
            questionCount = 0;
            
            // Reset badge upload UI if it exists
            const badgeUploadBox = document.getElementById('badgeUploadBox');
            const badgeUploadContent = document.getElementById('badgeUploadContent');
            if (badgeUploadBox && badgeUploadContent) {
                badgeUploadContent.innerHTML = `
                    <span class="upload-icon">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect><circle cx="8.5" cy="8.5" r="1.5"></circle><polyline points="21 15 16 10 5 21"></polyline></svg>
                    </span>
                    <span class="upload-text">Upload Custom Badge</span>
                    <span class="upload-subtext">Click to browse (JPG, PNG)</span>
                `;
                badgeUploadBox.classList.remove('has-image');
            }

            // Reset semester toggle
            if (semesterToggle) {
                semesterToggle.querySelectorAll('.sem-toggle-btn').forEach(b => b.classList.remove('active'));
                semesterToggle.querySelector('[data-mode="all"]').classList.add('active');
                semesterSelect.style.display = 'none';
                semesterSelect.value = 'all';
            }
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
            
            // Count participants
            const participantCount = evt.participantCount || 0;
            
            // Semester badge
            const semVal = evt.semester || 'all';
            const semBadge = semVal !== 'all' 
                ? `<span class="ec-sem-badge">Sem ${semVal}</span>` 
                : `<span class="ec-sem-badge ec-sem-all">All Sem</span>`;
            
            const cardHTML = `
                <div class="event-card">
                    <div class="ec-header">
                        <span class="ec-badge">Community Quiz</span>
                        <div style="display: flex; align-items: center; gap: 8px;">
                            ${semBadge}
                            <span class="ec-date">${evt.questions.length} Qs</span>
                        </div>
                    </div>
                    <h3 class="ec-title">${evt.name}</h3>
                    <p class="ec-desc">${evt.desc}</p>
                    <div class="ec-footer">
                        <div class="ec-org">
                            <div class="ec-org-av">${orgInitials}</div>
                            <span class="ec-org-name">${orgName}</span>
                        </div>
                        <div style="display: flex; align-items: center; gap: 10px;">
                            ${participantCount > 0 ? `<span class="participant-count-badge">${participantCount} played</span>` : ''}
                            <button class="ec-action-btn join-btn" data-id="${evt.id}">Join / View</button>
                        </div>
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
        joinName = document.getElementById('joinName').value.trim();
        
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
                        // FINISH - Save result and show scoreboard
                        finishQuiz();
                    }
                }, 1500);
            });
        });
    };

    // --- 5. FINISH QUIZ & SHOW SCOREBOARD ---
    async function finishQuiz() {
        // Hide quiz content
        document.getElementById('playQuizContent').classList.add('hidden');
        document.getElementById('btnNextQuestion').classList.add('hidden');
        document.getElementById('playQuizResult').classList.remove('hidden');
        
        const totalQuestions = currentQuiz.questions.length;
        const pointsEarned = score * 10;
        
        // Save participant result to Firestore subcollection
        try {
            const participantData = {
                name: joinName,
                score: score,
                totalQuestions: totalQuestions,
                points: pointsEarned,
                completedAt: new Date().getTime(),
                userId: currentUser ? currentUser.uid : null
            };
            
            await addDoc(collection(db, 'quizzes', currentQuiz.id, 'participants'), participantData);
            
            // Update participant count on quiz doc
            const quizRef = doc(db, 'quizzes', currentQuiz.id);
            await setDoc(quizRef, {
                participantCount: increment(1)
            }, { merge: true });
            
            // Award points to user profile
            if (currentUser) {
                const userRef = doc(db, 'users', currentUser.uid);
                await setDoc(userRef, {
                    quizPoints: increment(pointsEarned),
                    quizzesPlayed: increment(1)
                }, { merge: true });
            }
        } catch (err) {
            console.error("Error saving quiz result: ", err);
        }
        
        // Fetch all participants for this quiz and show animated scoreboard
        try {
            const participantsSnap = await getDocs(collection(db, 'quizzes', currentQuiz.id, 'participants'));
            let participants = [];
            participantsSnap.forEach(docSnap => {
                participants.push(docSnap.data());
            });
            
            // Sort by score descending (highest first), then by completedAt ascending (earlier = better)
            participants.sort((a, b) => {
                if (b.score !== a.score) return b.score - a.score;
                return (a.completedAt || 0) - (b.completedAt || 0);
            });
            
            renderScoreboard(participants, totalQuestions);
        } catch (err) {
            console.error("Error fetching participants: ", err);
            // Fallback: show just the user's score
            renderScoreboard([{
                name: joinName,
                score: score,
                totalQuestions: totalQuestions,
                points: score * 10
            }], totalQuestions);
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

    // --- 6. ANIMATED SCOREBOARD RENDERER ---
    function renderScoreboard(participants, totalQuestions) {
        const resultDiv = document.getElementById('playQuizResult');
        
        // Find if user is in list
        const userIndex = participants.findIndex(p => p.name === joinName);
        const userRank = userIndex >= 0 ? userIndex + 1 : participants.length;
        const userScore = score;
        const percentage = Math.round((userScore / totalQuestions) * 100);
        
        // Determine emoji/message based on percentage
        let resultEmoji, resultMsg, resultColor;
        if (percentage >= 90) {
            resultEmoji = '🏆'; resultMsg = 'Outstanding!'; resultColor = '#FFD700';
        } else if (percentage >= 70) {
            resultEmoji = '🌟'; resultMsg = 'Great Job!'; resultColor = '#4CAF50';
        } else if (percentage >= 50) {
            resultEmoji = '👍'; resultMsg = 'Good Effort!'; resultColor = '#FF9800';
        } else {
            resultEmoji = '💪'; resultMsg = 'Keep Practicing!'; resultColor = '#E8856A';
        }
        
        // Build scoreboard HTML
        let scoreboardRows = '';
        participants.forEach((p, idx) => {
            const rank = idx + 1;
            const isCurrentUser = (p.name === joinName && idx === userIndex);
            const initial = p.name.charAt(0).toUpperCase();
            const pScore = p.score || 0;
            const pTotal = p.totalQuestions || totalQuestions;
            const pPercentage = Math.round((pScore / pTotal) * 100);
            
            // Rank medal
            let rankDisplay;
            if (rank === 1) rankDisplay = '<span class="sb-medal sb-gold">🥇</span>';
            else if (rank === 2) rankDisplay = '<span class="sb-medal sb-silver">🥈</span>';
            else if (rank === 3) rankDisplay = '<span class="sb-medal sb-bronze">🥉</span>';
            else rankDisplay = `<span class="sb-rank-num">${rank}</span>`;
            
            // Avatar gradient colors per rank
            const avatarColors = [
                'linear-gradient(135deg, #FFD700, #FDB931)',
                'linear-gradient(135deg, #C0C0C0, #9E9E9E)',
                'linear-gradient(135deg, #CD7F32, #E29B5A)',
                'linear-gradient(135deg, #667eea, #764ba2)',
                'linear-gradient(135deg, #f093fb, #f5576c)',
                'linear-gradient(135deg, #4facfe, #00f2fe)',
                'linear-gradient(135deg, #43e97b, #38f9d7)',
                'linear-gradient(135deg, #fa709a, #fee140)'
            ];
            const avatarBg = avatarColors[idx % avatarColors.length];
            
            scoreboardRows += `
                <div class="sb-row ${isCurrentUser ? 'sb-row-you' : ''}" style="animation-delay: ${idx * 0.15}s;">
                    <div class="sb-row-rank">${rankDisplay}</div>
                    <div class="sb-row-avatar" style="background: ${avatarBg};">${initial}</div>
                    <div class="sb-row-info">
                        <span class="sb-row-name">${p.name}${isCurrentUser ? ' <span class="sb-you-badge">YOU</span>' : ''}</span>
                    </div>
                    <div class="sb-row-score">
                        <span class="sb-score-value" data-target="${pScore}">${pScore}</span>
                        <span class="sb-score-total">/ ${pTotal}</span>
                    </div>
                    <div class="sb-row-bar-wrap">
                        <div class="sb-row-bar" style="--bar-width: ${pPercentage}%; animation-delay: ${idx * 0.15 + 0.3}s;"></div>
                    </div>
                </div>
            `;
        });
        
        resultDiv.innerHTML = `
            <div class="quiz-result-screen">
                <!-- Result Header with Animation -->
                <div class="result-header">
                    <div class="result-emoji-wrap">
                        <span class="result-emoji">${resultEmoji}</span>
                    </div>
                    <h2 class="result-msg" style="color: ${resultColor};">${resultMsg}</h2>
                    <div class="result-score-circle" style="--score-color: ${resultColor};">
                        <svg viewBox="0 0 100 100" class="result-ring">
                            <circle cx="50" cy="50" r="44" class="ring-bg" />
                            <circle cx="50" cy="50" r="44" class="ring-fill" style="--percentage: ${percentage};" />
                        </svg>
                        <div class="result-score-text">
                            <span class="score-num" id="animatedScore">0</span>
                            <span class="score-denom">/ ${totalQuestions}</span>
                        </div>
                    </div>
                    <p class="result-rank-text">You ranked <strong>#${userRank}</strong> out of <strong>${participants.length}</strong> participant${participants.length > 1 ? 's' : ''}</p>
                </div>

                <!-- Scoreboard -->
                <div class="scoreboard-section">
                    <div class="scoreboard-header">
                        <span class="scoreboard-icon">📋</span>
                        <h3>Scoreboard</h3>
                        <span class="scoreboard-count">${participants.length} participant${participants.length > 1 ? 's' : ''}</span>
                    </div>
                    <div class="scoreboard-list">
                        ${scoreboardRows}
                    </div>
                </div>

                <button class="btn-submit-event btn-finish-quiz" id="btnFinishQuizNew" style="max-width: 280px; margin: 30px auto 0;">
                    Back to Events ✦
                </button>
            </div>
        `;
        
        // Animate score counting up
        animateScoreCount('animatedScore', userScore, 1200);
        
        // Finish button
        document.getElementById('btnFinishQuizNew').addEventListener('click', () => {
            closeAllModals();
            formJoinQuiz.reset();
        });
    }
    
    // --- Score Count Animation ---
    function animateScoreCount(elementId, target, duration) {
        const el = document.getElementById(elementId);
        if (!el) return;
        const start = performance.now();
        
        function update(now) {
            const elapsed = now - start;
            const progress = Math.min(elapsed / duration, 1);
            // Ease out cubic
            const eased = 1 - Math.pow(1 - progress, 3);
            el.textContent = Math.round(eased * target);
            if (progress < 1) requestAnimationFrame(update);
        }
        requestAnimationFrame(update);
    }

    document.getElementById('btnFinishQuiz').addEventListener('click', () => {
        closeAllModals();
        formJoinQuiz.reset();
    });

    // --- Badge Upload Logic ---
    const inputBadgeImage = document.getElementById('inputBadgeImage');
    const badgeUploadBox = document.getElementById('badgeUploadBox');
    const badgeUploadContent = document.getElementById('badgeUploadContent');

    if (inputBadgeImage && badgeUploadBox) {
        inputBadgeImage.addEventListener('change', function(e) {
            const file = e.target.files[0];
            if (file) {
                const reader = new FileReader();
                reader.onload = function(evt) {
                    badgeUploadContent.innerHTML = `<img src="${evt.target.result}" class="badge-preview-img" alt="Badge Preview">`;
                    badgeUploadBox.classList.add('has-image');
                }
                reader.readAsDataURL(file);
            } else {
                badgeUploadContent.innerHTML = `
                    <span class="upload-icon">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect><circle cx="8.5" cy="8.5" r="1.5"></circle><polyline points="21 15 16 10 5 21"></polyline></svg>
                    </span>
                    <span class="upload-text">Upload Custom Badge</span>
                    <span class="upload-subtext">Click to browse (JPG, PNG)</span>
                `;
                badgeUploadBox.classList.remove('has-image');
            }
        });
    }

});
