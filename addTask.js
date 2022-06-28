let users = [];
let title;
console.log(jsonFromServer);
let date;
let description;
let catergory;
let urgency;

function addUser(e) {
  title = document.getElementById("title").value;
  date = document.getElementById("date").value;
  description = document.getElementById("description").value;
  catergory = document.getElementById("category").value;
  urgency = document.getElementById("urgency").value;
  e.preventDefault();
  users.push({ title, date, description, catergory, urgency });
  backend.setItem('users', JSON.stringify(users));
  clearInput()

}


function clearInput() {
  title = document.getElementById("title");
  date = document.getElementById("date");
  description = document.getElementById("description");
  catergory = document.getElementById("category");
  urgency = document.getElementById("urgency");
  title.value = ``;
  date.value = ``;
  description.value = ``;
  catergory.value = ``;
  urgency.value = ``;
}

async function init() {
  await downloadFromServer();
  users = JSON.parse(backend.getItem('users')) || [];
}

function deleteUser(name) {
  backend.deleteItem('users');
}


// let title;
// console.log(jsonFromServer);
// let date;
// let description;
// let catergory;
// let urgency;
// let createButton = document.getElementById("create");
// let resetButton = document.getElementById("cancel");
// resetButton.addEventListener("click", resetFor);
// let allInputElements = Array.from(document.querySelectorAll("[type]"))
//   .concat(Array.from(document.querySelectorAll("textarea")))
//   .concat(Array.from(document.querySelectorAll("select")));
// resetFor();
// function getCounter() {
//   if (
//     backend.getItem("counter") === null ||
//     backend.getItem("counter") === "undefined"
//   ) {
//     return 0;
//   } else {
//     return backend.getItem("counter");
//   }
// }
// function inputToObject() {
//   let counter = getCounter();
//   title = document.getElementById("title").value;
//   date = document.getElementById("date").value;
//   description = document.getElementById("description").value;
//   catergory = document.getElementById("category").value;
//   urgency = document.getElementById("urgency").value;

//   console.log("läuft", counter);
//   let task = {
//     title: title,
//     date: date,
//     description: description,
//     catergory: catergory,
//     urgency: urgency,
//     id: counter,
//     createdAt: new Date().getTime(),
//     catergory: "to-do",
//   };
//   console.log(task, counter);

//   backend.setItem(`task${counter}`, task);
//   console.log(backend.getItem(`task${counter}`));
//   counter++;
//   backend.deleteItem("counter");
//   backend.setItem("counter", counter);
//   resetFor();
//   console.log("ende");
// }

// // function reset() {

// //     allInputElements.forEach((elem) => (elem.value = null));
// // }

// function resetFor() {
//   for (i = 0; i < allInputElements.length - 1; i++) {
//     allInputElements[i].value = null;
//     allInputElements[i].required = "true";
//   }
// }
// async function init() {
//   await downloadFromServer();
//   document.querySelector("form").addEventListener("submit", (ev) => {
//     ev.preventDefault();
//     // inputToObject();
//     window.location.href = "./index.html";
//   });
// }