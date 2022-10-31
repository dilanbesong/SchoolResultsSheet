const loginBtn = document.querySelector('[data-login]')
loginBtn.addEventListener('click', loginFn)

function loginFn(e) {
    e.preventDefault()
   const matricNumber = document.querySelector('#regNumLogin').value
   const password = document.querySelector('#passwordLogin').value
   const validateMatricNum = matricNumber.includes(20) && matricNumber.length > 12
   const validatePassword = password.length >= 6 
   if(validateMatricNum && validatePassword){
       const loginUser = getData(`/login/${password}/${matricNumber}`)
      loginUser.then( user => location.href = '/home').catch( err => alert(err.message))
   }else {
     alert(`Your password must be greater than 6 characters
      or your matric number must include 20 and should be greater than 12 or create an account`)
   }
  

}
