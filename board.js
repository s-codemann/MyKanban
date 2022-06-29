let taskColumns = Array.from(document.querySelectorAll(".column"));
let boardTasks = [...document.querySelectorAll(".task-cont")];
console.log("board.js loaded");
async function tasksToBoard() {
  tasks = backend.getItem("tasks");
  tasks.forEach((task) => {
    //task elements
    let taskCont = document.createElement("div");
    taskCont.classList.add("task-cont");
    taskCont.id = "task-id" + task.id;
    let taskTitle = document.createElement("h4");
    taskTitle.classList.add("task-title");
    taskTitle.textContent = task.title;
    let taskDescription = document.createElement("p");
    taskDescription.classList.add("task-description");
    taskDescription.textContent = task.description;
    //taskID

    //overflow toggle
    let overflowToggle = document.createElement("span");
    overflowToggle.textContent = "^";
    overflowToggle.classList.add("overflow-toggle", "rotated");
    overflowToggle.addEventListener("click", wholeTaskVisible);
    //draggable
    taskColumns.forEach((column) =>
      column.addEventListener("dragover", (ev) => {
        ev.preventDefault();
        column.addEventListener("drop", taskDrop);
        // this.style.cursor = "pointer";
      })
    );
    taskCont.draggable = true;
    taskCont.addEventListener("dragstart", taskDragStart);
    taskCont.append(taskTitle, taskDescription, overflowToggle);
    // taskCont.addEventListener("pointerover", textResizeGrow);
    // taskCont.addEventListener("pointerleave", textResizeShrink);
    taskColumns
      .find((column) => column.id === task.boardColumn)
      .append(taskCont);
  });
}
async function initBoard() {
  await downloadFromServer();
  tasksToBoard();
  boardTasks = [...document.querySelectorAll(".task-cont")];
}
initBoard();
function textResizeGrow(ev) {
  let colChildren = this.parentElement.children;

  console.log();
  [...colChildren].forEach(
    (child) =>
      (child.style.fontSize =
        parseInt(getComputedStyle(this.parentElement).width) / 13 + "px")
  );
}

function textResizeShrink(ev) {
  let colChildren = this.parentElement.children;
  console.log();
  [...colChildren].forEach(
    (child) =>
      (child.style.fontSize =
        parseInt(getComputedStyle(this.parentElement).width) / 14 + "px")
  );
}
function wholeTaskVisible(ev) {
  //   this.parentElement.style.height = "1000px";
  this.classList.toggle("rotated");
  this.parentElement.classList.toggle("show-everything");
  this.parentElement.parentElement.classList.toggle("overflow-scroll");
  this.scrollIntoView();
}

function taskDragStart(ev) {
  //   ev.preventDefault();
  ev.dataTransfer.setData("text", this.id);
}
function taskDrop(ev) {
  //   ev.preventDefault();
  //   console.log(ev.type);
  ev.preventDefault();
  let transferId = ev.dataTransfer.getData("text");
  this.append(document.getElementById(transferId));
  setTaskCategories();
}
async function setTaskCategories() {
  let tasksCopy = JSON.parse(JSON.stringify(tasks));
  console.log(tasksCopy);
  [...document.querySelectorAll(".task-cont")].forEach((task) => {
    tasksCopy.find(
      (clonedTask) => clonedTask.id === parseInt(task.id.replace(/[^0-9]/g, ""))
    ).boardColumn = task.parentElement.id;
  });
  console.log(tasksCopy);
  tasksCopy.forEach((entry) => console.log(entry.title, entry.boardColumn));
  backend.setItem("tasks", tasksCopy).then(() => {
    console.log("tasks saved");
  });
}
