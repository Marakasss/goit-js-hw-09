import 'animate.css';
import isEmail from 'validator/es/lib/isEmail';
import emailjs from '@emailjs/browser';

//GLOBAL
const form = document.querySelector('.feedback-form');
const emailInput = document.querySelector('input');
const messageInput = document.querySelector('textarea');
let formData = {
    email: '',
    message: ''
};
let localStorageData = {};

//FUNCNION TRACKS AND ADD INPUT VALUES TO STORAGE + FORMDATA
let handleInput = event => {
    formData[event.target.name] = event.target.value.trim();
    localStorage.setItem("feedback-form-state", JSON.stringify(formData));
};
emailInput.addEventListener('input', handleInput);
messageInput.addEventListener('input', handleInput);

//ADDS VALUES FROM STORAGE TO FORM
if (localStorage.getItem("feedback-form-state") !== null) {
        localStorageData = JSON.parse(localStorage.getItem("feedback-form-state"));
        formData = { ...formData, ...localStorageData };
        emailInput.value = formData[emailInput.name];
        messageInput.value = formData[messageInput.name];
    }

//ALERT MESSAGE 
function showAlert(alertDscr) {
    const alert = document.querySelector('.toast');
    alert.classList.add('show');
    alert.textContent = alertDscr;
    setTimeout(() => alert.classList.remove('show'), 3000);
}

//BTN SEND FORM OPTIONS AFTER CLICK
function sendBttnOptions() {
    
    const letterImg = document.querySelector('.letter-img');

    form.addEventListener('submit', event => {
        event.preventDefault();

        let { email, message } = formData;

        //VALIDATE EMAIL
        if (!isEmail(email)) {
            showAlert("It's not email");
            return;
        }
        if (message.trim() === '') {
            showAlert("Wright something");
            return;
        }
        //SENDING FORM TO EMAIL
        emailjs.sendForm("service_scmlcpr", "template_7iwitgm", form)
            .then(() => {
                showAlert("Message sent successfully!");

                //ANIMATION SEND LETTER
                letterImg.src = "/goit-js-hw-09/img/closed-lttr.png";
                letterImg.classList.add('letter-animation');
                setTimeout(() => {
                    letterImg.src = "/goit-js-hw-09/img/mail_10345769.png";
                    letterImg.classList.remove('letter-animation')
                }, 1000);
                //CLEAR LOCAL STORAGE & FORMDATA
                console.log(formData);
                localStorage.removeItem("feedback-form-state");
                Object.keys(formData).forEach(key => formData[key] = '')
                emailInput.value = formData[emailInput.name];
                messageInput.value = formData[messageInput.name];
            })
            .catch(() => {
            showAlert("Error sending message.");
        });
    })
}
sendBttnOptions()
emailjs.init("hQcP3rVr7NWYFyrR0");