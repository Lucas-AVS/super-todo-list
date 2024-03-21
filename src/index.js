import "./style.css";

const content = document.querySelector(".content");

const test = document.createElement("h1");
test.textContent = "This is a test";

content.appendChild(test);

const todo = document.createElement("form");

const titleInput = document.createElement("input");
const titleLabel = document.createElement("label");
titleInput.id = "title-input";
titleLabel.for = "title-input";
titleLabel.textContent = "Todo name";

const descriptionInput = document.createElement("input");
const descriptionLabel = document.createElement("label");
descriptionInput.id = "description-input";
descriptionLabel.for = "description--input";
descriptionLabel.textContent = "Todo description";

const dueDateInput = document.createElement("input");
const dueDateLabel = document.createElement("label");
dueDateInput.id = "due-date-input";
dueDateLabel.for = "due-date-input";
dueDateLabel.textContent = "Todo due date";

const checkMarkerInput = document.createElement("input");
checkMarkerInput.type = "radio";
const checkMarkerLabel = document.createElement("label");

const todoContainer = document.createElement("div");
todoContainer.className = "todo-container";

todo.appendChild(titleInput);
todo.appendChild(titleLabel);

todo.appendChild(descriptionInput);
todo.appendChild(descriptionLabel);

todo.appendChild(dueDateInput);
todo.appendChild(dueDateLabel);

todo.appendChild(checkMarkerInput);
todo.appendChild(checkMarkerLabel);

todo.appendChild(todoContainer);

content.appendChild(todo);

const button = document.createElement("button");
button.type = "submit";
button.className = "submit-form";
button.textContent = "New todo";
button.addEventListener("click", createTodo);

content.appendChild(button);

class todoClass {
  constructor(tittle, description, dueDate) {
    this.tittle = tittle;
    this.description = description;
    this.dueDate = dueDate;
  }
}

let todoList = [];
function initialTodo() {
  const storedTodoList = JSON.parse(localStorage.getItem("todoList"));
  todoList = storedTodoList == null ? [] : storedTodoList;
  console.log(todoList);
}
initialTodo();

displayTodo();

function createTodo() {
  const todo = new todoClass(titleInput.value, descriptionInput.value, "10/09");

  todoList.push(todo);
  localStorage.setItem("todoList", JSON.stringify(todoList));

  displayTodo();
  titleInput.value = "";
  descriptionInput.value = "";
}

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

function deleteTodo(index) {
  const newTodoList = todoList.filter((_, todoIndex) => todoIndex !== index);
  todoList = newTodoList;
  localStorage.setItem("todoList", JSON.stringify(todoList));
  displayTodo();
}
