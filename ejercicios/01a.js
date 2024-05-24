const filtrar = x => x.name === "evaluacion"; //un callback que se cumple si el nombre del repositorio es "evaluacion". se usará mas adelante

(async () => { // se crea una funcion anonima     autoejecutable asincrona
  let response = await fetch("01.json"); // se llama al archivo json, y cuando se resuelva, devuelve un objeto que contiene la url del archivo, mas su estado.

  let user = await response.json(); // se obtiene el contenido, en este caso un objeto, cuando la promesa se resuelva.

  let respuestGithub = await fetch(`https://api.github.com/users/${user.name}/repos`)// se llama a la api con la url. En este caso obtiene un objeto que contiene la url, mas el estado.
  let usuariogithub = await respuestGithub.json(); // se obtiene el contenido, en este caso un array con todos los repositorios del usuario seleccionado, cuando la promesa se resuelva.
  console.log(usuariogithub)
  usuariogithub.forEach(element => { // se recorre el array usando un forEach
    if (element.name === "evaluacion") { // la condicion del elemento se cumple sí el nombre del repositorio es "evaluacion"
      console.log(element) //Se muestra en la consola el repositorio evaluacion
    }
  });

  let data = usuariogithub.filter(filtrar) // se filtra solo los elementos que cumplan la condicion del callback
  console.log(data) // Se muestra en la consola el array filtrado, mostrando solo el repositorio evaluacion
  console.log(usuariogithub); //se imprime el array con todos los repositorios del usuario
})();