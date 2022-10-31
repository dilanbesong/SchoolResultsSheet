 const getData = async(url) => {
    try {
        const response = await fetch(url)
        const data = await response.json() 
        return data
    } catch (error) {
         return
    }
}

 const postData = async ( data, url ) => {
    try {
        const response = await fetch(url, {method:'POST', headers:{'Content-Type': 'application/json'}, body:JSON.stringify(data)} )
        const result = await response.json()
        return result
    } catch (error) {
       return
    }
}

// const validateEmail = (email) => {
//     const em = /^[a-zA-Z0-9.! #$%&'*+/=? ^_`{|}~-]+@[a-zA-Z0-9-]+(?:\. [a-zA-Z0-9-]+)*$/
//     return em.test(email)
// }

