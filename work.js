// =============================================
// WORK PAGE LOGIC
// =============================================

document.addEventListener('DOMContentLoaded', () => {
    const taskForm = document.getElementById('taskForm');
    const taskInput = document.getElementById('taskInput');
    const taskDate = document.getElementById('taskDate');
    const taskPriority = document.getElementById('taskPriority');
    const todoList = document.getElementById('todoList');
    const doneList = document.getElementById('doneList');
    const todoCount = document.getElementById('todoCount');
    const doneCount = document.getElementById('doneCount');
    const dailyLimitBanner = document.getElementById('dailyLimitBanner');

    // Default date to today
    const today = new Date().toISOString().split('T')[0];
    taskDate.value = today;

    // Load tasks from local storage
    let tasks = JSON.parse(localStorage.getItem('rise_tasks')) || [];

    // Render tasks
    function renderTasks() {
        todoList.innerHTML = '';
        doneList.innerHTML = '';

        let todo = 0;
        let done = 0;

        const priorityOrder = { "High": 1, "Medium": 2, "Low": 3 };
        
        // Sort tasks: Due Date (asc), then Priority
        tasks.sort((a, b) => {
            if (a.completed !== b.completed) return 0; // Don't reorder between done/undone here
            if (a.dueDate !== b.dueDate) {
                return (a.dueDate || "") > (b.dueDate || "") ? 1 : -1;
            }
            return priorityOrder[a.priority] - priorityOrder[b.priority];
        });

        tasks.forEach((task, index) => {
            const li = document.createElement('li');
            li.className = 'task-item';

            const checkbox = document.createElement('input');
            checkbox.type = 'checkbox';
            checkbox.className = 'task-checkbox';
            checkbox.checked = task.completed;
            checkbox.addEventListener('change', () => toggleTask(index));

            const textWrap = document.createElement('div');
            textWrap.className = 'task-text-wrap';

            const span = document.createElement('span');
            span.className = 'task-text';
            span.textContent = task.text;

            const metaWrap = document.createElement('div');
            metaWrap.className = 'task-meta';
            if (task.dueDate) {
                const d = document.createElement('span');
                d.className = 'task-date';
                d.textContent = task.dueDate;
                metaWrap.appendChild(d);
            }
            if (task.priority) {
                const p = document.createElement('span');
                p.className = `task-priority prio-${task.priority.toLowerCase()}`;
                p.textContent = task.priority;
                metaWrap.appendChild(p);
            }

            textWrap.appendChild(span);
            textWrap.appendChild(metaWrap);

            const deleteBtn = document.createElement('button');
            deleteBtn.className = 'delete-btn';
            deleteBtn.innerHTML = '×';
            deleteBtn.title = 'Delete Task';
            deleteBtn.addEventListener('click', () => deleteTask(index));

            li.appendChild(checkbox);
            li.appendChild(textWrap);
            li.appendChild(deleteBtn);

            if (task.completed) {
                doneList.appendChild(li);
                done++;
            } else {
                todoList.appendChild(li);
                todo++;
            }
        });

        todoCount.textContent = todo;
        doneCount.textContent = done;
        
        if (todo > 5) {
            dailyLimitBanner.classList.remove('hidden');
        } else {
            dailyLimitBanner.classList.add('hidden');
        }

        saveTasks();
    }

    // Add new task
    taskForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const text = taskInput.value.trim();
        const dueDate = taskDate.value;
        const priority = taskPriority.value;
        if (text) {
            tasks.unshift({ text, dueDate, priority, completed: false });
            taskInput.value = '';
            taskDate.value = today;
            taskPriority.value = 'Medium';
            renderTasks();
        }
    });

    // Toggle task completion
    function toggleTask(index) {
        tasks[index].completed = !tasks[index].completed;
        renderTasks();
    }

    // Delete task
    function deleteTask(index) {
        tasks.splice(index, 1);
        renderTasks();
    }

    // Save tasks to local storage
    function saveTasks() {
        localStorage.setItem('rise_tasks', JSON.stringify(tasks));
    }

    // Initial render
    renderTasks();

    // =============================================
    // POMODORO TIMER LOGIC
    // =============================================
    const timeDisplay = document.getElementById('timeDisplay');
    const pomoToggleBtn = document.getElementById('pomoToggleBtn');
    const pomoResetBtn = document.getElementById('pomoResetBtn');
    const modeFocus = document.getElementById('modeFocus');
    const modeBreak = document.getElementById('modeBreak');

    let timerInterval = null;
    let isTimerRunning = false;
    let timeLeft = 25 * 60; // 25 mins in seconds
    let currentMode = 'focus'; // 'focus' or 'break'

    function formatTime(seconds) {
        const m = Math.floor(seconds / 60).toString().padStart(2, '0');
        const s = (seconds % 60).toString().padStart(2, '0');
        return `${m}:${s}`;
    }

    function updateTimeDisplay() {
        timeDisplay.textContent = formatTime(timeLeft);
    }

    function setMode(mode) {
        if (isTimerRunning) toggleTimer();
        currentMode = mode;
        if (mode === 'focus') {
            timeLeft = 25 * 60;
            modeFocus.classList.add('active');
            modeBreak.classList.remove('active');
        } else {
            timeLeft = 5 * 60;
            modeBreak.classList.add('active');
            modeFocus.classList.remove('active');
        }
        updateTimeDisplay();
    }

    modeFocus.addEventListener('click', () => setMode('focus'));
    modeBreak.addEventListener('click', () => setMode('break'));

    function toggleTimer() {
        if (isTimerRunning) {
            clearInterval(timerInterval);
            pomoToggleBtn.textContent = 'Start';
            pomoToggleBtn.classList.remove('active');
        } else {
            timerInterval = setInterval(() => {
                if (timeLeft > 0) {
                    timeLeft--;
                    updateTimeDisplay();
                } else {
                    // Timer finished
                    clearInterval(timerInterval);
                    pomoToggleBtn.textContent = 'Start';
                    pomoToggleBtn.classList.remove('active');
                    isTimerRunning = false;
                    // Auto-switch mode on finish
                    setMode(currentMode === 'focus' ? 'break' : 'focus');
                    alert(currentMode === 'break' ? 'Focus time complete! Take a break.' : 'Break time over! Back to focus.');
                }
            }, 1000);
            pomoToggleBtn.textContent = 'Pause';
            pomoToggleBtn.classList.add('active');
        }
        isTimerRunning = !isTimerRunning;
    }

    pomoToggleBtn.addEventListener('click', toggleTimer);

    pomoResetBtn.addEventListener('click', () => {
        setMode(currentMode); // resets time based on current mode
    });

    updateTimeDisplay();
});
