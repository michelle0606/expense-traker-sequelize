const form = document.querySelector('.new_page')
const category = document.getElementById('category')
const categoryFeedback = document.querySelector('#category~.invalid-feedback')
const amount = document.getElementById('amount')
const amountFeedback = document.querySelector('#amount~.invalid-feedback')

form.addEventListener('submit', event => {
  event.preventDefault()
  if (!amount.value.match(/^[0-9]*$/)) {
    amountFeedback.innerHTML = '請輸入阿拉伯數字'
    amount.classList.add('is-invalid')
    return
  } else if (category.value === '選擇類別') {
    categoryFeedback.innerHTML = '請選擇一個類別'
    category.classList.add('is-invalid')
  } else {
    form.submit()
    return window.location('/')
  }
})

form.addEventListener('input', e => {
  if (e.target.classList.contains('is-invalid')) {
    e.target.classList.remove('is-invalid')
  }
})
