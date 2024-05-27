function prueba() { //funcion declarada
  fetch("user.json") // Se realiza una solicitud fetch para leer el archivo user.json
    .then(response => response.json()) // se convierte la respuesta en un objeto JavaScript usando response.json().
    .then(user => { // user toma el objeto
      let aprendices = user.users.filter(x => x.aprendiz); // Se filtra la lista de usuarios para obtener solo aquellos que son aprendices.
      let fetchPromises = aprendices.map(element => // se usa map para recorrer el array de aprendices
        fetch(`https://api.github.com/users/${element.user}`) // Se realiza una solicitud fetch para leer los datos de cada aprendiz
          .then(respuestGithub => respuestGithub.json()) // se convierte la respuesta en un objeto JavaScript usando response.json().
      );

      return Promise.all(fetchPromises); // espera a que todas las promesas en fetchPromises se resuelvan. despues se retorna
    })
    .then(usuariogithub => { // usuariogithub toma el array de todos los aprendices

      let name = usuariogithub.map(element => element.name); // se usa map para recorrer el array y obtener el nombre de github
      let avatar = usuariogithub.map(element => element.avatar_url); // se usa map para recorrer el array y obtener el la url del avatar
      
      let tabla = name.map((name, index) => ({  // se usa map para recorrer el array de name para utilizar todos los nombres, y tambien su index
        name: name, // se crea la clave name y despues se le asigna el nombre
        avatar_url: avatar[index] // se crea la clave avatar_url y despues se le asigna la url del array de avatar usando el index
      }));

      console.table(tabla); // se muestra por consola la tabla completa
    })

}

prueba(); // se llama a la funcion prueba
