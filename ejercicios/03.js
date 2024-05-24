const filtrar = x => x.name === "evaluacion"; 

(async () => { 
  let response = await fetch("user.json"); 

  let user = await response.json(); 

  let aprendices = user.users.filter(x => x.aprendiz)

  console.log(aprendices)

  let users = aprendices.map(async element => {
    fetch(`https://api.github.com/users/${element.user}/repos`)
  })

  console.log(users)

})();