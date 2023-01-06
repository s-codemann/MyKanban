let tasks;
let users;
let backlogCont = document.getElementById("backlogItems");
let importanceColor;
function renderBacklog() {
  tasks.forEach((task) => {
    let user = storedUsers.find(
      (savedUser) => parseInt(savedUser.id) === parseInt(task.user)
    );
    switch (task.urgency) {
      case "high":
        importanceColor = "red";
        break;
      case "medium":
        importanceColor = "orange";
        break;
      case "low":
        importanceColor = "yellow";
        break;
    }
    console.log(user);
    let entryCont = document.createElement("div");
    entryCont.classList.add("entry-cont");
    let entryImg = document.createElement("img");
    entryImg.classList.add("entry-img");
    entryImg.src = user.imgLink;
    let entryUserName = document.createElement("span");
    entryUserName.textContent = user.userName;
    let entryMail = document.createElement("a");
    entryMail.textContent = user.email;
    let entryCategory = document.createElement("div");
    entryCategory.textContent = task.category.toUpperCase();
    entryCategory.classList.add("entry-category");
    let entryDetails = document.createElement("p");
    entryDetails.textContent = task.description;
    entryCont.dataset.created = task.date;
    entryDetails.classList.add("entry-details");
    let userInfoCont = document.createElement("div");
    userInfoCont.classList.add("user-info-cont");
    userInfoCont.append(entryUserName, entryMail);
    let allUserInfoCont = document.createElement("div");
    allUserInfoCont.classList.add("all-user-info");
    let importance;
    //
    allUserInfoCont.append(entryImg, userInfoCont);
    //
    entryCont.append(allUserInfoCont, entryCategory, entryDetails);
    backlogCont.append(entryCont);
  });
  document.querySelector(".entry-cont").classList.add("first-entry");
  overflowT();
}

async function initBacklog() {
  await downloadFromServer();
  checkForData();
  tasks = JSON.parse(backend.getItem("tasks"));
  storedUsers = JSON.parse(backend.getItem("users"));
  console.log(storedUsers);
  renderBacklog();
}
window.addEventListener("DOMContentLoaded", initBacklog);
function overflowT() {
  document.querySelectorAll(".entry-details").forEach((taskC) => {
    console.log(taskC.offsetHeight);
    if (taskC.offsetHeight < taskC.scrollHeight) {
      let overflowToggle = document.createElement("span");
      overflowToggle.textContent = "^";
      overflowToggle.classList.add("overflow-toggle", "rotated");
      overflowToggle.addEventListener("click", wholeTaskVisible);
      taskC.append(overflowToggle);
      taskC.style.alignItems = "flex-start";
    }
  });
}
function wholeTaskVisible(ev) {
  //   this.parentElement.style.height = "1000px";
  this.classList.toggle("rotated");
  this.parentElement.classList.toggle("show-everything");
  this.parentElement.parentElement.classList.toggle("overflow-roll");
  this.scrollIntoView();
  this.parentElement.parentElement.scrollIntoView();

  this.parentElement.scrollIntoView();
  this.scrollIntoView();
  console.log(this.parentElement);
  this.parentElement.scroll(0, 0);
}
function checkForData() {
  if (!backend.getItem("users")) {
    backend.setItem("users"), JSON.stringify([]);
  }
  if (!backend.getItem("tasks")) {
    backend.setItem("tasks", JSON.stringify([]));
  }
  if (!backend.getItem("renderOrder")) {
    backend.setItem("renderOrder", JSON.stringify([]));
  }
}
