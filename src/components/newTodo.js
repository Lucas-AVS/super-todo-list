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
    "Due date"
  );
  dueDateInput.type = "date";

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

  const dueDateDiv = document.createElement("div");
  dueDateDiv.className = "due-date";
  dueDateDiv.appendChild(dueDateLabel);
  dueDateDiv.appendChild(dueDateInput);

  const completeRadioDiv = document.createElement("div");
  completeRadioDiv.className = "complete-radio";

  const incompleteLabel = document.createElement("label");
  incompleteLabel.textContent = "Incomplete";
  const checkMarkerInput = document.createElement("input");
  checkMarkerInput.type = "radio";
  checkMarkerInput.className = "is-completed";
  completeRadioDiv.appendChild(incompleteLabel);
  completeRadioDiv.appendChild(checkMarkerInput);

  const importantDiv = document.createElement("div");
  importantDiv.className = "important-div";
  const importantLabel = document.createElement("label");
  importantLabel.textContent = "Important";
  const importantMarkerInput = document.createElement("input");
  importantMarkerInput.type = "radio";
  importantMarkerInput.className = "important";
  importantDiv.appendChild(importantLabel);
  importantDiv.appendChild(importantMarkerInput);

  const radioDiv = document.createElement("div");
  radioDiv.className = "radio-div";
  radioDiv.appendChild(completeRadioDiv);
  radioDiv.appendChild(importantDiv);

  const radioDateDiv = document.createElement("div");
  radioDateDiv.className = "radio-date";
  radioDateDiv.appendChild(dueDateDiv);
  radioDateDiv.appendChild(radioDiv);

  const close = document.createElement("span");
  close.className = "close";
  close.textContent = "×";

  todo.appendChild(close);

  todo.appendChild(titleLabel);
  todo.appendChild(titleInput);

  todo.appendChild(descriptionLabel);
  todo.appendChild(descriptionInput);

  todo.appendChild(radioDateDiv);

  const button = document.createElement("button");
  button.type = "submit";
  button.className = "submit-form";
  button.textContent = "New todo";

  todo.appendChild(button);

  const modal = document.createElement("div");
  modal.className = "modal";

  modal.appendChild(todo);
  content.appendChild(modal);
}
