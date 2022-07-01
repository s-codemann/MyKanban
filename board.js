let taskColumns = Array.from(document.querySelectorAll(".column"));
let boardTasks = [...document.querySelectorAll(".task-cont")];
let columnsContainer = document.getElementById("columns-container");
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
    //draggable tasks
    taskColumns.forEach((column) => {
      column.addEventListener("dragstart", colDragStart);
      column.addEventListener("dragover", (ev) => {
        ev.preventDefault();
        console
          .log
          //   ev.dataTransfer.getData("textCol"),
          //   ev.dataTransfer.getData("text")
          ();

        column.addEventListener("drop", taskDrop);
      });
      taskCont.draggable = true;
      taskCont.addEventListener("dragstart", taskDragStart);
      taskCont.append(taskTitle, taskDescription, overflowToggle);
      // taskCont.addEventListener("pointerover", textResizeGrow);
      // taskCont.addEventListener("pointerleave", textResizeShrink);
      taskColumns
        .find((column) => column.id === task.boardColumn)
        .append(taskCont);
    });
  });

  // draggable columns
  columnsContainer.addEventListener("dragover", function (ev) {
    ev.preventDefault();
    // console.log(ev.dataTransfer.getData("textCol"));
    // console.log(ev.target, this);
  });
  columnsContainer.addEventListener("drop", colDrop);
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
  ev.dataTransfer.setData("text", this.id);
  this.classList.add("dragging");
}
function colDragStart(ev) {
  ev.dataTransfer.setData("textCol", this.id);
  console.log(this.id);
  this.classList.add("dragging");
}
function colDrop(ev) {
  ev.preventDefault();
  let transferId = ev.dataTransfer.getData("textCol");
  //   console.log(transferId + " column dropped", ev);
  //   console.log(
  console.log(
    [...document.querySelectorAll(".column")].reduce(
      (closest, col) => {
        // console.log(
        //   col.getBoundingClientRect(),
        //   col.id,
        //   "dropped by: ",
        //   closest
        // );
        //   console.log(
        //     ev.clientX,
        //     ev.clientY,
        //     col.getBoundingClientRect().right,
        //     col.getBoundingClientRect().top,
        //     closest
        //   );
        let xDistance =
          ev.clientX -
          col.getBoundingClientRect().right -
          parseInt(getComputedStyle(col).width) / 2;
        let yDistance =
          ev.clientY -
          col.getBoundingClientRect().top -
          parseInt(getComputedStyle(col).height) / 2;
        // console.log(
        //   ev.ClientY,
        //   col.getBoundingClientRect().top,
        //   "y-DIST:" + yDistance
        // );
        // if (xDistance < closest.horizontal || yDistance < closest.vertikal) {
        //   return { horizontal: xDistance, vertikal: yDistance };
        // }

        let distanceComp = [
          closest.horizontal - xDistance,
          closest.vertikal - yDistance,
        ];
        console.log(distanceComp, xDistance, yDistance, col);
        if (distanceComp[0] >= 0 && distanceComp[1] >= 0) {
          return {
            horizontal: xDistance,
            vertikal: yDistance,
            col,
          };
        } else if (distanceComp[0] >= 0 && distanceComp[1] <= 0) {
          return {
            horizontal: xDistance,
            vertikal: closest.vertikal,
            col,
          };
        } else if (distanceComp[1] >= 0 && distanceComp[0] <= 0) {
          return {
            horizontal: closest.horizontal[0],
            vertikal: yDistance,
            col,
          };
        }
      },
      { horizontal: 10000, vertikal: 10000 }
    )
  );
}
function taskDrop(ev) {
  //   ev.preventDefault();
  //   console.log(ev.type);
  ev.preventDefault();
  let transferId = ev.dataTransfer.getData("text");
  this.append(document.getElementById(transferId));
  setTaskCategories();
}
// function colDrop(ev) {
//   ev.preventDefault();
//   let transferId = ev.dataTransfer.getData("textCol");

//   let insertNode =
//     document.getElementById(transferId).nextSibling ||
//     document.getElementById(transferId).previousSibling;
//   let toTransferPrevSibling =
//     document.getElementById(transferId).previousSibling;
//   let toTransferNextSibling = document.getElementById(transferId).nextSibling;
//   let onDropPrevSibling = this.previousSibling;
//   let onDropNextSibling = this.nextSibling;

//   if (onDropPrevSibling) {
//     this.previousSibling.after(document.getElementById(transferId));
//     if (toTransferNextSibling) {
//       this.parentElement.insertBefore(
//         this,
//         document.getElementById(transferId).nextSibling
//       );
//     } else if (toTransferPrevSibling) {
//       toTransferPrevSibling.after(this);
//     }
//   } else if (onDropNextSibling) {
//     this.parentElement.insertBefore(
//       document.getElementById(transferId),
//       this.nextSibling
//     );
//     if (toTransferNextSibling) {
//       this.parentElement.insertBefore(this, toTransferNextSibling);
//     } else if (toTransferPrevSibling) {
//       toTransferPrevSibling.after(this);
//     }
//   }
// }
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
// if (
//     document
//       .getElementById(ev.dataTransfer.getData("textCol"))
//       .parentElement.classList.contains("column")
//   ) {
//     column.addEventListener("drop", taskDrop);
//   } else if (
//     document.getElementById(ev.dataTransfer.getData("textCol"))
//       .parentElement.id === "columns-container"
//   ) {
//     column.addEventListener("drop", colDrop);
//   }
//   console.log(this.ondrop);
//   // this.style.cursor = "pointer";
// })
