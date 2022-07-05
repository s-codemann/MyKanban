// document.body.addEventListener("dragover", (ev) =>
//   console.log(ev.clientX, ev.clientY)
// );
let taskColumns = Array.from(document.querySelectorAll(".column"));
let boardTasks = [...document.querySelectorAll(".task-cont")];
let columnsContainer = document.getElementById("columns-container");
let renderOrder;
let renderOrderInit;
let tasks;
console.log("board.js loaded");
async function tasksToBoard() {
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
    //columnsContainer.addEventListener("dragover", moveCol);
    //overflow toggle
    //draggable tasks
    taskColumns.forEach((column) => {
      column.dataset.renderIndex = renderOrder.find(
        (orderedEl) => orderedEl.id === column.id
      ).renderOrder;
      column.addEventListener("dragstart", colDragStart);
      //   column.addEventListener("dragover", (ev) => {
      //     ev.preventDefault();
      //     console
      //       .log
      //       //   ev.dataTransfer.getData("textCol"),
      //       //   ev.dataTransfer.getData("text")
      //       ();

      //     // column.addEventListener("drop", taskDrop);
      //   //   });
      //   console.log(task.id, renderOrder[0].id);
      console.log(
        renderOrder.find(
          (renderOrderTask) => taskCont.id === renderOrderTask.id
        ).renderOrder
      );
      taskCont.dataset.renderIndex = renderOrder.find(
        (renderOrderTask) => taskCont.id === renderOrderTask.id
      ).renderOrder;
      taskCont.draggable = true;
      taskCont.addEventListener("dragstart", taskDragStart);
      taskCont.addEventListener("drop", sortTasks);
      //   taskCont.addEventListener("drop", "");
      taskCont.append(taskTitle, taskDescription);
      taskCont.addEventListener("dragover", (ev) => {
        ev.preventDefault();
        ev.stopImmediatePropagation();
      });
      // taskCont.addEventListener("pointerover", textResizeGrow);
      // taskCont.addEventListener("pointerleave", textResizeShrink);
      taskColumns
        .find((column) => column.id === task.boardColumn)
        .append(taskCont);
      column.addEventListener("dragover", function (ev) {
        ev.preventDefault();

        // console.log(getMiddle(this), ev.clientX, ev.clientY);
      });
      column.addEventListener("drop", colDrop);
      column.addEventListener("drop", setRenderOrder);
      column.addEventListener("drop", saveRenderOrder);
      column.addEventListener("drop", sortTasks);
    });
  });

  // draggable columns
  //   columnsContainer.addEventListener("dragover", function (ev) {
  //     ev.preventDefault();
  // console.log(this);
  // console.log(ev.dataTransfer.getData("textCol"));
  // console.log(ev.target, this);
  //   });
  sortTasksForRender();
  overflowT();
}
async function initBoard() {
  await downloadFromServer();
  tasks = JSON.parse(backend.getItem("tasks"));
  renderOrder = JSON.parse(backend.getItem("renderOrder"));
  boardTasks = [...document.querySelectorAll(".task-cont")];
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
  this.scrollIntoView();
}

function taskDragStart(ev) {
  ev.dataTransfer.setData("text", this.id);
  ev.stopPropagation();
  this.classList.add("dragging");
  ev.dataTransfer.setDragImage(this, 0, 0);
}
function colDragStart(ev) {
  ev.dataTransfer.setData("textCol", this.id);
  console.log(this.id);

  //   document
  //     .querySelectorAll(".column")
  //     .forEach((col) => col.classList.add("not-dragging"));
  //   this.classList.add("dragging");
}
function colDragging(ev) {
  ev.preventDefault();
  console.log(this);
}
function colDrop(ev) {
  let data = ev.dataTransfer.getData("textCol");

  ev.preventDefault();
  if (data) {
    let transferId = ev.dataTransfer.getData("textCol");
    let elToTransfer = document.getElementById(
      ev.dataTransfer.getData("textCol")
    );
    console.log(getMiddle(this).horCenter > ev.clientX);
    if (getMiddle(this).horCenter > ev.clientX) {
      this.parentElement.insertBefore(elToTransfer, this);
    } else if (getMiddle(this).horCenter < ev.clientX) {
      this.after(elToTransfer);
    } else console.error("Fehklör");
  }
}
//   console.log(
//     [...document.querySelectorAll(".column")]
//       .map((col) => {
//         return [col, getMiddle(col)];
//         // col.append(getMiddle(col));
//         // console.log(col, getMiddle(col).getBoundingClientRect());
//       })
//       .reduce(
//         (closest, middle) => {
//           console.log(
//             //   ev.clientY,
//             //   middle[1].vertCenter,
//             //   ev.clientY - middle[1].vertCenter,
//             //   closest.horCenter + 2412412.5
//             ev.clientX - middle[1].horCenter <=
//               ev.clientX - closest[1].horCenter
//           );
//           if (
//             ev.clientX - middle[1].horCenter <=
//               ev.clientX - closest[1].horCenter &&
//             ev.clientY - middle[1].vertCenter <=
//               ev.clientY - closest[1].vertCenter
//           ) {
//             return middle;
//           } else return closest;
//         },

