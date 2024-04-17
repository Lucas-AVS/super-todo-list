import '../styles/sideBar.css'
import '@fortawesome/fontawesome-free/js/fontawesome'
import '@fortawesome/fontawesome-free/js/solid'
import '@fortawesome/fontawesome-free/js/regular'
import '@fortawesome/fontawesome-free/js/brands'

export default function sideBar() {
  const content = document.querySelector('.content')
  const mainDiv = document.createElement('div')
  mainDiv.classList.add('side-bar')

  const importantDiv = document.createElement('div')
  importantDiv.classList.add('important-bar')
  const importantIcon = document.createElement('i')
  importantIcon.classList.add('fas', 'fa-star')
  importantDiv.appendChild(importantIcon)
  const importantText = document.createTextNode('Important')
  importantDiv.appendChild(importantText)

  const todayDiv = document.createElement('div')
  todayDiv.classList.add('today-bar')
  const todayIcon = document.createElement('i')
  todayIcon.classList.add('far', 'fa-calendar-alt')
  todayDiv.appendChild(todayIcon)
  const todayText = document.createTextNode('Today')
  todayDiv.appendChild(todayText)

  const weekDiv = document.createElement('div')
  weekDiv.classList.add('week-bar')
  const weekIcon = document.createElement('i')
  weekIcon.classList.add('far', 'fa-calendar-check')
  weekDiv.appendChild(weekIcon)
  const weekText = document.createTextNode('This Week')
  weekDiv.appendChild(weekText)

  const completedDiv = document.createElement('div')
  completedDiv.classList.add('completed-bar')
  const completedIcon = document.createElement('i')
  completedIcon.classList.add('fas', 'fa-check-circle')
  completedDiv.appendChild(completedIcon)
  const completeText = document.createTextNode('Completed')
  completedDiv.appendChild(completeText)

  // New Project
  const newProjectDiv = document.createElement('div')
  newProjectDiv.classList.add('new-project-bar')
  const newProjectIcon = document.createElement('i')
  newProjectIcon.classList.add('fas', 'fa-folder-plus')
  newProjectDiv.appendChild(newProjectIcon)
  const newProjectInput = document.createElement('input')
  newProjectInput.setAttribute('type', 'text')
  newProjectInput.setAttribute('placeholder', 'New Project')
  newProjectDiv.appendChild(newProjectInput)
  const createButton = document.createElement('button')
  createButton.classList.add('create-button')
  createButton.textContent = 'Create'
  newProjectDiv.appendChild(createButton)

  function createProject(inputValue) {
    const newProject = document.createElement('div')
    newProject.classList.add(`${inputValue}-bar`, 'project-bar')
    const newProjectIcon = document.createElement('i')
    newProjectIcon.classList.add('fas', 'fa-folder')
    newProject.appendChild(newProjectIcon)
    const newProjectText = document.createTextNode(inputValue)
    newProject.appendChild(newProjectText)
    mainDiv.appendChild(newProject)
  }
  createButton.addEventListener('click', () =>
    createProject(newProjectInput.value)
  )

  // Append all the divs to the main div
  mainDiv.appendChild(importantDiv)
  mainDiv.appendChild(todayDiv)
  mainDiv.appendChild(weekDiv)
  mainDiv.appendChild(completedDiv)
  mainDiv.appendChild(newProjectDiv)

  content.appendChild(mainDiv)
}
