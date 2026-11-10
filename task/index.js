// Local backend URL (change this to your live Railway URL later)
const API_URL = 'http://localhost:8080/api/tasks';

async function fetchTasks() {
    try {
        const response = await fetch(API_URL);
        const tasks = await response.json();
        const list = document.getElementById('taskList');
        list.innerHTML = '';
        
        tasks.forEach(task => {
            list.innerHTML += `
                <li>
                    <span>${task.title}</span>
                    <button class="delete-btn" onclick="deleteTask(${task.id})">Delete</button>
                </li>
            `;
        });
    } catch (error) {
        console.error('Error fetching tasks:', error);
    }
}

async function addTask() {
    const input = document.getElementById('taskInput');
    const title = input.value.trim();
    if (!title) return;

    try {
        await fetch(API_URL, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ title: title, completed: false })
        });

        input.value = '';
        fetchTasks();
    } catch (error) {
        console.error('Error adding task:', error);
    }
}

async function deleteTask(id) {
    try {
        await fetch(`${API_URL}/${id}`, { method: 'DELETE' });
        fetchTasks();
    } catch (error) {
        console.error('Error deleting task:', error);
    }
}

// Load tasks on startup
fetchTasks();