//         [
//           {},
//           {
//             vertCenter: Number.NEGATIVE_INFINITY,
//             horCenter: Number.NEGATIVE_INFINITY,
//           },
//         ]
//       )
//   );

//   console.log(transferId + " column dropped", ev);;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;
//   console.log(
//   console.log(
//     [...document.querySelectorAll(".column")].reduce(
//       (closest, col) => {
//         // console.log(
//         //   col.getBoundingClientRect(),
//         //   col.id,
//         //   "dropped by: ",
//         //   closest
//         // );
//         //   console.log(
//         //     ev.clientX,
//         //     ev.clientY,
//         //     col.getBoundingClientRect().right,
//         //     col.getBoundingClientRect().top,
//         //     closest
//         //   );
//         console.log(ev.clientX, ev.clientY);
//         let xDistance =
//           ev.clientX -
//           col.getBoundingClientRect().right -
//           parseInt(getComputedStyle(col).width) / 2;
//         let yDistance =
//           ev.clientY -
//           col.getBoundingClientRect().top -
//           parseInt(getComputedStyle(col).height) / 2;
//         // console.log(
//         //   ev.ClientY,
//         //   col.getBoundingClientRect().top,
//         //   "y-DIST:" + yDistance
//         // );
//         // if (xDistance < closest.horizontal || yDistance < closest.vertikal) {
//         //   return { horizontal: xDistance, vertikal: yDistance };
//         // }

