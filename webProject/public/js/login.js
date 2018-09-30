((ajax) => {
  let form = document.forms[0]
  let formData = ''
  const [READY_STATE_COMPLETE, OK, NOT_FOUND] = [4, 200, 400]

  let sendAjax = (formData) => {
    return new Promise((resolve, reject) => {
      ajax.open('POST', 'http://localhost:3000/login', true)
      ajax.setRequestHeader('Content-type', 'application/x-www-form-urlencoded')
      ajax.addEventListener('load', e => {
        if (ajax.readyState === READY_STATE_COMPLETE) {
          data = JSON.parse(ajax.response)
          if (ajax.status === OK) {
            resolve(data)
          } else {
            reject(data)
          }
        }
      })
      ajax.send(encodeURI(formData))
    })
  }
  
  form.addEventListener('submit', e => {
    let formElements = document.querySelectorAll('[required]')
    e.preventDefault()
    formElements.forEach(input => {
      formData += `${input.id}=${input.value}&`
    })
    sendAjax(formData)
      .then(data => {
        let Authorization = data.token
        localStorage.setItem('Authorization', Authorization)
        window.location = 'home'
      })
      .catch(data => {
        window.location = ''
      })
  })
})(new XMLHttpRequest())
