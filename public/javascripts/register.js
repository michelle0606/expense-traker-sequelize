const form = document.querySelector('.check')
const password2 = document.getElementById('password2')
const password2Feedback = document.querySelector('#password2~.invalid-feedback')

form.addEventListener('submit', event => {
  event.preventDefault()
  if (password.value !== password2.value) {
    password2Feedback.innerHTML = "Those password didn't match. Try again."
    password2.classList.add('is-invalid')
    return
  } else {
    form.submit()
    window.location('/')
  }
})

form.addEventListener('input', e => {
  if (e.target.matches('.is-invalid')) {
    e.target.classList.remove('is-invalid')
  }
})
