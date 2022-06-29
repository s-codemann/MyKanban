console.log("board.js loaded");
async function tasksToBoard() {
  tasks = backend.getItem("tasks");
  tasks.forEach((task) => {
    //task elements
    let taskCont = document.createElement("div");
    taskCont.classList.add("task-cont");
    let taskTitle = document.createElement("h4");
    taskTitle.classList.add("task-title");
    taskTitle.textContent = task.title;
    let taskDescription = document.createElement("p");
    taskDescription.classList.add("task-description");
    taskDescription.textContent = task.description;
    //overflow toggle
    let overflowToggle = document.createElement("span");
    overflowToggle.textContent = "^";
    overflowToggle.classList.add("overflow-toggle");
    overflowToggle.addEventListener("click", wholeTaskVisible);
    //draggable
    task.draggable = true;
    taskCont.append(taskTitle, taskDescription, overflowToggle);
    // taskCont.addEventListener("pointerover", textResizeGrow);
    // taskCont.addEventListener("pointerleave", textResizeShrink);
    Array.from(document.querySelectorAll(".column"))
      .find((column) => column.id === task.boardColumn)
      .append(taskCont);
  });
}
async function initBoard() {
  await downloadFromServer();
  tasksToBoard();
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
}
