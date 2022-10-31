
const express = require('express')
const mongoose = require('mongoose')
const path = require('path')
const cors = require('cors')
const crypto = require('crypto')
const { Student, Score } = require('./Schema/model')
const adminServer  = require('./Route/adminServer')
require('dotenv').config()
const _path = path.join(__dirname, 'public')
const app = express()
app.use(express.static(_path))
app.use(express.json())
app.use('/admin', adminServer)
app.use(cors())
mongoose.connect(process.env.MONGO_URI)


app.get('/signIn', (req, res) => {  
  res.sendFile(_path + '/signUp.html')
})

app.get('/home', (req, res) => {  
  res.sendFile(_path + '/user.html')
})

app.get('/admin', (req, res) => {
  res.sendFile(_path + '/admin.html')
})

app.post('/admin', (req, res) => {
  const { adminPassword, adminEmail } = req.body
  if(adminPassword === process.env.ADMINPASSWORD && adminEmail === process.env.ADMINEMAIL){
     res.redirect('/admin')
  }
})

app.get('/user/:matricNumber', async( req, res) => {
   const { matricNumber } = req.params
   const user = await Student.findOne({matricNumber})
   return res.send(user)
})

app.get('/results/:matricNumber', async(req, res) => {
  const { matricNumber } = req.params
  const student = await Student.findOne({matricNumber})
  const studentResult = await Promise.all( student.results.map( async(resultId) => {
      const { continousAccessment, examScore, practicalScore, createdAt } = await Score.findById(resultId)
      return { continousAccessment, examScore, practicalScore, createdAt }
  }) )
  return res.send(studentResult)
})


app.post('/signIn', async (req, res) => {
  try {
     const student = new Student(req.body)
     await student.save()
      res.redirect(`/user/${student.matricNumber}`)
  } catch (error) {
     res.redirect('/signIn')
  }
})

 app.get('/login/:password/:matricNumber', async (req, res) => {
    try {
      const { password, matricNumber } = req.body
      const student = await Student.find({email})
      if(student.matricNumber) {
        return res.send(student)
      }
    } catch (error) {
       res.redirect('/signIn')
    }
 })


app.listen(process.env.PORT || 5000, () => {
    console.log('server is running...')
})

