import 'animate.css';
const letterImg = document.querySelector('.letter-img');
const sendButton = document.querySelector('.form-button');

sendButton.addEventListener('click', event => {
    event.preventDefault();

    letterImg.src = "/goit-js-hw-09/img/closed-lttr.png";
    letterImg.classList.add('letter-animation');
    setTimeout(() => {
        letterImg.src = "/goit-js-hw-09/img/mail_10345769.png";
        letterImg.classList.remove('letter-animation')
    }, 2000)
})
