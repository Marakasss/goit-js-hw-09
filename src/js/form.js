import 'animate.css';
import isEmail from 'validator/es/lib/isEmail';
import emailjs from '@emailjs/browser';
emailjs.init("hQcP3rVr7NWYFyrR0");

//GLOBAL
const form = document.querySelector('.feedback-form');
const emailInput = document.querySelector('input');
const messageInput = document.querySelector('textarea');
let formData = {
    email: '',
    message: ''
};
let localStorageData = {};

//FUNCNION TRACKS AND ADD INPUT VALUES TO STORAGE + FORMDATA (+ CHANGE COLOR)
let handleInput = event => {
    formData[event.target.name] = event.target.value.trim();
    localStorage.setItem("feedback-form-state", JSON.stringify(formData));
    
    //valid email change input color
    if (event.target.name === 'email') {
        if (isEmail(event.target.value)) {
            event.target.style.backgroundColor = 'rgb(225, 225, 225)';
        } else {
            event.target.style.backgroundColor = 'rgb(206, 206, 209)';
        }  
    }
    if (event.target.name === 'message') {
        if (event.target.value.trim() !== "") {
            event.target.style.backgroundColor = 'rgb(225, 225, 225)';
        } else {
            event.target.style.backgroundColor = 'rgb(206, 206, 209)';
        }
    }
};
emailInput.addEventListener('input', handleInput);
messageInput.addEventListener('input', handleInput);


//ADDS VALUES FROM STORAGE TO FORM
if (localStorage.getItem("feedback-form-state") !== null) {
    try {
        localStorageData = JSON.parse(localStorage.getItem("feedback-form-state"));
    }
    catch (error) {
        console.error('Error name:', error.name);
        console.error('Error message:', error.message);
    }
        formData = { ...formData, ...localStorageData };
        emailInput.value = formData.email || '';
        messageInput.value = formData.message || '';
    }

//ALERT MESSAGE 
function showAlert(alertDscr) {
    const alert = document.querySelector('.toast');
    alert.classList.add('show');
    alert.textContent = alertDscr;
    setTimeout(() => alert.classList.remove('show'), 3000);
}

//FORM BTN OPTIONS AFTER CLICK
function formSubmit() {
    
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
                console.error("Email sending failed:", error);
                showAlert("Error sending message.");
            });
    })
}
formSubmit()
