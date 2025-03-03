const letterImg = document.querySelector('.letter-img');
const sendButton = document.querySelector('.form-button');

sendButton.addEventListener('click', event => {
    event.preventDefault();

    letterImg.src = './img/closed-lttr.png';
    letterImg.classList.add('letter-animation');
    setTimeout(() => {
        letterImg.src = './img/mail_10345769.png';
        letterImg.classList.remove('letter-animation')
    }, 2000)
})
