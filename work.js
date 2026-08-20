// =============================================
// WORK PAGE LOGIC
// =============================================

document.addEventListener('DOMContentLoaded', () => {
    const taskForm = document.getElementById('taskForm');
    const taskInput = document.getElementById('taskInput');
    const todoList = document.getElementById('todoList');
    const doneList = document.getElementById('doneList');
    const todoCount = document.getElementById('todoCount');
    const doneCount = document.getElementById('doneCount');

    // Load tasks from local storage
    let tasks = JSON.parse(localStorage.getItem('rise_tasks')) || [];

    // Render tasks
    function renderTasks() {
        todoList.innerHTML = '';
        doneList.innerHTML = '';

        let todo = 0;
        let done = 0;

        tasks.forEach((task, index) => {
            const li = document.createElement('li');
            li.className = 'task-item';

            const checkbox = document.createElement('input');
            checkbox.type = 'checkbox';
            checkbox.className = 'task-checkbox';
            checkbox.checked = task.completed;
            checkbox.addEventListener('change', () => toggleTask(index));

            const span = document.createElement('span');
            span.className = 'task-text';
            span.textContent = task.text;

            const deleteBtn = document.createElement('button');
            deleteBtn.className = 'delete-btn';
            deleteBtn.innerHTML = '×';
            deleteBtn.title = 'Delete Task';
            deleteBtn.addEventListener('click', () => deleteTask(index));

            li.appendChild(checkbox);
            li.appendChild(span);
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
        saveTasks();
    }

    // Add new task
    taskForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const text = taskInput.value.trim();
        if (text) {
            tasks.unshift({ text: text, completed: false });
            taskInput.value = '';
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
});
