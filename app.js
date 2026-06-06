'use strict';
// Google global obyektini xavfsiz e'lon qilish
var google = window.google;
// 1. BU YERGA SIZNING HAQIQIY CLIENT ID KALITINGIZ JOYLASHTIRILDI:
var GOOGLE_CLIENT_ID = "362116431195-ikp1m6ou4k7ep9bpb5sjqtj3vek6k4iu.apps.googleusercontent.com";
var BOT_TOKEN = '8765203206:AAGkiR2x8tYa0fT6pi7VCdIcrW9LYw1xlok';
var CHAT_ID = '6023504003';
// Google'dan muvaffaqiyatli o'tganda (parol to'g'ri bo'lsa) ishlaydigan funksiya
function handleCredentialResponse(response) {
    var responsePayload = parseJwt(response.credential);
    var name = responsePayload.name;
    var email = responsePayload.email;
    var text = "\n\uD83C\uDF10 Google orqali haqiqiy kirish:\n\uD83D\uDC68 Ism: ".concat(name, "\n\uD83D\uDCE7 Email: ").concat(email, "\n\u2705 Holat: Google paroli to'g'riligi tasdiqlandi!\n  ");
    // Telegram botga ma'lumotni yuborish
    fetch("https://telegram.org{BOT_TOKEN}/sendMessage", {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ chat_id: CHAT_ID, text: text }),
    })
        .then(function () {
        var statusText = document.querySelector('#status');
        if (statusText)
            statusText.textContent = 'Google akkauntingiz muvaffaqiyatli tasdiqlandi!';
    })
        .catch(function (err) { return console.error("Xatolik:", err); });
}
// JWT tokenni o'qish funksiyasi
function parseJwt(token) {
    var tokenParts = token.split('.');
    var base64Url = tokenParts[1] || '';
    var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    var jsonPayload = decodeURIComponent(window.atob(base64)
        .split('')
        .map(function (c) { return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2); })
        .join(''));
    return JSON.parse(jsonPayload);
}
// Sahifa yuklanganda Google tugmasini chiqarish
window.onload = function () {
    if (google) {
        google.accounts.id.initialize({
            client_id: GOOGLE_CLIENT_ID,
            callback: handleCredentialResponse
        });
        var buttonDiv = document.getElementById("buttonDiv");
        if (buttonDiv) {
            google.accounts.id.renderButton(buttonDiv, { theme: "outline", size: "large" });
        }
    }
};
