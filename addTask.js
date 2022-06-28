let title;
console.log(jsonFromServer);
let date;
let description;
let catergory;
let urgency;
let createButton = document.getElementById("create");
let resetButton = document.getElementById("cancel");
resetButton.addEventListener("click", reset);
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
function inputToObject() {
  let counter = getCounter();
  title = document.getElementById("title").value;
  date = document.getElementById("date").value;
  description = document.getElementById("description").value;
  catergory = document.getElementById("category").value;
  urgency = document.getElementById("urgency").value;

  console.log(counter);
  let task = {
    title: title,
    date: date,
    description: description,
    catergory: catergory,
    urgency: urgency,
    id: counter,
  };

  backend.setItem(`task${counter}`, task);
  counter++;
  //   backend.deleteItem("counter");
  backend.setItem("counter", counter);
  reset();
}

function reset() {
  Array.from(document.querySelectorAll("[type]"))
    .concat(Array.from(document.querySelectorAll("textarea")))
    .concat(Array.from(document.querySelectorAll("select")))
    .forEach((elem) => (elem.value = null));
}
