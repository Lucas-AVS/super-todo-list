import './style.css'
import newTodo from './components/newTodo'
import todoListHeader from './components/header'
import sideBar from './components/sideBar'

import { isToday, isThisWeek } from 'date-fns'

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

sideBarDivs.forEach((div) => {
  const todoContainer = document.createElement('div')
  todoContainer.className = div.className

  // set current todo section
  div.addEventListener('click', () => {
    const activeDiv = document.getElementById('active')
    if (activeDiv) {
      activeDiv.removeAttribute('id')
      content.removeChild(
        document.querySelector(`.${currentSection.className}`)
      )
    }
    div.id = 'active'
    currentSection = div.className
  })
})

const allTodos = document.querySelector('.allTodosBar')
allTodos.setAttribute('id', 'active')

let currentSection = document.querySelector('#active')
currentSection = currentSection.className
content.appendChild(document.querySelector(`.${currentSection}`))

// initialize todoList and retrieve previous todoList from local storage
let todoList = []
function LoadTodos() {
  const storedTodoList = JSON.parse(localStorage.getItem('todoList'))
  todoList = storedTodoList === null ? [] : storedTodoList
}
LoadTodos()

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

  todoList.push(todo)
  localStorage.setItem('todoList', JSON.stringify(todoList))

  displayTodo()
  titleInput.value = ''
  descriptionInput.value = ''
  dueDateInput.value = ''
  importantRadio.checked = false
}

const button = document.querySelector('.submit-form')
button.addEventListener('click', createTodo)
// ------------------------------

function displayTodo() {
  while (currentSection.firstChild) {
    currentSection.removeChild(currentSection.firstChild)
  }
  todoList.forEach((todo, index) => {
    const newTodo = document.createElement('div')
    newTodo.className = `todo-${index}`

    const todoTitle = document.createElement('h2')
    todoTitle.textContent = todo.tittle

    const todoDescription = document.createElement('p')
    todoDescription.textContent = todo.description

    const todoDueDate = document.createElement('p')
    const dueDate = new Date(todo.dueDate)

    // Check date
    if (isToday(dueDate)) {
      todoDueDate.textContent = 'Today'
    } else if (isThisWeek(dueDate)) {
      todoDueDate.textContent = 'This Week'
    } else {
      todoDueDate.textContent = todo.dueDate
    }

    const important = document.createElement('i')
    important.className = 'fas fa-star'

    const todoButton = document.createElement('button')
    todoButton.textContent = 'Delete'
    todoButton.id = `todo-${index}`
    todoButton.addEventListener('click', () => deleteTodo(index))

    todo.important ? newTodo.appendChild(important) : null
    newTodo.appendChild(todoTitle)
    newTodo.appendChild(todoDescription)
    newTodo.appendChild(todoButton)

    todo.important
      ? document.querySelector('.importantBar').appendChild(newTodo)
      : null
    todo.dueDate === 'today'
      ? document.querySelector('.todayBar').appendChild(newTodo)
      : null
    todo.dueDate === 'thisWeek'
      ? document.querySelector('.thisWeekBar').appendChild(newTodo)
      : null
    allTodos.appendChild(newTodo)

    content.appendChild(document.querySelector(`.${currentSection.className}`))
  })
}

displayTodo()

function deleteTodo(index) {
  const newTodoList = todoList.filter((_, todoIndex) => todoIndex !== index)
  todoList = newTodoList
  localStorage.setItem('todoList', JSON.stringify(todoList))
  displayTodo()
}
