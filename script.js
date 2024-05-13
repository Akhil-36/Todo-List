const addForm = document.getElementById('add-form');
const taskInput = document.getElementById('task-input');
const tasksList = document.getElementById('tasks-list');

let tasks = [];

addForm.addEventListener('submit', e => {
    e.preventDefault();

    if (taskInput.value.trim()) {
        const newTask = {
            text: taskInput.value.trim(),
            completed: false
        };

        tasks.push(newTask);
        taskInput.value = '';

        renderTasks();
    }
});

function renderTasks() {
    tasksList.innerHTML = '';

    tasks.forEach(task => {
        const taskHTML = `
            <li>
                <input type="checkbox" class="task-checkbox" ${task.completed? 'checked' : ''}>
                <span class="task-text">${task.text}</span>
                <button class="task-remove">Remove</button>
            </li>
        `;

        tasksList.innerHTML += taskHTML;
    });

    const taskRemoveButtons = document.querySelectorAll('.task-remove');

    taskRemoveButtons.forEach(button => {
        button.addEventListener('click', () => {
            const taskIndex = tasks.findIndex(task => task.text === button.parentNode.querySelector('.task-text').textContent);
            tasks.splice(taskIndex, 1);
            renderTasks();
        });
    });

    const taskCheckboxes = document.querySelectorAll('.task-checkbox');

    taskCheckboxes.forEach(checkbox => {
        checkbox.addEventListener('click', () => {
            const taskIndex = tasks.findIndex(task => task.text === checkbox.parentNode.querySelector('.task-text').textContent);
            tasks[taskIndex].completed = checkbox.checked;
        });
    });
}

renderTasks();