//         let distanceComp = [
//           closest.horizontal - xDistance,
//           closest.vertikal - yDistance,
//         ];
//         // console.log(distanceComp, xDistance, yDistance, col);
//         if (distanceComp[0] >= 0 && distanceComp[1] >= 0) {
//           return {
//             horizontal: xDistance,
//             vertikal: yDistance,
//             col,
//           };
//         } else if (distanceComp[0] >= 0 && distanceComp[1] <= 0) {
//           return {
//             horizontal: xDistance,
//             vertikal: closest.vertikal,
//             col,
//           };
//         } else if (distanceComp[1] >= 0 && distanceComp[0] <= 0) {
//           return {
//             horizontal: closest.horizontal,
//             vertikal: yDistance,
//             col,
//           };
//         } else {
//           closest.col;
//           return closest;
//         }
//       },
//       { horizontal: 10000, vertikal: 10000 }
//     )
//   );
// }
// function taskDrop(ev) {
//   //   ev.preventDefault();
//   //   console.log(ev.type);
//   ev.preventDefault();
//   let transferId = ev.dataTransfer.getData("text");
//   if (ev.dataTransfer.getData("text")) {
//     this.append(document.getElementById(transferId));
//     setTaskCategories();
//   }

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
  //   console.log(tasksCopy);
  //   tasksCopy.forEach((entry) => console.log(entry.title, entry.boardColumn));
  await backend.setItem("tasks", JSON.stringify(tasksCopy));
  console.log("tasks saved");
  setRenderOrder();
  await saveRenderOrder();
  console.log("element order saved");
  //   await saveRenderOrder("task-cont");
  //   alert("SAVED");
  // saveRenderOrder().then(() => console.log("tasks sorted", tasks));
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
function getMiddle(el) {
  let bounds = el.getBoundingClientRect();
  let horizontalCenter = bounds.width / 2;
  let verticalCenter = bounds.height / 2;
  //   console.log(bounds);
  // console.log("helper", {
  //   hOff: bounds.top - bounds.height / 2,
  //   vOff: bounds.left + bounds.width / 2,
  // });
  return {
    vertCenter: (bounds.top + bounds.height / 2).toFixed(1),
    horCenter: (bounds.left + bounds.width / 2).toFixed(1),
  };
}
function sortTasks(ev) {
  ev.preventDefault();
  if (ev.dataTransfer.getData("text")) {
    ev.stopPropagation();
    let taskToTransfer = document.getElementById(
      ev.dataTransfer.getData("text")
    );
    //   console.log(taskToTransfer.id, getMiddle(this), ev.clientY);
    console.log(this.classList.entries);
    if (this.classList.contains("column")) {
      this.append(taskToTransfer);
    } else {
      if (getMiddle(this).vertCenter > ev.clientY) {
        this.parentElement.insertBefore(taskToTransfer, this);
        console.log("Y-BEFORE");
      } else if (getMiddle(this).vertCenter < ev.clientY) {
        console.log("Y-AFTER");
        this.after(taskToTransfer);
      }
    }
    setTaskCategories();
  }
}
// function setRenderOrder() {
//   tasks.forEach((task) => {
//     `task-id${parseInt()}` === "glu";
//     task.colIndex = getPrevSiblingCount(task) + 1;
//   });
//   console.log(tasks);
// }
function getPrevSiblingCount(el) {
  return [...el.parentElement.children].indexOf(el) || 0;
}
function initRenderOrder(elements) {
  localStorage.setItem(
    "renderOrder",
    JSON.stringify(
      [...document.querySelectorAll(".task-cont")]
        .map((domTask) => {
          return {
            id: domTask.id,
            renderOrder: getPrevSiblingCount(domTask) + 1,
          };
        })

        .concat(
          [...document.querySelectorAll(".column")].map((column) => {
            return { id: column.id, renderOrder: getPrevSiblingCount(column) };
          })
        )
    )
  );
}
function setRenderOrder() {
  document.querySelectorAll(".task-cont").forEach((domTask) => {
    renderOrder.find((renderOrderTask) => {
      return renderOrderTask.id === domTask.id;
    }).renderOrder = getPrevSiblingCount(domTask) + 1;
  });
  [...columnsContainer.children].forEach((column) => {
    renderOrder.find(
      (renderOrderElement) => renderOrderElement.id === column.id
    ).renderOrder = getPrevSiblingCount(column) + 1;
  });
  console.log(renderOrder);
}
async function saveRenderOrder(elements) {
  //   ev.preventDefault();
  console.log(JSON.parse(localStorage.getItem("renderOrder")));
  backend.setItem("renderOrder", JSON.stringify(renderOrder));
  console.log(JSON.parse(localStorage.getItem("renderOrder")));
}
function sortTasksForRender() {
  [...document.querySelectorAll(".column")].forEach((column) => {
    [...column.children]
      .sort(sortCompareForRender)
      .forEach((domTask) => column.append(domTask));
  });
  [...document.querySelector(".column").parentElement.children]
    .sort(sortCompareForRender)
    .forEach((sortedCol) => sortedCol.parentElement.append(sortedCol));
}
function sortCompareForRender(a, b) {
  if (a.dataset.renderIndex < b.dataset.renderIndex) {
    return -1;
  } else return 1;
}
function getRenderOrder() {
  [...document.querySelectorAll("task-cont")].forEach((cont) =>
    console.log(cont.description, cont.dataset.renderIndex)
  );
}
function loading() {}
function save() {}
function moveCol(ev) {
  let colToMove = document.getElementById(ev.dataTransfer.getData("textCol"));
  console.log(ev.clientX, colToMove.getBoundingClientRect().left);
  colToMove.style.left =
    ev.clientX - colToMove.getBoundingClientRect().left + "px";
}
function overflowT() {
  document.querySelectorAll(".task-cont").forEach((taskC) => {
    console.log(taskC.offsetHeight);
    if (taskC.offsetHeight < taskC.scrollHeight) {
      let overflowToggle = document.createElement("span");
      overflowToggle.textContent = "^";
      overflowToggle.classList.add("overflow-toggle", "rotated");
      overflowToggle.addEventListener("click", wholeTaskVisible);
      taskC.append(overflowToggle);
    }
  });
}
