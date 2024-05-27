(async () =>{
  let response = await fetch("user.json")

  let user = await response.json()

  let fetchPromises = user.users.map(element => fetch(`https://api.github.com/users/${element.user}/repos`))  
  
  let respuestGithub = Promise.all(fetchPromises)
  
  let usuariogithub = await Promise.all(respuestGithub.map(respuesta => respuesta.json()));
  console.log(usuariogithub)

  let todosLosRepos = [];

  usuariogithub.forEach((repos) => {
    let publicRepos = repos.filter(repo => !repo.private);
    
    todosLosRepos = todosLosRepos.concat(publicRepos);
  });

  let usuariosConMenosDe5Repos = usuariogithub.filter(repos => repos.length < 5);


  let reposConJavaScript = todosLosRepos.filter(repo => repo.name.includes("JavaScript"));

  reposConJavaScript.sort((a, b) => a.name.localeCompare(b.name));

  let reposConNombreLargo = todosLosRepos.filter(repo => repo.name.length > 5);

  console.table(usuariosConMenosDe5Repos)

  console.table(reposConJavaScript)

  console.table(reposConNombreLargo)
})()



