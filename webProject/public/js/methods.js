
const [READY_STATE_COMPLETE, OK] = [4, 200, 400]


const sendGET = (url) => {
  return new Promise((resolve, reject) => {
    let ajax = new XMLHttpRequest()
    ajax.open('GET', url, true)
    ajax.setRequestHeader('Authorization', localStorage.getItem('Authorization'))
    ajax.addEventListener('load', e => {
      if (ajax.readyState === READY_STATE_COMPLETE) {
        let data = JSON.parse(ajax.response)
        if (ajax.status === OK) {
          resolve(data)
        } else {
          reject(data)
        }
      }
    })
    ajax.send()
  })
}

const sendPOST = (url, formData) => {
  let ajax = new XMLHttpRequest()
  return new Promise((resolve, reject) => {
    ajax.open('POST', url, true)
    ajax.setRequestHeader('Content-type', 'application/x-www-form-urlencoded')
    ajax.addEventListener('load', e => {
      if (ajax.readyState === READY_STATE_COMPLETE) {
        let data = JSON.parse(ajax.response)
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

const logout = ()  => window.localStorage.removeItem('Authorization')
