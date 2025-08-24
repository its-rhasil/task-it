const editForm = document.getElementById('edit-form');
const titleInput = document.getElementById('title');
const descriptionInput = document.getElementById('description');
const completedInput = document.getElementById('completed');
const formAlert = document.querySelector('.form-alert');

// Get task ID from URL parameters
const params = new URLSearchParams(window.location.search);
const id = params.get('id');

if (!id) {
    window.location.href = '/'; // Redirect if no ID is provided
}

// --- Fetch a Single Task ---
const fetchTask = async () => {
    try {
        const response = await fetch(`/api/v1/tasks/${id}`);
        const { task } = await response.json();

        if (!task) {
            formAlert.textContent = `No task with id: ${id}`;
            formAlert.style.color = 'red';
            return;
        }

        // Populate the form with task data
        titleInput.value = task.title;
        descriptionInput.value = task.description || '';
        completedInput.checked = task.completed;

    } catch (error) {
        console.log(error);
        formAlert.textContent = 'Error fetching task data.';
        formAlert.style.color = 'red';
    }
};

fetchTask();

// --- Update the Task ---
editForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const newTitle = titleInput.value;
    const newDescription = descriptionInput.value;
    const isCompleted = completedInput.checked;

    try {
        const response = await fetch(`/api/v1/tasks/${id}`, {
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                title: newTitle,
                description: newDescription,
                completed: isCompleted,
            }),
        });
        
        const { task } = await response.json();
        
        if (task) {
            formAlert.textContent = 'Success, task updated!';
            formAlert.style.color = 'green';
        } else {
             formAlert.textContent = 'Update failed.';
             formAlert.style.color = 'red';
        }

    } catch (error) {
        console.log(error);
        formAlert.textContent = 'Error, please try again.';
        formAlert.style.color = 'red';
    }
    
    setTimeout(() => { formAlert.textContent = ''; }, 3000);
});