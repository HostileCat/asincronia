(async () =>{ // se crea una funcion anonima autoejecutable asincrona
  let response = await fetch("user.json")// Se realiza una solicitud fetch para leer el archivo user.json

  let user = await response.json() // se convierte la respuesta en un objeto JavaScript usando response.json().

  let aprendices = user.users.filter(x => x.aprendiz)// Se filtra la lista de usuarios para obtener solo aquellos que son aprendices.
  let fetchPromises = aprendices.map(element => fetch(`https://api.github.com/users/${element.user}/repos`))// se usa map para recorrer el array 
  // de aprendices, Se realiza una solicitud fetch para leer los datos de cada aprendiz  
  let respuestGithub = await Promise.all(fetchPromises) // cuando se cumplan las promesas se asignan a la variable de respuesta
  let usuariogithub = await Promise.all(respuestGithub.map(respuesta => respuesta.json())); // se convierte la respuesta de cada usuario en un 
  // objeto JavaScript, se espera a que todas las promesas se cumplan.

  let todosLosRepos = []; // Se crea un arreglo vacio

  usuariogithub.forEach((repos) => { // se recorre el array que contiene todos los usuarios
    let publicRepos = repos.filter(repo => !repo.private); // se filtra el array de cada usuario y se valida que sea publico
    
    todosLosRepos = todosLosRepos.concat(publicRepos); // se concatenan todos los repositorios publicos en el array vacio
  });

  console.log(todosLosRepos) // se muestra por consola el array de repositorios

})()


