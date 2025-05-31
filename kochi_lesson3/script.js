document.getElementById('cta-button').addEventListener('click', () => {
  document.getElementById('modal').classList.remove('hidden');
});

document.getElementById('close-modal').addEventListener('click', () => {
  document.getElementById('modal').classList.add('hidden');
});

document.getElementById('contact-form').addEventListener('submit', (event) => {
  event.preventDefault();
  alert('お問い合わせありがとうございました！');
});
