let users;
let counter;
let userName = document.getElementById("name");
let email = document.getElementById("email");
let imgLink = document.getElementById("imgLink");
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

async function initAddUser() {
  await downloadFromServer();
  checkForData();
  users = JSON.parse(backend.getItem("users"));
  counter = backend.getItem("counter");
  document.querySelector("form").addEventListener("submit", addUser);
}
async function addUser(ev) {
  ev.preventDefault();
  let thisUser = {
    id: counter,
    userName: userName.value,
    email: email.value,
    imgLink: imgLink.value,
  };
  users.push(thisUser);
  await backend.setItem("users", JSON.stringify(users));
  console.log("user saved");
  counter++;
  await backend.setItem("counter", counter);
  console.log("counter saved");
}
window.addEventListener("DOMContentLoaded", initAddUser);
function checkForData() {
  console.log("checked", !backend.getItem("users")),
    !backend.getItem("tasks"),
    !backend.getItem("renderOrder");
  if (!backend.getItem("users")) {
    backend.setItem("users", JSON.stringify([]));
  }
  if (!backend.getItem("tasks")) {
    backend.setItem("tasks", JSON.stringify([]));
  }
  if (!backend.getItem("renderOrder")) {
    backend.setItem("renderOrder", JSON.stringify([]));
  }
  if (!backend.getItem("counter")) {
    backend.setItem("counter", JSON.stringify(1));
  }
}
