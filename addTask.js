let tasks = [];
let title;
let date;
let description;
let category;
let urgency;
let counter;
let id;

async function addTask(e) {
  title = document.getElementById("title").value;
  date = document.getElementById("date").value;
  description = document.getElementById("description").value;
  category = document.getElementById("category").value;
  urgency = document.getElementById("urgency").value;
  let boardColumn = "to-do";
  id = counter;
  let time = new Date().getTime();
  let createdAt = new Date(time).toLocaleString();
  console.log(createdAt);
  e.preventDefault();

  tasks.push({
    title,
    date,
    description,
    category,
    urgency,
    date,
    createdAt,
    id,
    boardColumn,
  });
  console.log(tasks);
  await backend.setItem("tasks", tasks);
  counter++;
  await backend.setItem("counter", counter);
  window.location.href = "./index.html";
  clearInput();
}

function clearInput() {
  title = document.getElementById("title");
  date = document.getElementById("date");
  description = document.getElementById("description");
  category = document.getElementById("category");
  urgency = document.getElementById("urgency");
  title.value = ``;
  date.value = ``;
  description.value = ``;
  category.value = ``;
  urgency.value = ``;
}

async function init() {
  await downloadFromServer();
  counter = backend.getItem("counter") || 1;
  tasks = backend.getItem("tasks") || [];
}

function deleteTask() {
  backend.deleteItem("tasks");
}