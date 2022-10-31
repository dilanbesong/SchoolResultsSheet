const createFormScore = document.querySelector('.createFormScore')
const table = document.querySelector('table')
const faBars = document.querySelector('.fa-bars')
const sideBar = document.querySelector('aside')
const openModel = sideBar.querySelector('[data-openModel]')


faBars.addEventListener('click', () => {
   sideBar.classList.toggle('hideSideBar')
})


const modelClose = createFormScore.querySelector('.modelClose')

openModel.addEventListener('click', () => {
    createFormScore.style.display = 'block'
    createFormScore.querySelector('#regNumberInput').removeAttribute('readonly')
    
})
modelClose.addEventListener('click', () => {
    createFormScore.style.display = 'none'
    location.reload()
})

function OnDrag(e) {
    const getStyle = window.getComputedStyle(createFormScore)
    const left = parseInt( getStyle.left)
    const right = parseInt( getStyle.right)
    createFormScore.style.left = `${left + e.movementX }px`
    createFormScore.style.right = `${right + e.movementY }px`
   
}

 createFormScore.addEventListener('mousedown', () => {
    createFormScore.addEventListener('mousemove', OnDrag)
})

document.addEventListener('mouseup', () => {
    createFormScore.removeEventListener('mousemove', OnDrag)
})

const logoutButton = sideBar.querySelector('.fa-sign-out')
logoutButton.addEventListener('click', () => location.href = '/signIn')


