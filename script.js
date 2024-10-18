const taskBoard = document.getElementById("taskBoard");
const addTaskBox = document.getElementById("addTaskBox");
const taskModal = document.getElementById("taskModal");
const closeButton = document.querySelector(".close-button");
const saveTaskButton = document.getElementById("saveTaskButton");
const taskTitleInput = document.getElementById("taskTitleInput");
const taskItemTextarea = document.getElementById("taskItemTextarea");

// Open the modal when the add task box is clicked
addTaskBox.addEventListener("click", function () {
    taskModal.style.display = "flex";
});

// Close the modal when the close button is clicked
closeButton.addEventListener("click", function () {
    taskModal.style.display = "none";
    clearModalInputs();
});

// Save task and close the modal
saveTaskButton.addEventListener("click", function () {
    const title = taskTitleInput.value.trim();
    const todoText = taskItemTextarea.value.trim();
    if (title === "" || todoText === "") {
        alert("Please enter both a title and at least one to-do item.");
        return;
    }

    // Create a unique ID for the task
    const taskId = Date.now().toString();

    // Create and append the task box
    const taskBox = createTaskBox(taskId, title, todoText);
    taskBoard.insertBefore(taskBox, addTaskBox);

    // Save task to localStorage
    saveTaskToLocalStorage(taskId, title, todoText);

    // Close the modal and clear inputs
    clearModalInputs();
    taskModal.style.display = "none";
});

// Function to create a task box element
function createTaskBox(id, title, todoText) {
    const taskBox = document.createElement("div");
    taskBox.classList.add("task-box");

    // Create and append the title
    const taskTitle = document.createElement("h2");
    taskTitle.textContent = title;
    taskBox.appendChild(taskTitle);

    // Create a container for to-do items
    const taskList = document.createElement("div");
    const todos = todoText.split("\n");
    todos.forEach((todo) => {
        if (todo.trim() !== "") {
            const taskItem = document.createElement("div");
            taskItem.textContent = todo;
            taskItem.classList.add("task-item");
            taskList.appendChild(taskItem);
        }
    });
    taskBox.appendChild(taskList);

    // Create a footer for the delete button
    const taskFooter = document.createElement("div");
    taskFooter.classList.add("task-footer");

    const deleteButton = document.createElement("button");
    deleteButton.textContent = "Delete";
    deleteButton.classList.add("delete-button");

    // Add delete button functionality
    deleteButton.addEventListener("click", function () {
        taskBoard.removeChild(taskBox); // Remove task box from the DOM
        removeTaskFromLocalStorage(id); // Remove from localStorage by ID
    });

    taskFooter.appendChild(deleteButton);
    taskBox.appendChild(taskFooter);

    return taskBox;
}

// Function to clear modal inputs
function clearModalInputs() {
    taskTitleInput.value = "";
    taskItemTextarea.value = "";
}

// Load tasks from localStorage when the page loads
window.addEventListener("load", loadTasksFromLocalStorage);

// Function to load tasks from localStorage
function loadTasksFromLocalStorage() {
    const tasks = JSON.parse(localStorage.getItem("tasks")) || [];

    tasks.forEach((task) => {
        const { id, title, todos } = task;
        const taskBox = createTaskBox(id, title, todos.join("\n"));
        taskBoard.insertBefore(taskBox, addTaskBox);
    });
}

// Function to save a task to localStorage
function saveTaskToLocalStorage(id, title, todos) {
    const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    const task = { id, title, todos: todos.split("\n") };
    tasks.push(task);
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

// Function to remove a task from localStorage by ID
function removeTaskFromLocalStorage(id) {
    let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    tasks = tasks.filter((task) => task.id !== id);
    localStorage.setItem("tasks", JSON.stringify(tasks));
}