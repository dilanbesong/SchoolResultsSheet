const searchInput = document.querySelector('input[type="search"]')
const userName = document.querySelector('[data-username]')
const getMatricNumber = sessionStorage.getItem('matricNumber')
const scoreTemplate = document.querySelector('[data-Scoretemplate]')
const tableBody = document.querySelector('tbody')
const displayScores = getData(`/admin/myResults/${getMatricNumber}`)
const getUser = getData(`/user/${getMatricNumber}`)

getUser.then( user => {
userName.textContent = user.username
searchInput.setAttribute('placeholder', `find -${user.matricNumber}- result`)
let newScores = []

searchInput.addEventListener('input', (e) => {
    const value = e.target.value.toLowerCase()
    newScores.forEach( score => {
      const { regNumber, name, grade, card, date } = score
      const IsVisible = regNumber.toLowerCase().includes(value) || name.toLowerCase().includes(value) || grade.toLowerCase().includes(grade) || date.includes(value)
      card.classList.toggle('hide', !IsVisible) 
    })
})

displayScores.then( scores => {
   newScores = scores.map( score => {
      const {  examScore, continousAccessment, practicalScore, grade, createdAt } = score
      const card = scoreTemplate.content.cloneNode(true).children[0]
      const username = card.querySelector('.name')
      const matricNumber = card.querySelector('[data-regNum]')
      const practicalScor = card.querySelector('[data-practo]')
      const examScor = card.querySelector('[data-exam]')
      const continousAccessmen = card.querySelector('[data-ca]')
      const gradeScore = card.querySelector('[data-grade]')
      const releaseDate = card.querySelector('[data-date]')
      username.textContent = user.username
      matricNumber.textContent = getMatricNumber
      practicalScor.textContent = practicalScore
      examScor.textContent = examScore
      continousAccessmen.textContent = continousAccessment
      gradeScore.textContent = grade
      releaseDate.textContent = new Date(createdAt).toDateString()
      tableBody.append(card)
      return { card, regNumber:user.matricNumber, name:user.username, grade, date:createdAt }
  })
})

})