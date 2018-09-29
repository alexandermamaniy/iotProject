(() => {

  localStorage.setItem('token', 'Esto es el token')

  let ajaxHttp = new XMLHttpRequest()
  ajaxHttp.open('GET', 'http://akey96:3000/prueba', true)
  ajaxHttp.setRequestHeader('token', localStorage.getItem('token'))
  ajaxHttp.send()
  
  ajaxHttp.onreadystatechange = () => {
    if(ajaxHttp.readyState == 4 && ajaxHttp.status == 200){
      // Data
      // renderisar 
      // 'user/senr/asdasd'
      // wss:asdasdasdasdsad
      console.log(ajaxHttp.responseText)
    }
  }
})()
