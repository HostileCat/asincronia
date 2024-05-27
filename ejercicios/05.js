(async () => {
  
   
  let response = await fetch("user.json");
    
  let user = await response.json();

  const handler = {
    set(target, property, value) {
      if (!(property === 'name' )) {
        console.error(`Propiedad incorrecta`)
        return false;
      }
      if (!/^[A-Z\s]+$/.test(value)) {
        console.error('El nombre solo debe contener letras mayúsculas.');
      }
      target[property] = value;
      return true;
    }
  };

  function transformarNombres(users) {
    users.forEach((user) => {
      const proxyUser = new Proxy(user, handler);

      if (user.aprendiz) {
        const nombres = user.name.split(' ');
  
        if (nombres.length > 2 && user.user.includes('ADSO')) {
          proxyUser.name = user.name.toUpperCase();
        }
      }
      
    });
    
  }
  transformarNombres(user.users);

  console.log(user);
 
})();
