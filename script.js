// script.js

// Select elements
const taskInput = document.getElementById('task-input');
const addTaskButton = document.getElementById('add-task');
const taskList = document.getElementById('task-list');

// Load tasks from localStorage on page load
document.addEventListener('DOMContentLoaded', loadTasks);

// Add task
addTaskButton.addEventListener('click', () => {
  const taskText = taskInput.value.trim();
  if (taskText) {
    addTask(taskText);
    saveTask(taskText);
    taskInput.value = '';
  }
});

// Add task to the DOM
function addTask(taskText, isCompleted = false) {
  const li = document.createElement('li');
  li.textContent = taskText;
  if (isCompleted) li.classList.add('completed');

  // Mark as completed on click
  li.addEventListener('click', () => {
    li.classList.toggle('completed');
    updateTaskStatus(taskText);
  });

  // Delete task
  const deleteBtn = document.createElement('button');
  deleteBtn.textContent = 'Delete';
  deleteBtn.className = 'delete-btn';
  deleteBtn.addEventListener('click', () => {
    deleteTask(taskText);
    li.remove();
  });

  li.appendChild(deleteBtn);
  taskList.appendChild(li);
}

// Save task to localStorage
function saveTask(taskText) {
  const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
  tasks.push({ text: taskText, completed: false });
  localStorage.setItem('tasks', JSON.stringify(tasks));
}

// Load tasks from localStorage
function loadTasks() {
  const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
  tasks.forEach(task => addTask(task.text, task.completed));
}

// Update task completion status in localStorage
function updateTaskStatus(taskText) {
  const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
  const task = tasks.find(t => t.text === taskText);
  if (task) task.completed = !task.completed;
  localStorage.setItem('tasks', JSON.stringify(tasks));
}

// Delete task from localStorage
function deleteTask(taskText) {
  let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
  tasks = tasks.filter(task => task.text !== taskText);
  localStorage.setItem('tasks', JSON.stringify(tasks));
}
