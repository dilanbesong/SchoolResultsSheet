
const signUpBtn = document.querySelector('[data-signUpBtn]')
signUpBtn.addEventListener('click', signUpFn)
function signUpFn(e) {
    e.preventDefault()
    const username = document.querySelector('#username').value
    const matricNumber = document.querySelector('#matric-num').value
    const email = document.querySelector('#email').value
    const password = document.querySelector('#password').value
    const checkuser = getData(`/user/${matricNumber}`)
   
    checkuser.then( user => {
        if(user){
            alert('user exist')
            location.reload()
        }else{
            const validateMail = email.includes('@gmail') && email.length > 6
            const validateMatric = matricNumber.includes(20) && matricNumber.length > 12
            const validatePass = password.length >= 6 
            const validateUserName =  password.length >= 6 

            if(validateMail && validateMatric && validatePass && validateUserName) {
                     postData( { username, matricNumber,email, password }, '/signIn')
                     setTimeout( () => { IsAuth(matricNumber) }, 2000)
            }else {
                alert(`Email must be valid and password and 
                username must be greater then or equal to 6 character and matric number must contain 20 and greater than 12`)
            }
           
        }
    }).catch( err => location.href = '/signIn')
   

}

function IsAuth(matricNumber) {
  const sendToHome = getData(`/user/${matricNumber}`)
  sendToHome.then( user => { 
    sessionStorage.setItem('matricNumber', matricNumber)
    location.href = '/home' 
}).catch( err => location.href = '/signIn')
}
