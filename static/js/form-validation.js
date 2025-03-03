const fname = document.getElementById("fname");
const lname = document.getElementById("lname");
const email = document.getElementById("email");
const message = document.getElementById("message");

const fnameError = document.getElementById("fnameError");
const lnameError = document.getElementById("lnameError");
const emailError = document.getElementById("emailError");
const messageError = document.getElementById("messageError");

let form_errors = []

fname.addEventListener("input", function() {checkRegX(fname, fnameError)});
lname.addEventListener("input", function() {checkRegX(lname, lnameError)});
email.addEventListener("input", function() {checkRegX(email, emailError)});

function checkRegX(field, errorField){
    console.log(field.type)
    if (field.checkValidity()){
        errorField.textContent = "";
        errorField.classList.remove('errorActive');
    } 
    else {
        let errorMessage = 'Input not valid.';
    
        if (field.validity.valueMissing) {
        errorMessage = `This field is required.`;
        } 
        else if (field.validity.patternMismatch) {
            if(field.type == email.type){
                errorMessage = `Email invalid. Please match the following format: "example@example.com"`;
            }
            else{
                errorMessage = `This field must match the correct pattern. Please use only upper or lower case letters, apostrophes, hyphens, and spaces.`;
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