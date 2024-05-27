(async () =>{ // se crea una funcion anonima autoejecutable asincrona
  let response = await fetch("user.json") // Se realiza una solicitud fetch para leer el archivo user.json

  let user = await response.json() // se convierte la respuesta en un objeto JavaScript usando response.json().

  let fetchPromises = user.users.map(element => fetch(`https://api.github.com/users/${element.user}/repos`)) // se usa map para recorrer el array 
  // de usuarios, Se realiza una solicitud fetch para leer los datos de cada aprendiz  
  
  let respuestGithub = await Promise.all(fetchPromises) // cuando se cumplan las promesas se asignan a la variable de respuesta
  
  let usuariogithub = await Promise.all(respuestGithub.map(respuesta => respuesta.json())); // se convierte la respuesta de cada usuario en un 
  // objeto JavaScript, se espera a que todas las promesas se cumplan.

  let todosLosRepos = []; // Se crea un arreglo vacio

  usuariogithub.forEach((repos) => { // se recorre el array que contiene todos los usuarios
    let publicRepos = repos.filter(repo => !repo.private); // se filtra el array de cada usuario y se valida que sea publico
    
    todosLosRepos = todosLosRepos.concat(publicRepos); // se concatenan todos los repositorios publicos en el array vacio
  });

  let usuariosConMenosDe5Repos = usuariogithub.filter(repos => repos.length < 5); // Se filtran los usuarios con menos de 5 repositorios públicos


  let reposConJavaScript = todosLosRepos.filter(repo => repo.name.includes("JavaScript")); // se filtran los repositorios que incluyan "Javascript" en su nombre

  reposConJavaScript.sort((a, b) => a.name.localeCompare(b.name)); // organiza el array en orden alfabetico

  let reposConNombreLargo = todosLosRepos.filter(repo => repo.name.length > 5); // se filtran los repositorios con mas de 5 letras en su nombre 

  console.table(usuariosConMenosDe5Repos) // se muestra por consola los usuarios con menos de 5 repositorios

  console.table(reposConJavaScript) // se muestra por consola los repositorios que incluyen "Javascript" en su nombre

  console.table(reposConNombreLargo) // se muestra por consola los repositorios que tienen mas de 5 letras en su nombre
})()



