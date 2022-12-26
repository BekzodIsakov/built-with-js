const taskTemplate = document.getElementById("task-template");
const editInputTemplate = document.getElementById("edit-input-template");
const $newTaskInput = document.getElementById("new-task-input");
const $addTaskButton = document.getElementById("add-task-btn");
const $openDeleteModal = document.getElementById("open-delete-btn");
const $hideCompletedTasksSwitch = document.getElementById(
  "hideCompletedTasksSwitch"
);
const $soundSwitch = document.getElementById("soundSwitch");
const $tasksContainer = document.getElementById("tasks-container");
const $deleteAllTasks = document.getElementById("deleteAllTasks");

$addTaskButton.onclick = createTask;
$deleteAllTasks.onclick = deleteAllTasks;

const localStorageKeys = {
  tasks: "tasks",
  completedTasksHidden: "completedTasksHidden",
  soundOn: "soundOn",
};

const tasks = new Map(getItem(localStorageKeys.tasks));
let completedTasksHidden =
  getItem(localStorageKeys.completedTasksHidden) ?? false;
let soundOn = getItem(localStorageKeys.soundOn) ?? true;

function setItem(key, value) {
  localStorage.setItem(key, JSON.stringify(value));
}

function getItem(name) {
  return JSON.parse(localStorage.getItem(name));
}

const tickSound = new Audio("./assets/audio/done.wav");
const deleteSound = new Audio("./assets/audio/delete.wav");

function initTasksVisibility() {
  if (completedTasksHidden) hideCompletedTasks(true);

  $hideCompletedTasksSwitch.checked = completedTasksHidden;
  $hideCompletedTasksSwitch.addEventListener("click", (e) =>
    handleCompletedTasksVisibility(e.target.checked)
  );
  $hideCompletedTasksSwitch.addEventListener("keydown", (e) => {
    if (e.code === "Enter") {
      handleCompletedTasksVisibility(e.target.checked);
    }
  });
}

function handleCompletedTasksVisibility(isHidden) {
  hideCompletedTasks(isHidden);
  completedTasksHidden = isHidden;
  tickSound.play();
}

function hideCompletedTasks(isHidden) {
  const $tasks = document.querySelectorAll("#task-item");

  $tasks.forEach((task) => {
    if (isHidden && tasks.get(task.dataset.id).isChecked) {
      hide(task);
    } else {
      show(task);
    }
  });
}

function init() {
  initSound();
  renderTasks();
  initTasksVisibility();
}

function initSound() {
  $soundSwitch.checked = soundOn;
  setSound();

  $soundSwitch.onclick = switchSound;
  $soundSwitch.addEventListener("keydown", (e) => {
    if (e.code === "Enter") {
      switchSound(e);
    }
  });
}

function switchSound(e) {
  soundOn = e.target.checked;
  setSound();
  tickSound.play();
}

function setSound() {
  [tickSound, deleteSound].forEach((track) => {
    track.muted = !soundOn;
  });
}

function show(element) {
  element.classList.remove("d-none");
}

function hide(element) {
  element.classList.add("d-none");
}

function handleClickOutside(e) {}

function createTaskNode(key, task) {
  const taskTmp = document.importNode(taskTemplate.content, true);
  const $taskWrapper = taskTmp.querySelector(".container");
  const $taskText = $taskWrapper.querySelector("#task-content");
  const $checkBtn = $taskWrapper.querySelector("#check-btn");
  $checkBtn.dataset.checked = task.isChecked;

  $taskText.textContent = task.text;
  $taskWrapper.dataset.id = key;

  return $taskWrapper;
}

$tasksContainer.addEventListener("click", (e) => {
  if (!e.target.closest(".btn")) return;

  const $btn = e.target.closest(".btn");
  const $task = e.target.closest("#task-item");

  switch ($btn.id) {
    case "delete-btn":
      handleTaskDelete($task);
      break;
    case "edit-btn":
      const taskIsChecked = $task.querySelector(".bi-check-circle-fill");
      if (taskIsChecked) return;
      handleTaskEdit($task);
      break;
    case "check-btn":
      handleTaskCheck($task);
    default:
      break;
  }
});

