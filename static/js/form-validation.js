const fname = document.getElementById("fname");
const lname = document.getElementById("lname");
const email = document.getElementById("email");
const message = document.getElementById("message");

const fnameError = document.getElementById("fnameError");
const lnameError = document.getElementById("lnameError");
const emailError = document.getElementById("emailError");
const messageError = document.getElementById("messageError");

const messageInfo = document.getElementById("messageInfo");

let form_errors = [];
let maxChar = 250;

fname.addEventListener("keydown", function(event) {checkRegX(fname, fnameError, event)});
lname.addEventListener("keydown", function(event) {checkRegX(lname, lnameError, event)});
email.addEventListener("keydown", function(event) {checkRegX(email, emailError. event)});
message.addEventListener("change", function() {
    let remainingChars = maxChar - message.value.length;
    if (remainingChars < 50){
        messageInfo.classList.add('nearLimit');
    }
    else {
        messageInfo.classList.remove('nearLimit')
    }

    if(remainingChars == 0){
        form_errors.push({
            field: message.name,
            value: message.value,
            error: "Max character limit reached"
        });
    }

    messageInfo.textContent = `${remainingChars} characters remaining`;
});

document.addEventListener("submit", function(){
    this.getElementById("form_errors").value = JSON.stringify(form_errors);
});

function checkRegX(field, errorField, event){
    console.log(field.type)
    if (field.checkValidity() ){
        errorField.textContent = "";
        errorField.classList.remove('errorActive');
    } 
    else {
        let errorMessage = 'Input not valid.';
        //const regex = /^[A-Za-z0-9-_\.]*$/;

        if (field.validity.valueMissing) {
        errorMessage = `This field is required.`;
        } 
        else if (field.validity.patternMismatch) {
            if(field.type == email.type){
                errorMessage = `Email invalid. Please match the following format: "example@example.com"`;
            }
            else{
                //event.preventDefault();
                //field.value = field.value.slice(0, -1);
                errorMessage = `Invalid character used. Retype your input. Please use only upper or lower case letters, apostrophes, hyphens, and spaces.`;
            }
        } 
        else if (field.validity.tooLong) {
        errorMessage = `Input is too short. Max number of character allowed is ${field.maxlength}.`;
        }

        errorField.textContent=errorMessage;
        errorField.classList.add('errorActive');
        form_errors.push({
            field: field.name,
            value: field.value,
            error: errorMessage
        });

        setTimeout(function(){
            errorField.classList.remove('errorActive');
            errorField.textContent = "";
        }, 8000);
    }
}