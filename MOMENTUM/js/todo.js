"use strict";

const toDoForm = document.getElementById("todo-form");
const toDoInput = document.querySelector("#todo-form input");
const toDoList = document.getElementById("todo-list");
const doneToDoList = document.querySelector("#done-todo-list");
let toDos = [];
let doneToDos = [];
const TODOS_KEY = "todos";
const DONETODOS_KEY = "donetodos";

function saveToDos() {
  localStorage.setItem(TODOS_KEY, JSON.stringify(toDos));
}
function saveDoneToDos() {
  localStorage.setItem(DONETODOS_KEY, JSON.stringify(doneToDos));
}
function paintToDo(newToDoObject) {
  const li = document.createElement("li");
  const mark = document.createElement("mark");
  li.id = newToDoObject.id;
  mark.innerText = newToDoObject.text;
  const button = document.createElement("button");
  button.innerText = "✔️";
  button.addEventListener("click", paintDoneToDo);
  li.appendChild(mark);
  li.appendChild(button);
  toDoList.appendChild(li);
}

function handleToDoSubmit(event) {
  event.preventDefault();
  const newToDo = toDoInput.value;
  toDoInput.value = "";
  const newToDoObject = { text: newToDo, id: Date.now() };
  toDos.push(newToDoObject);
  paintToDo(newToDoObject);
  saveToDos();
}

function paintDoneToDo(newDoneToDoObject) {
  const li = document.createElement("li");
  const mark = document.createElement("mark");
  li.id = newDoneToDoObject.path[1].id;
  mark.innerText = newDoneToDoObject.path[1].childNodes[0].innerText;
  const doneToDoObject = { text: mark.innerText, id: li.id };
  doneToDos.push(doneToDoObject);
  saveDoneToDos();
  const button = document.createElement("button");
  button.innerText = "🗑️";
  const doneLi = newDoneToDoObject.target.parentElement;
  doneLi.remove();
  toDos = toDos.filter((toDo) => toDo.id !== parseInt(doneLi.id));
  saveToDos();
  button.addEventListener("click", deleteToDo);
  li.appendChild(mark);
  li.appendChild(button);
  doneToDoList.appendChild(li);
}

function paintDoneToDoInit(newDoneToDoObject) {
  const li = document.createElement("li");
  const mark = document.createElement("mark");
  li.id = newDoneToDoObject.id;
  mark.innerText = newDoneToDoObject.text;
  const button = document.createElement("button");
  button.innerText = "🗑️";
  button.addEventListener("click", deleteToDo);
  li.appendChild(mark);
  li.appendChild(button);
  doneToDoList.appendChild(li);
}

function deleteToDo(event) {
  const li = event.target.parentElement;
  li.remove();
  doneToDos = doneToDos.filter((doneToDo) => doneToDo.id !== li.id);
  saveDoneToDos();
}

toDoForm.addEventListener("submit", handleToDoSubmit);

const savedToDos = localStorage.getItem(TODOS_KEY);
const savedDoneToDos = localStorage.getItem(DONETODOS_KEY);
if (savedToDos) {
  const parsedToDos = JSON.parse(savedToDos);
  toDos = parsedToDos;
  parsedToDos.forEach(paintToDo);
}
if (savedDoneToDos) {
  const parsedDoneToDos = JSON.parse(savedDoneToDos);
  doneToDos = parsedDoneToDos;
  parsedDoneToDos.forEach(paintDoneToDoInit);
}
