import "../styles/newTodo.css";

export default function newTodo() {
  const content = document.querySelector(".content");

  const todo = document.createElement("form");
  todo.className = "todo-form";

  function createInputAndLabel(id, text) {
    const input = document.createElement("input");
    const label = document.createElement("label");
    input.id = id;
    label.htmlFor = id;
    label.textContent = text;
    return [input, label];
  }

  const [titleInput, titleLabel] = createInputAndLabel(
    "title-input",
    "Todo name"
  );
  const [dueDateInput, dueDateLabel] = createInputAndLabel(
    "due-date-input",
    "Todo due date"
  );

  const descriptionInput = document.createElement("textarea");
  descriptionInput.id = "description-input";
  const descriptionLabel = document.createElement("label");
  descriptionLabel.htmlFor = "description-input";
  descriptionLabel.textContent = "Todo description";

  titleInput.required = true;
  descriptionInput.required = true;
  dueDateInput.required = true;

  titleInput.placeholder = "Enter the name of the todo";
  descriptionInput.placeholder = "Enter the description of the todo";
  dueDateInput.placeholder = "Enter the due date of the todo";

  const checkMarkerInput = document.createElement("input");
  checkMarkerInput.type = "radio";
  checkMarkerInput.className = "is-completed";
  const checkMarkerLabel = document.createElement("label");

  const importantMarkerInput = document.createElement("input");
  importantMarkerInput.type = "radio";
  importantMarkerInput.className = "important";

  const todoContainer = document.createElement("div");
  todoContainer.className = "todo-container";

  todo.appendChild(titleLabel);
  todo.appendChild(titleInput);

  todo.appendChild(descriptionLabel);
  todo.appendChild(descriptionInput);

  todo.appendChild(dueDateLabel);
  todo.appendChild(dueDateInput);

  todo.appendChild(checkMarkerInput);
  todo.appendChild(checkMarkerLabel);
  todo.appendChild(importantMarkerInput);

  const button = document.createElement("button");
  button.type = "submit";
  button.className = "submit-form";
  button.textContent = "New todo";

  todo.appendChild(button);
  content.appendChild(todo);
  content.appendChild(todoContainer);
}
