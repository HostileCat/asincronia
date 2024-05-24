function prueba() { 

  fetch("user.json") 
    .then(response => { 
      return response.json(); 
    })

    .then(user => { 
      let aprendices = user.users.filter(x => x.aprendiz)
      let array = []
      aprendices.forEach(element => {
        fetch(`https://api.github.com/users/${element.user}`)
          .then(respuestGithub => {   
            return respuestGithub.json()
          })
          .then(respuesta => array.push(respuesta))
      })
      return array
    })
  
    .then(usuariogithub => {
      console.log(usuariogithub)
      let name = []
      let avatar = []
      usuariogithub.forEach(element => {
        name.push(element.name)
      })
      usuariogithub.forEach(element => {
        avatar.push(element.avatar_url)
      })
      
      let tabla = {
        "name": name,
        "avatar_url": avatar
      }
      console.table(tabla)
    })


}

prueba() 

