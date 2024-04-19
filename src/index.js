import './style.css'
import newTodo from './components/newTodo'
import todoListHeader from './components/header'
import sideBar from './components/sideBar'

import { isToday, isThisWeek, parseISO } from 'date-fns'

const content = document.querySelector('.content')

todoListHeader()
sideBar()

const test = document.createElement('h1')
test.textContent = 'This is a test'
content.appendChild(test)

const btn = document.createElement('button')
btn.textContent = 'Click me'
btn.className = 'btn'
content.appendChild(btn)

const main = document.createElement('main')
main.classList.add('main')
content.appendChild(main)

newTodo()
;(function setupModal() {
  var modal = document.querySelector('.modal')
  var btn = document.querySelector('.btn')
  var span = document.getElementsByClassName('close')[0]
  btn.onclick = function () {
    modal.style.display = 'block'
  }
  span.onclick = function () {
    modal.style.display = 'none'
  }
  window.onclick = function (event) {
    if (event.target === modal) {
      modal.style.display = 'none'
    }
  }
})()

const sideBarContainer = document.querySelector('.side-bar')
const sideBarDivs = sideBarContainer.querySelectorAll('div')

const allTodos = document.querySelector('.allTodosBar')
allTodos.setAttribute('id', 'active')
let currentSection = document.querySelector('#active')
currentSection = currentSection.className.split(' ')[0]

// create objects for each todo bar section
sideBarDivs.forEach((div) => {
  div.addEventListener('click', () => {
    const activeDiv = document.getElementById('active')
    if (div !== activeDiv) {
      div.id = 'active'
      currentSection = div.className.split(' ')[0] // Use only the first class
      activeDiv.removeAttribute('id')
    }
    div.id = 'active'
    currentSection = div.className.split(' ')[0] // Use only the first class
    displayTodo()
  })
})

let todoContainers = {}
sideBarDivs.forEach((div) => {
  const className = div.className.split(' ')[0] // took only the first class name
  todoContainers[className] = []
})
function LoadTodos() {
  const storedTodoContainers = JSON.parse(
    localStorage.getItem('todoContainers')
  )
  if (storedTodoContainers !== null) {
    todoContainers = {
      ...todoContainers, // Stay with the default values to maintain todos sections
      ...storedTodoContainers, // Add the stored values
    }
  }
}
LoadTodos()

console.log(todoContainers)

// button add todo
const dueDateInput = document.querySelector('#due-date-input')
const titleInput = document.querySelector('#title-input')
const descriptionInput = document.querySelector('#description-input')
const importantRadio = document.querySelector('.important')

class todoClass {
  constructor(tittle, description, dueDate, important, isCompleted) {
    this.tittle = tittle
    this.description = description
    this.dueDate = dueDate
    this.important = important
    this.isCompleted = isCompleted
  }
}

function createTodo() {
  const todo = new todoClass(
    titleInput.value,
    descriptionInput.value,
    dueDateInput.value,
    importantRadio.checked,
    false
  )
  todo.id = Date.now() // unique ID

  // Only add the todo to a custom sections when it's active
  if (
    document.querySelector('#active').className.split(' ')[0] !==
      'importantBar' &&
    document.querySelector('#active').className.split(' ')[0] !==
      'allTodosBar' &&
    document.querySelector('#active').className.split(' ')[0] !== 'todayBar' &&
    document.querySelector('#active').className.split(' ')[0] !== 'thisWeekBar'
  ) {
    todoContainers[currentSection].push(todo)
  }

  // Verify if the todo is important, today or this week
  const dueDate = parseISO(todo.dueDate)
  if (isToday(dueDate)) {
    todoContainers.todayBar.push(todo)
  }
  if (isThisWeek(dueDate)) {
    todoContainers.thisWeekBar.push(todo)
  }
  if (todo.important) {
    todoContainers.importantBar.push(todo)
  }

  todoContainers.allTodosBar.push(todo)

  localStorage.setItem('todoContainers', JSON.stringify(todoContainers))

  displayTodo()
  titleInput.value = ''
  descriptionInput.value = ''
  dueDateInput.value = ''
  importantRadio.checked = false
}

const button = document.querySelector('.submit-form')
button.addEventListener('click', function (event) {
  event.preventDefault()
  createTodo()
})
// ------------------------------

function displayTodo() {
  main.innerHTML = ''
  console.log(todoContainers[currentSection])
  if (todoContainers[currentSection]) {
    todoContainers[currentSection].forEach((todo, index) => {
      console.log(todo)
      const newTodo = document.createElement('div')
      newTodo.className = `${todo.tittle}-${index}`

      const todoTitle = document.createElement('h2')
      todoTitle.textContent = todo.tittle

      if (todo.important) {
        const important = document.createElement('i')
        important.classList.add('fas', 'fa-star')
        todoTitle.appendChild(important)
      }

      const todoDescription = document.createElement('h3')
      todoDescription.textContent = todo.description

      const todoDueDate = document.createElement('p')
      todoDueDate.textContent = `Due Date: ${todo.dueDate}`

      const todoButton = document.createElement('button')
      todoButton.textContent = 'Delete'
      todoButton.addEventListener('click', () => deleteTodo(todo.id))

      newTodo.appendChild(todoTitle)
      newTodo.appendChild(todoDescription)
      newTodo.appendChild(todoDueDate)
      newTodo.appendChild(todoButton)

      main.appendChild(newTodo)
    })
  }
}

displayTodo()

function deleteTodo(id) {
  // Loop over all arrays in todoContainers
  for (let key in todoContainers) {
    // Filter out the todo with the specified ID
    todoContainers[key] = todoContainers[key].filter((todo) => todo.id !== id)
  }

  localStorage.setItem('todoContainers', JSON.stringify(todoContainers))
  displayTodo()
}
