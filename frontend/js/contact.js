document.addEventListener("DOMContentLoaded", () => {

const form = document.getElementById("contactForm");

const name = document.getElementById("name");
const email = document.getElementById("email");
const subject = document.getElementById("subject");
const message = document.getElementById("message");

function showError(input, text) {

    input.nextElementSibling.innerText = text;
    input.style.borderColor = "#ef4444";

}

function clearError(input) {

    input.nextElementSibling.innerText = "";
    input.style.borderColor = "#dbeafe";

}

function validateEmail(email) {

    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

}

form.addEventListener("submit", function(e){

    e.preventDefault();

    let valid = true;

    if(name.value.trim()==""){

        showError(name,"Enter your name");
        valid=false;

    }else{

        clearError(name);

    }

    if(email.value.trim()==""){

        showError(email,"Enter email");
        valid=false;

    }
    else if(!validateEmail(email.value)){

        showError(email,"Invalid Email");
        valid=false;

    }
    else{

        clearError(email);

    }

    if(subject.value.trim()==""){

        showError(subject,"Enter subject");
        valid=false;

    }else{

        clearError(subject);

    }

    if(message.value.trim()==""){

        showError(message,"Write your message");
        valid=false;

    }else{

        clearError(message);

    }

    if(!valid) return;

    const contact = {

        name:name.value,
        email:email.value,
        subject:subject.value,
        message:message.value,
        date:new Date().toLocaleString()

    };

    let messages = JSON.parse(localStorage.getItem("contactMessages")) || [];

    messages.push(contact);

    localStorage.setItem("contactMessages",JSON.stringify(messages));

    alert("✅ Message Sent Successfully!");

    form.reset();

});

});