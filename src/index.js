import "./style.css";
import newTodo from "./components/newTodo";

const content = document.querySelector(".content");

const test = document.createElement("h1");
test.textContent = "This is a test";
content.appendChild(test);

const btn = document.createElement("button");
btn.textContent = "Click me";
btn.className = "btn";
content.appendChild(btn);

newTodo();
(function setupModal() {
  var modal = document.querySelector(".modal");
  var btn = document.querySelector(".btn");
  var span = document.getElementsByClassName("close")[0];
  btn.onclick = function () {
    modal.style.display = "block";
  };
  span.onclick = function () {
    modal.style.display = "none";
  };
  window.onclick = function (event) {
    if (event.target == modal) {
      modal.style.display = "none";
    }
  };
})();

const todoContainer = document.createElement("div");
todoContainer.className = "todo-container";
content.appendChild(todoContainer);

let todoList = [];
function initialTodo() {
  const storedTodoList = JSON.parse(localStorage.getItem("todoList"));
  todoList = storedTodoList == null ? [] : storedTodoList;
  console.log(todoList);
}
initialTodo();

// button add todo
const dueDateInput = document.querySelector("#due-date-input");
const titleInput = document.querySelector("#title-input");
const descriptionInput = document.querySelector("#description-input");

class todoClass {
  constructor(tittle, description, dueDate) {
    this.tittle = tittle;
    this.description = description;
    this.dueDate = dueDate;
  }
}

function createTodo() {
  const todo = new todoClass(
    titleInput.value,
    descriptionInput.value,
    dueDateInput.value
  );

  todoList.push(todo);
  localStorage.setItem("todoList", JSON.stringify(todoList));

  displayTodo();
  titleInput.value = "";
  descriptionInput.value = "";
  dueDateInput.value = "";
}

const button = document.querySelector(".submit-form");
button.addEventListener("click", createTodo);
// ------------------------------

function displayTodo() {
  while (todoContainer.firstChild) {
    todoContainer.removeChild(todoContainer.firstChild);
  }
  todoList.forEach((todo, index) => {
    const newTodo = document.createElement("div");
    newTodo.className = `todo-${index}`;

    const todoTitle = document.createElement("h2");
    todoTitle.textContent = todo.tittle;

    const todoDescription = document.createElement("p");
    todoDescription.textContent = todo.description;

    const todoButton = document.createElement("button");
    todoButton.textContent = "Delete";
    todoButton.id = `todo-${index}`;
    todoButton.addEventListener("click", () => deleteTodo(index));

    newTodo.appendChild(todoTitle);
    newTodo.appendChild(todoDescription);
    newTodo.appendChild(todoButton);
    todoContainer.appendChild(newTodo);
  });
}

displayTodo();

function deleteTodo(index) {
  const newTodoList = todoList.filter((_, todoIndex) => todoIndex !== index);
  todoList = newTodoList;
  localStorage.setItem("todoList", JSON.stringify(todoList));
  displayTodo();
}
