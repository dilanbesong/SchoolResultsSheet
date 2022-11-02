const FormScore = document.querySelector('.createFormScore')
const addScoreBtn = FormScore.querySelector('[data-addScore]')
const clearInputBtn = FormScore.querySelector('[ data-clear]')
const regNumberInput = FormScore.querySelector('#regNumberInput')
const scoreTemplate = document.querySelector('[data-Scoretemplate]')
const tableBody = document.querySelector('tbody')
const searchInput = document.querySelector('input[type="search"]')
const displayScores = getData('/admin/getScores')
const studentScores = document.querySelectorAll('[data-studentScores]')

clearInputBtn.addEventListener('click', (e) => {
   e.preventDefault()
   const allScoreInput = document.querySelectorAll('[data-input]')
   allScoreInput.forEach( input => {
      input.value = ''
   })
})



function editFn(editBtn) { 
   editBtn.addEventListener('click', () => {
       FormScore.setAttribute('action', '/admin/updateRecord')
       FormScore.setAttribute('method', 'post')
       addScoreBtn.setAttribute('type', 'submit')
       regNumberInput.setAttribute('readonly', true)
       FormScore.style.display = 'block'
       const tableDataRows = editBtn.parentNode.children
         
       for(let i = 0; i <= 4; i++) {
           document.querySelectorAll('input[type="text"]')[i].value = tableDataRows[ i + 1].textContent
       }
       
   }) 
}

function deleteFn(deleteBtn, resultId){ 
   deleteBtn.addEventListener('click', () => {
      const confirmDelete = confirm('Are you sure you want to delete this item ?')
      if(confirmDelete) {
         const studentRegNumber = deleteBtn.id
        getData(`/admin//deleteRecord/${resultId}/${studentRegNumber}`).then(res => {
           const studentRecord = deleteBtn.parentNode
           tableBody.removeChild(studentRecord)
        }).catch( err => alert(`This item couldnot be deleted because ${err.message}`))
      }
   })
}


let newScores = []

searchInput.addEventListener('input', (e) => {
    const value = e.target.value.toLowerCase()
    newScores.forEach( score => {
      const { regNumber, name, grade, card } = score
      const IsVisible = regNumber.toLowerCase().includes(value) || name.toLowerCase().includes(value) || grade.toLowerCase().includes(grade)
      card.classList.toggle('hide', !IsVisible) 
    })
})

displayScores.then( scores => {
   newScores = scores.map( score => {
      const { _id, name,  regNumber, examScore, continousAccessment, practicalScore, grade} = score
      const card = scoreTemplate.content.cloneNode(true).children[0]
      const username = card.querySelector('.name')
      const matricNumber = card.querySelector('[data-regNum]')
      const practicalScor = card.querySelector('[data-practo]')
      const examScor = card.querySelector('[data-exam]')
      const continousAccessmen = card.querySelector('[data-ca]')
      const gradeScore = card.querySelector('[data-grade]')
      const editButton = card.querySelector('[data-pencilSquare]')
      const deleteButton = card.querySelector('[data-delete]')
      username.textContent = name
      matricNumber.textContent = regNumber
      deleteButton.id = regNumber
      practicalScor.textContent = practicalScore
      examScor.textContent = examScore
      continousAccessmen.textContent = continousAccessment
      gradeScore.textContent = grade
      tableBody.append(card)
      editFn(editButton)
      deleteFn(deleteButton, _id)
      return { card, regNumber, name, grade }
  })
})

