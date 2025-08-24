const tasksContainer = document.getElementById('tasks-container');
const loadingText = document.getElementById('loading');
const taskForm = document.getElementById('task-form');
const titleInput = document.getElementById('title');
const descriptionInput = document.getElementById('description');
const completedInput = document.getElementById('completed');
const formAlert = document.querySelector('.form-alert');
const searchInput = document.getElementById('search-input');

// --- Fetch and Display All Tasks ---
const showTasks = async () => {
    loadingText.style.display = 'block';
    try {
        const response = await fetch('/api/v1/tasks');
        const data = await response.json();
        const tasks = data.tasks;

        if (tasks.length < 1) {
            tasksContainer.innerHTML = '<h5>No tasks in your list</h5>';
            loadingText.style.display = 'none';
            return;
        }

        const allTasks = tasks.map((task) => {
            const { completed, _id: taskID, title, description } = task;
            return `
                <div class="task ${completed && 'completed'}">
                    <div class="task-info">
                        <h4>${title}</h4>
                        <p>${description || 'No description'}</p>
                    </div>
                    <div class="task-actions">
                        <a href="edit.html?id=${taskID}" class="edit-link">✏️</a>
                        <button type="button" class="delete-btn" data-id="${taskID}">🗑️</button>
                    </div>
                </div>`;
        }).join('');

        tasksContainer.innerHTML = allTasks;
    } catch (error) {
        tasksContainer.innerHTML = '<h5>There was an error, please try later</h5>';
    }
    loadingText.style.display = 'none';
};

showTasks();

// --- Create a New Task ---
taskForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const title = titleInput.value;
    const description = descriptionInput.value;
    const completed = completedInput.checked; // Reads true/false from the checkbox

    // === DEBUGGING LINE ADDED HERE ===
    console.log('Sending this data to the server:', { title, description, completed });

    try {
        await fetch('/api/v1/tasks', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ title, description, completed }),
        });
        showTasks(); // Refresh the list
        titleInput.value = '';
        descriptionInput.value = '';
        completedInput.checked = false;
        formAlert.textContent = 'Success, task added!';
        formAlert.style.color = 'green';
    } catch (error) {
        formAlert.textContent = 'Error, please try again.';
        formAlert.style.color = 'red';
    }
    setTimeout(() => { formAlert.textContent = ''; }, 3000);
});

// --- Delete a Task ---
tasksContainer.addEventListener('click', async (e) => {
    if (e.target.classList.contains('delete-btn')) {
        const id = e.target.dataset.id;
        try {
            await fetch(`/api/v1/tasks/${id}`, { method: 'DELETE' });
            showTasks(); // Refresh the list
        } catch (error) {
            console.log(error);
        }
    }
});

// --- Search/Filter Tasks ---
searchInput.addEventListener('input', () => {
    const searchTerm = searchInput.value.toLowerCase();
    const tasks = document.querySelectorAll('.task');

    tasks.forEach(task => {
        const taskInfo = task.querySelector('.task-info').textContent.toLowerCase();
        if (taskInfo.includes(searchTerm)) {
            task.style.display = 'flex';
        } else {
            task.style.display = 'none';
        }
    });
});