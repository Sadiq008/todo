var input = document.querySelector("input[type='text']");
var add = document.querySelector(".add");
var list = document.querySelector(".list");
var tasks_position = document.querySelector(".tasks_position");

var editIndex = null;
function renderTasks() {
  var tasks = JSON.parse(localStorage.getItem("tasks")) || [];
  list.innerHTML = "";

  tasks.forEach(function (task, index) {
    var checked = task.completed ? "checked" : "";
    list.innerHTML += `
      <li>
        <span class="${task.completed ? "completed" : ""}">${
      task.description
    }</span>
        <div class="buttons">
          <input type="checkbox" class="check" data-index="${index}" ${checked}>
          <button class="update" data-index="${index}">Update</button>
          <button class="delete" data-index="${index}">Delete</button>
        </div>
      </li>`;
  });

  var hasTasks = tasks.length > 0;
  tasks_position.style.display = hasTasks ? "flex" : "none";
}

// Function to add or update a task
function saveTask(e) {
  e.preventDefault();
  var taskDescription = input.value.trim();

  if (taskDescription === "") {
    alert("Please enter a task");
  } else {
    var tasks = JSON.parse(localStorage.getItem("tasks")) || [];

    if (editIndex !== null) {
      tasks[editIndex].description = taskDescription;
      editIndex = null;
      add.value = "Add";
    } else {
      tasks.push({ description: taskDescription, completed: false });
    }

    localStorage.setItem("tasks", JSON.stringify(tasks));
    renderTasks();
    input.value = "";
  }
}

// Function to edit a task
function editTask(index) {
  var tasks = JSON.parse(localStorage.getItem("tasks")) || [];
  input.value = tasks[index].description;
  add.value = "Update";
  editIndex = index;
}

// Function to remove a task
function removeTask(index) {
  var tasks = JSON.parse(localStorage.getItem("tasks")) || [];
  tasks.splice(index, 1);
  localStorage.setItem("tasks", JSON.stringify(tasks));
  renderTasks();
}

// Function to toggle completion
function toggleTaskCompletion(index) {
  var tasks = JSON.parse(localStorage.getItem("tasks")) || [];
  tasks[index].completed = !tasks[index].completed;
  localStorage.setItem("tasks", JSON.stringify(tasks));
  renderTasks();
}

// Event listener for pressing 'Enter'
input.addEventListener("keypress", function (e) {
  if (e.key === "Enter") {
    saveTask(e);
  }
});

// Event listener for clicking the 'Add' or 'Update' button
add.addEventListener("click", function (e) {
  saveTask(e);
});

// Event delegation for dynamically added buttons and checkboxes
list.addEventListener("click", function (e) {
  var index = e.target.getAttribute("data-index");

  if (e.target.classList.contains("delete")) {
    removeTask(index);
  } else if (e.target.classList.contains("update")) {
    editTask(index);
  } else if (e.target.classList.contains("check")) {
    toggleTaskCompletion(index);
  }
});

// Render tasks on page load
window.onload = function () {
  renderTasks();
};
