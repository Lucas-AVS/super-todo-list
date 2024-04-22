import './style.css'
import newTodo from './components/newTodo'
import todoListHeader from './components/header'
import sideBar from './components/sideBar'

import { isToday, isThisWeek, parseISO } from 'date-fns'

const content = document.querySelector('.content')

todoListHeader()

const main = document.createElement('main')
main.classList.add('main')
content.appendChild(main)

sideBar()

const todoColumn = document.createElement('div')
todoColumn.classList.add('todo-column')
main.appendChild(todoColumn)

const displayModal = document.createElement('div')
displayModal.classList.add('display-modal')
const displayModalButton = document.createElement('button')
displayModalButton.className = 'display-modal-button'
displayModalButton.textContent = 'New Todo'
displayModal.appendChild(displayModalButton)

todoColumn.appendChild(displayModal)

const todoContainer = document.createElement('div')
todoContainer.classList.add('todo-container')
todoColumn.appendChild(todoContainer)

newTodo()
;(function setupModal() {
  var modal = document.querySelector('.modal')
  var displayModalButton = document.querySelector('.display-modal-button')
  var span = document.getElementsByClassName('close')[0]
  displayModalButton.onclick = function () {
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

let todoList = {}
sideBarDivs.forEach((div) => {
  const className = div.className.split(' ')[0] // took only the first class name
  todoList[className] = []
})
function LoadTodos() {
  const storedtodoList = JSON.parse(localStorage.getItem('todoList'))
  if (storedtodoList !== null) {
    todoList = {
      ...todoList, // Stay with the default values to maintain todos sections
      ...storedtodoList, // Add the stored values
    }
  }
}
LoadTodos()

console.log(todoList)

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

  if (todo.tittle === '' || todo.description === '' || todo.dueDate === '') {
    alert('Please fill all the fields')
    return
  }

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
    todoList[currentSection].push(todo)
  }

  // Verify if the todo is important, today or this week
  const dueDate = parseISO(todo.dueDate)
  if (isToday(dueDate)) {
    todoList.todayBar.push(todo)
  }
  if (isThisWeek(dueDate)) {
    todoList.thisWeekBar.push(todo)
  }
  if (todo.important) {
    todoList.importantBar.push(todo)
  }

  todoList.allTodosBar.push(todo)
  // Sort the todos by due date
  for (let key in todoList) {
    todoList[key].sort((a, b) => new Date(a.dueDate) - new Date(b.dueDate))
  }
  localStorage.setItem('todoList', JSON.stringify(todoList))

  displayTodo()
  titleInput.value = ''
  descriptionInput.value = ''
  dueDateInput.value = ''
  importantRadio.checked = false

  //close modal
  let modal = document.querySelector('.modal')
  modal.style.display = 'none'
}

const button = document.querySelector('.submit-form')
button.addEventListener('click', function (event) {
  event.preventDefault()
  createTodo()
})
// ------------------------------
const sideBarDiv = document.querySelector('.side-bar')
function adjustSidebarHeight() {
  sideBarDiv.style.height = '120vh' // set the sidebar height to match the content element height
}

function displayTodo() {
  todoContainer.innerHTML = ''
  console.log(todoList[currentSection])
  if (todoList[currentSection]) {
    todoList[currentSection].forEach((todo, index) => {
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

      todoContainer.appendChild(newTodo)
    })
  }
  adjustSidebarHeight()
}

displayTodo()

function deleteTodo(id) {
  // Loop over all arrays in todoList
  for (let key in todoList) {
    // Filter out the todo with the specified ID
    todoList[key] = todoList[key].filter((todo) => todo.id !== id)
  }

  localStorage.setItem('todoList', JSON.stringify(todoList))
  displayTodo()
}
