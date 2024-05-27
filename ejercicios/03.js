(async () =>{
  let response = await fetch("user.json")

  let user = await response.json()

  let aprendices = user.users.filter(x => x.aprendiz)
  console.log(aprendices)
  let fetchPromises = aprendices.map(element => fetch(`https://api.github.com/users/${element.user}/repos`))  

  let respuestGithub = Promise.all(fetchPromises)
  console.log(respuestGithub)
  let usuariogithub = await Promise.all(respuestGithub.map(respuesta => respuesta.json()));
  console.log(usuariogithub)

  let todosLosRepos = [];

  usuariogithub.forEach((repos) => {
    let publicRepos = repos.filter(repo => !repo.private);
    
    todosLosRepos = todosLosRepos.concat(publicRepos);
  });

  console.log(todosLosRepos)

})()


