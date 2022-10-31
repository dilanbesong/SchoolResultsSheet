
const mongoose = require('mongoose')

const SignIn = new mongoose.Schema({
    username:String,
    email:{type:String, unique:true},
    matricNumber:{type:String, unique:true},
    password:String,
    results:Array
}, { timestamps: true })

const Marks = new mongoose.Schema({
    regNumber:String,
    continousAccessment:{ type:Number},
    examScore:{ type:Number },
    practicalScore:{ type:Number },
    grade: {type:String, default:''},
    
}, { timestamps: true })

const Student = mongoose.model('Student', SignIn)
const Score = mongoose.model('Score', Marks)

module.exports = { Student, Score }
