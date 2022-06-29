let tasks;
console.log("board.js loaded");
async function tasksToBoard() {
  tasks = await backend.getItem("tasks");
  tasks.forEach((task) => {
    let taskCont = document.createElement("div");
    let taskTitle = document.createElement("span");
    let taskDescription = document.createElement("P");
    taskCont.append(taskTitle, taskDescription);
    Array.from(document.querySelectorAll(".column"))
      .filter((column) => {
        console.log(column.id);
      })
      .append(taskCont);
  });
}

async function initBoard(){
  await dowloadFromServer();
  tasksToBoard();
}
initBoard();