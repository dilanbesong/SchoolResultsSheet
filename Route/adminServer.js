
const express = require('express')
const { Student, Score } = require('../Schema/model')
const bodyParser = require('body-parser')
const cors = require('cors')
const router = express.Router()
router.use(bodyParser.urlencoded({ extended:false})) 
router.use(bodyParser.json())
router.use(cors())

router.get('/getScores', async (req, res) => {
    const scores = await Score.find()
    const newScores = await Promise.all( scores.map( async(score) => {
       const { _id,  regNumber, examScore, continousAccessment, practicalScore, grade } = score
       const student = await Student.findOne({matricNumber:regNumber})
       return { _id, name:student.username,  regNumber, examScore, continousAccessment, practicalScore, grade }
    }))
    console.log(newScores);
    return res.send(newScores)
})

router.post('/addRecord', async (req, res) => {
    const { regNumber, examScore, continousAccessment, practicalScore } = req.body
    const student = await Student.findOne({matricNumber:regNumber})
    const hasScore = await Score.findOne({regNumber})
   if(student && !hasScore ){
      const grade = computeGrade(examScore, continousAccessment, practicalScore)
       const score = new Score({...req.body, grade})
       student.results.push(score._id)
       await student.save()
       await score.save()
   }else {
       res.send(`<div>
         <h3>Oops!!</h3>
         <p>It is either this person's score has been added or he has not registered on this plateform</p>
         <a href='/admin'> Click here to go back</a>
       </div>`)
   }
    

})


router.post('/updateRecord', async(req, res) => {
  const { regNumber, examScore, continousAccessment, practicalScore } = req.body
  const grade = computeGrade(examScore,continousAccessment, practicalScore)
  const newRecord = await Score.findOneAndUpdate({regNumber}, { examScore,continousAccessment, practicalScore, grade })
 
})

router.get('/deleteRecord/:resultId/:matricNumber', async(req, res) => {
   const { resultId, matricNumber } = req.params
   const deleteRecord = await Score.findOneAndDelete({regNumber:matricNumber})
   const student = await Student.findOne({matricNumber})
   const resultIndex = student.results.indexOf(resultId)
   student.results.splice(resultIndex, 1)
   await student.save()
   if(deleteRecord){
     return res.send({msg:'record deleted'})
   }
})



router.get('/myResults/:matricNumber', async(req, res) => {
  const { matricNumber } = req.params
   const student = await Student.findOne({matricNumber})
   const myResults = await Promise.all( student.results.map( async(resultId) => {
       const { examScore, continousAccessment, practicalScore, grade, createdAt } = await Score.findById(resultId)
       return { examScore, continousAccessment, practicalScore, grade, createdAt }
   }))

   return res.send(myResults)
})


function computeGrade(examScore, continousAccessment, practicalScore) {
  const finalScore = parseFloat(examScore) + parseFloat(continousAccessment) + parseFloat(practicalScore)
  let Grade
  if( finalScore >= 25 && finalScore <= 30 ) {
    Grade = 'A'
    return Grade
  }
  else if(finalScore < 25 && finalScore >= 20) {
    Grade = 'B'
    return Grade
  }

  else if(finalScore < 20 && finalScore >= 15 ) {
    Grade = 'C'
    return Grade
  }
  else if( finalScore < 15 && finalScore >= 10 ) {
    Grade = 'D'
    return Grade
  }
  else if( finalScore > 30 || finalScore < 0 ) {
     Grade = '--'
     return Grade
  }
  else {
    Grade = 'F'
    return Grade
  }
}

module.exports = router