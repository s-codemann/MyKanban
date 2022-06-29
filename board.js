console.log("board.js loaded");
async function tasksToBoard() {
  tasks = backend.getItem("tasks");
  tasks.forEach((task) => {
    let taskCont = document.createElement("div");
    taskCont.classList.add("task-cont");
    let taskTitle = document.createElement("span");
    taskTitle.textContent = task.title;
    let taskDescription = document.createElement("P");
    taskCont.append(taskTitle, taskDescription);
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