function handleTaskCheck($task) {
  const taskId = $task.dataset.id;
  const task = tasks.get(taskId);
  const isChecked = !task.isChecked;

  tasks.set(taskId, { ...task, isChecked });
  if (isChecked) tickSound.play();
  if (completedTasksHidden) hide($task);
  updateTaskStyle($task, isChecked);
}

function updateTaskStyle($taskWrapper, isChecked) {
  if (!$taskWrapper) return;

  const $checkIcon = $taskWrapper.querySelector("#check-btn").firstElementChild;
  const $editBtn = $taskWrapper.querySelector("#edit-btn");
  const $taskContent = $taskWrapper.querySelector("#task-content");

  toggleCheckIcon($checkIcon, isChecked);
  editElementStyle($editBtn, ["text-secondary", "pe-none"], isChecked);
  editElementStyle(
    $taskContent,
    ["text-decoration-line-through", "text-black-50"],
    isChecked
  );
}

function editElementStyle(element, classesNamesArray, condition) {
  classesNamesArray.forEach((className) => {
    element.classList.toggle(className, condition);
  });
}

function toggleCheckIcon($checkIcon, isChecked) {
  if (isChecked) {
    $checkIcon.classList.replace("bi-check-circle", "bi-check-circle-fill");
  } else {
    $checkIcon.classList.replace("bi-check-circle-fill", "bi-check-circle");
  }
}

function handleTaskEdit(taskWrapper) {
  const inputTmp = document.importNode(editInputTemplate.content, true);
  const inputWrapper = inputTmp.querySelector(".input-group");
  const input = inputWrapper.querySelector("#edit-task-input");
  const confirmEditBtn = inputWrapper.querySelector("#confirm-edit-btn");
  const $taskContent = taskWrapper.querySelector("#task-content");

  input.value = $taskContent.textContent;
  taskWrapper.replaceWith(inputWrapper);
  input.focus();
  confirmEditBtn.onclick = () =>
    editTask(taskWrapper, $taskContent, input, inputWrapper);
}

function editTask(taskWrapper, $taskContent, input, inputWrapper) {
  tasks.set(taskWrapper.dataset.id, { text: input.value, isChecked: false });
  $taskContent.textContent = input.value;
  inputWrapper.replaceWith(taskWrapper);
}

function createTask() {
  if (!$newTaskInput.value) return;

  const key = Date.now().toString();
  const value = { text: $newTaskInput.value, isChecked: false };
  tasks.set(key, value);
  $newTaskInput.value = "";
  const newTaskNode = createTaskNode(key, value);
  $tasksContainer.append(newTaskNode);

  if (tasks.size > 2) show($openDeleteModal);
}

function renderTasks() {
  tasks.size > 2 && show($openDeleteModal);

  $tasksContainer.innerHTML = null;
  window.removeEventListener("click", handleClickOutside);

  tasks.forEach((task, key) => {
    const $newTaskNode = createTaskNode(key, task);
    $tasksContainer.append($newTaskNode);
    updateTaskStyle($newTaskNode, task.isChecked);
  });
}

$newTaskInput.addEventListener("keypress", (event) => {
  if (!$newTaskInput.value) return;

  if (event.key === "Enter") {
    createTask();
  }
});

function handleTaskDelete(target) {
  tasks.delete(target.dataset.id);
  target.remove();
  deleteSound.play();
  if (tasks.size <= 2) hide($openDeleteModal);
}

function deleteAllTasks() {
  tasks.clear();
  deleteSound.play();
  $tasksContainer.innerHTML = null;
}

init();

function saveIntoLocalStorage() {
  setItem(localStorageKeys.tasks, Array.from(tasks));
  setItem(localStorageKeys.completedTasksHidden, completedTasksHidden);
  setItem(localStorageKeys.soundOn, soundOn);
}

window.onbeforeunload = saveIntoLocalStorage;
