(async () => { // se crea una funcion anonima autoejecutable asincrona
  
   
  let response = await fetch("user.json"); // Se realiza una solicitud fetch para leer el archivo user.json
    
  let user = await response.json();// se convierte la respuesta en un objeto JavaScript usando response.json().

  const handler = { // se crea la variable handler con su trampa set
    set(target, property, value) { // la trampa set que asigna un valor al objeto
      if (!(property === 'name' )) { // una condicional que se cumple si la propiedad no es "name"
        console.error(`Propiedad incorrecta`) // si se cumple la condicion se muestra un error en la consola
        return false; // se retorna false para cancelar la operacion
      }
      if (!/^[A-Z\s]+$/.test(value)) { // una condicional que se cumple si el valor no tiene todas sus letras en mayuscula 
        console.error('El nombre solo debe contener letras mayúsculas.'); // si se cumple la condicion se muestra un error en la consola
        return false; // se retorna false para cancelar la operacion
      }
      target[property] = value; // si no se cumplen las condiciones anteriores se asigna el valor al objeto
      return true; // se retorna true para aceptar la operacion
    }
  };

  function transformarNombres(users) { // una funcion que recibe el array de usuarios como argumento 
    users.forEach((user) => { // se recorre el array de usuarios
      const proxyUser = new Proxy(user, handler); // se inicialializa el proxi y se le asigna el objeto y la trampa set

      if (user.aprendiz) { // una condicional que se cumple si el usuario es aprendiz
        const nombres = user.name.split(' '); // si el usuario es aprendiz, su nombre se separa en un array
  
        if (nombres.length > 2 && user.user.includes('ADSO')) { // una condicional que se cumple el usuario tiene mas de dos 
          // nombres y si su usuario incluye la palabra "ADSO"
          proxyUser.name = user.name.toUpperCase(); // se intenta asignar al objeto el nombre del usuario en mayusculas
        }
      }
      
    });
    
  }
  transformarNombres(user.users); // se llama a la funcion para tranformar los nombres

  console.log(user); // se muestra por consola el objeto modificado
 
})();
