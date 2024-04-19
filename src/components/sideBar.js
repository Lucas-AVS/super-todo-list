import '../styles/sideBar.css'
import '@fortawesome/fontawesome-free/js/fontawesome'
import '@fortawesome/fontawesome-free/js/solid'
import '@fortawesome/fontawesome-free/js/regular'
import '@fortawesome/fontawesome-free/js/brands'

export default function sideBar() {
  const content = document.querySelector('.content')
  const mainDiv = document.createElement('div')
  mainDiv.classList.add('side-bar')

  function createElements(iconClasses, text) {
    const div = document.createElement('div')
    div.classList.add(`${text}Bar`, 'projectBar')
    const i = document.createElement('i')
    i.classList.add(...iconClasses)
    div.appendChild(i)
    const t = document.createTextNode(text)
    div.appendChild(t)
    mainDiv.appendChild(div)
  }

  createElements(['fas', 'fa-star'], 'important')
  createElements(['far', 'fa-calendar-alt'], 'today')
  createElements(['far', 'fa-calendar-check'], 'thisWeek')
  createElements(['fas', 'fa-tasks'], 'allTodos')
  createElements(['fas', 'fa-check-circle'], 'completed')

  // New Project
  const newProjectDiv = document.createElement('div')
  newProjectDiv.classList.add('newProjectBar')
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
  mainDiv.appendChild(newProjectDiv)

  // Load custom projects from localsotrage
  let customProjects = JSON.parse(localStorage.getItem('customProjects')) || []
  customProjects.forEach((project) => {
    createElements(['fas', 'fa-folder'], project)
  })

  function createProject(inputValue) {
    customProjects.push(inputValue)
    localStorage.setItem('customProjects', JSON.stringify(customProjects))
    createElements(['fas', 'fa-folder'], inputValue)
  }
  createButton.addEventListener('click', () =>
    createProject(newProjectInput.value)
  )

  // Append all the divs to the main div

  content.appendChild(mainDiv)
}
