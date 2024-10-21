// const taskBoard = document.getElementById("taskBoard");
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

  // Generate a unique ID for each task
  const taskId = Date.now().toString();

  // Create the task box container
  const taskBox = document.createElement("div");
  taskBox.classList.add("task-box");
  taskBox.setAttribute("data-id", taskId); // Set the unique ID as a data attribute

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

  // Add double-click event to ask for deletion
  taskBox.addEventListener("dblclick", function () {
    if (confirm(`Are you sure you want to delete the task "${title}"?`)) {
      taskBoard.removeChild(taskBox);
      removeTaskFromLocalStorage(taskId);
    }
  });

  // Append the task box to the task board
  taskBoard.insertBefore(taskBox, addTaskBox);

  // Save task to localStorage with unique ID
  saveTaskToLocalStorage(taskId, title, todos);

  // Close the modal and clear inputs
  clearModalInputs();
  taskModal.style.display = "none";
});

// Function to clear modal inputs
function clearModalInputs() {
  taskTitleInput.value = "";
  taskItemTextarea.value = "";
}

// Load tasks from localStorage when the page loads
window.addEventListener("load", function () {
  loadTasksFromLocalStorage();
  // Ensure the add task box is always at the end
  taskBoard.appendChild(addTaskBox);
});

// Function to load tasks from localStorage
function loadTasksFromLocalStorage() {
  const tasks = JSON.parse(localStorage.getItem("tasks")) || [];

  tasks.forEach((task) => {
    const { id, title, todos } = task;

    const taskBox = document.createElement("div");
    taskBox.classList.add("task-box");
    taskBox.setAttribute("data-id", id);  // Set the unique ID as a data attribute

    const taskTitle = document.createElement("h2");
    taskTitle.textContent = title;
    taskBox.appendChild(taskTitle);

    const taskList = document.createElement("div");
    todos.forEach((todo) => {
      const taskItem = document.createElement("div");
      taskItem.textContent = todo;
      taskItem.classList.add("task-item");
      taskList.appendChild(taskItem);
    });
    taskBox.appendChild(taskList);

    // Add double-click event to ask for deletion
    taskBox.addEventListener("dblclick", function () {
      if (confirm(`Are you sure you want to delete the task "${title}"?`)) {
        taskBoard.removeChild(taskBox);
        removeTaskFromLocalStorage(id);  // Use the unique ID for deletion
      }
    });

    taskBoard.insertBefore(taskBox, addTaskBox);
  });
}

// Function to save task to localStorage
function saveTaskToLocalStorage(id, title, todos) {
  const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
  tasks.push({ id, title, todos });
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

// Function to remove a task from localStorage
function removeTaskFromLocalStorage(id) {
  let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
  tasks = tasks.filter((task) => task.id !== id);  // Use the unique ID for filtering
  localStorage.setItem("tasks", JSON.stringify(tasks));
}
