let users;
let avaCont = document.querySelector(".avatars");
let title;
let date;
let description;
let category;
let urgency;
let createButton = document.getElementById("create");
let resetButton = document.getElementById("cancel");
resetButton.addEventListener("click", resetFor);
let allInputElements = Array.from(document.querySelectorAll("[type]"))
  .concat(Array.from(document.querySelectorAll("textarea")))
  .concat(Array.from(document.querySelectorAll("select")));
resetFor();

// let addUserBtn = document.querySelector(".addUser");
// addUserBtn.addEventListener("click", showNewUserForm);
// function showNewUserForm(ev) {
//   let addUserCont = document.createElement("div");
//   addUserBtn.type = "submit";
//   let addUserForm = document.createElement("form");
//   let addUserName = document.createElement("input");
//   addUserName.type = "text";
//   let addUserEmail = document.createElement("input");
//   addUserEmail.type = "email";
//   let addUserImg = document.createElement("input");
//   addUserImg.type = "file";
//   addUserImg.accept = ".png,.jpg,.JPEG";
//   addUserForm.append(addUserName, addUserEmail, addUserImg);

//   ev.target.parentElement.insertBefore(addUserForm, addUserBtn);
//   ev.target.parentElement.removeChild(addUserBtn);
// }
let tasks;
function getCounter() {
  if (
    backend.getItem("counter") === null ||
    backend.getItem("counter") === "undefined"
  ) {
    return 0;
  } else {
    return backend.getItem("counter");
  }
}
async function inputToObject() {
  let counter = getCounter();
  title = document.getElementById("title").value;
  date = document.getElementById("date").value;
  description = document.getElementById("description").value;
  category = document.getElementById("category").value;
  urgency = document.getElementById("urgency").value;

  console.log("läuft", counter);
  let task = {
    title: title,
    date: date,
    description: description,
    category: category,
    urgency: urgency,
    id: counter,
    createdAt: new Date().getTime(),
    boardColumn: "to-do",
    renderOrder: 0,
    user: document.querySelector(".avatarSelected").id,
  };
  console.log(tasks, counter);
  tasks.push(task);
  backend.setItem(`tasks`, JSON.stringify(tasks));
  counter++;
  console.log(counter);
  await backend.setItem("counter", counter).then(() => {
    console.log(backend.getItem("counter"));
  });

  let renderOrder = JSON.parse(backend.getItem("renderOrder"));
  renderOrder.push({ id: "task-id" + task.id, renderOrder: 0 });
  console.log(renderOrder);
  await backend.setItem("renderOrder", JSON.stringify(renderOrder));
  console.log(renderOrder);
  window.location.href = "./index.html";
  //   counter++;
  //   // backend.deleteItem("counter");
  //   backend.setItem("counter", counter);
  resetFor();
}

// function reset() {

//     allInputElements.forEach((elem) => (elem.value = null));
// }

function resetFor() {
  for (i = 0; i < allInputElements.length - 1; i++) {
    allInputElements[i].value = null;
    allInputElements[i].required = "true";
  }
  document.getElementById("time").required = false;
}
async function init() {
  await downloadFromServer();
  users = JSON.parse(backend.getItem("users")) || [];
  counter = backend.getItem("counter") || 1;
  tasks = JSON.parse(backend.getItem("tasks")) || [];
  showAvatars();
  document.querySelector("form").addEventListener("submit", (ev) => {
    ev.preventDefault();
    inputToObject();
    // setTimeout(() => (window.location.href = "./index.html"), 500);
  });
}
function showAvatars() {
  users.forEach((user) => {
    let userImg = document.createElement("img");
    userImg.id = user.id;
    userImg.title = user.userName;
    userImg.src = user.imgLink;
    userImg.classList.add("avatarStyle");
    avaCont.append(userImg);
  });
  document.querySelectorAll(".avatarStyle").forEach((avatar) =>
    avatar.addEventListener("click", (ev) => {
      document.querySelectorAll(".avatarStyle").forEach((ava) => {
        ava.classList.remove("avatarSelected");
      });
      avatar.classList.add("avatarSelected");
    })
  );
}
// users.forEach((user) => {
//   let userImg = document.createElement("img");
//   userImg.id = user.id;
//   userImg.title = user.userName;
//   userImg.src = imgLink;
//   userImg.classList.add("avatarStyle");
// });
