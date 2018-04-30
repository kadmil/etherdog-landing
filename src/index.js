const form = document.querySelector('#subscribe-form')
const mailInput = document.querySelector('#mail')
const addressInput = document.querySelector('#address')
const button = document.querySelector('#subscribe')

let isSuccess = false

button.addEventListener('click', function(e) {
  if (isSuccess) {
    e.preventDefault()
    isSuccess = false
    addressInput.value = ''
    addressInput.focus()
    button.innerText = 'subscribe'
  }
})

form.addEventListener('submit', function(e) {
  e.preventDefault()
  const mail = mailInput.value
  const address = addressInput.value

  if (!isValidMail(mail) || !isValidAddress(address) || isSending(form)) {
    return
  }

  console.info('sending data', mail, address)
  form.classList.add('-sending')
  button.innerText = 'subscribing'
  setTimeout(function() {
    isSuccess = true
    form.classList.remove('-sending')
    button.innerText = 'Subscribe to another contract'
    console.info('sent data', mail, address)
  }, 500)
})

const inputs = [
  { input: mailInput, validator: isValidMail },
  { input: addressInput, validator: isValidAddress },
]

inputs.forEach(function({ input, validator }) {
  input.addEventListener('input', function(e) {
    if (validator(e.target.value)) {
      input.classList.remove('-invalid')
      button.disabled = false
    } else {
      input.classList.add('-invalid')
      button.disabled = true
    }
  })
})

const mailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i
function isValidMail(mail) {
  return !mail || mailRegex.test(mail)
}

const adderessRegex = /^0x[A-Fa-f0-9]{40}$/
function isValidAddress(address) {
  return !address || adderessRegex.test(address)
}

function isSending(form) {
  return form.classList.contains('-sending')
}
