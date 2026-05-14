// Get elements
const taskInput = document.getElementById('taskInput');
const taskList = document.getElementById('taskList');

/* Add Task Function */
function addTask() {

    // Get input value
    const taskText = taskInput.value.trim();

    // Prevent empty tasks
    if (taskText === '') {
        alert('Please enter a task!');
        return;
    }

    // Create list item
    const listItem = document.createElement('li');

    // Create task text
    const taskSpan = document.createElement('span');
    taskSpan.textContent = taskText;

    // Complete button
    const completeButton = document.createElement('button');
    completeButton.innerHTML = '✔';
    completeButton.title = 'Mark as Complete';

    completeButton.onclick = () => {

        // Toggle completed class
        taskSpan.classList.toggle('completed');

        // Change button color after completion
        if (taskSpan.classList.contains('completed')) {
            completeButton.style.color = 'gray';
        } else {
            completeButton.style.color = '#34a853';
        }
    };

    // Edit button
    const editButton = document.createElement('button');
    editButton.textContent = 'Edit';
    editButton.className = 'edit-btn';

    editButton.onclick = () => {

        // Prompt user for new task
        const updatedTask = prompt('Edit your task:', taskSpan.textContent);

        // Update task if input is valid
        if (updatedTask !== null && updatedTask.trim() !== '') {
            taskSpan.textContent = updatedTask.trim();
        }
    };

    // Remove button
    const removeButton = document.createElement('button');
    removeButton.textContent = 'Remove';
    removeButton.className = 'remove-btn';

    removeButton.onclick = () => {

        // Remove task
        taskList.removeChild(listItem);
    };

    // Append buttons and task
    listItem.appendChild(completeButton);
    listItem.appendChild(taskSpan);
    listItem.appendChild(editButton);
    listItem.appendChild(removeButton);

    // Add task to list
    taskList.appendChild(listItem);

    // Clear input field
    taskInput.value = '';

    // Focus back on input
    taskInput.focus();
}

/* Add task using Enter key */
taskInput.addEventListener('keypress', function(event) {

    if (event.key === 'Enter') {
        addTask();
    }

});

/* Optional: Save tasks in Local Storage */

// Save tasks whenever page changes
function saveTasks() {
    localStorage.setItem('tasks', taskList.innerHTML);
}

// Load saved tasks on refresh
window.onload = () => {

    const savedTasks = localStorage.getItem('tasks');

    if (savedTasks) {
        taskList.innerHTML = savedTasks;

        // Reattach button functionality
        reattachEvents();
    }
};

// Reattach events after loading from storage
function reattachEvents() {

    const allTasks = taskList.querySelectorAll('li');

    allTasks.forEach(task => {

        const buttons = task.querySelectorAll('button');

        const completeButton = buttons[0];
        const editButton = buttons[1];
        const removeButton = buttons[2];

        const taskSpan = task.querySelector('span');

        // Complete button
        completeButton.onclick = () => {

            taskSpan.classList.toggle('completed');

            if (taskSpan.classList.contains('completed')) {
                completeButton.style.color = 'gray';
            } else {
                completeButton.style.color = '#34a853';
            }

            saveTasks();
        };

        // Edit button
        editButton.onclick = () => {

            const updatedTask = prompt('Edit your task:', taskSpan.textContent);

            if (updatedTask !== null && updatedTask.trim() !== '') {
                taskSpan.textContent = updatedTask.trim();
                saveTasks();
            }
        };

        // Remove button
        removeButton.onclick = () => {

            taskList.removeChild(task);
            saveTasks();
        };
    });
}

/* Save tasks whenever task list changes */
const observer = new MutationObserver(() => {
    saveTasks();
});

observer.observe(taskList, {
    childList: true,
    subtree: true
});