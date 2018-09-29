(() => {
  let ajax = new XMLHttpRequest()
  let form = document.forms[0]
  let formData = ''
  const [READY_STATE_COMPLETE, OK, NOT_FOUND] = [4, 200, 400]


  form.addEventListener('submit', e => {
    let formElements = document.querySelectorAll('[required]')
    e.preventDefault()
    ajax.open('POST', 'http://akey96:3000/login', true)
    ajax.setRequestHeader('Content-type', 'application/x-www-form-urlencoded')
    ajax.addEventListener('load', e => {
      console.log('entro')
      if (ajax.readyState === READY_STATE_COMPLETE) {
        if (ajax.status === OK) {
          console.log(ajax.response)
        } else {
          console.log('error  ', ajax.response)
        }
      }
    })

    formElements.forEach(input => {
      formData += `${input.id}=${input.value}&`
    })

    ajax.send(encodeURI(formData))
  })
})()


// $(document).ready(function(){    
//     $('#boton-guardar').click(function(){       
//         var nom = document.getElementById("nombretxt").value;
//         var apel = document.getElementById("apellidotxt").value;
//         localStorage.setItem("Nombre", nom);
//         localStorage.setItem("Apellido", apel);
//         document.getElementById("nombretxt").value = "";
//         document.getElementById("apellidotxt").value = "";
//     });   
// });


// $(document).ready(function(){    
//     $('#boton-cargar').click(function(){                       
//         /*Obtener datos almacenados*/
//         var nombre = localStorage.getItem("Nombre");
//         var apellido = localStorage.getItem("Apellido");
//         /*Mostrar datos almacenados*/      
//         document.getElementById("nombre").innerHTML = nombre;
//         document.getElementById("apellido").innerHTML = apellido; 
//     });   
// });
