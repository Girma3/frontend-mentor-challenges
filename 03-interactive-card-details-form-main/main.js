// get the card information elements
const cardHolder = document.querySelector(".user-name");
const cardNumber = document.querySelector(".card-num");
const expireMonth = document.querySelector(".ex-month");
const expireYear = document.querySelector(".ex-year")
const cvcNumber = document.querySelector(".cvc-num");

// get the form 
const inputForm = document.querySelector("form");

    const userName = document.getElementById("user-name");
    const userCard = document.getElementById("card-num");
    const exMonth =document.getElementById("exp-month");
    const exYear = document.getElementById("exp-year");
    const userCvc = document.getElementById("user-cvc");
    const userPass = document.getElementById("user-password");
    const userConfirm = document.getElementById("confirm-password");
    const submitbtn = document.querySelector("button");

//connect the form and the cards and addeventListener to the form
userName.addEventListener("keyup",()=>{
    cardHolder.textContent =`${userName.value}`;
});

userCard.addEventListener('keyup',()=>{
    cardNumber.textContent = `${userCard.value}`;
});

exMonth.addEventListener('keyup',()=>{
    expireMonth.textContent = `${exMonth.value}`;
});

exYear.addEventListener('keyup',()=>{
    expireYear.textContent = `${exYear.value}`;
});

userCvc.addEventListener('keyup',()=>{
  
    cvcNumber.textContent = `${userCvc.value}`;
});



const regexpressions ={
   "card-Number":/^[0-9]{1,16}$/,
   "user-Name" :/^[\w]{2,20}$/,
   "cvc-num" :/^[\d]{1,3}$/,
   
     "expired-month":/^[\d]{1,2}$/,
     "expired-year":/^[\d]{2,4}$/,

     "password":/^[\d\w@-_]{5,8}$/,
     "confirmation":/^[\d\w@-_]{5,8}$/,

}

//creat function tha accept input (username,password...) and regular expression
function validateForm(field,regex){
    
    if(regex.test(field.value)){
       field.className='valid';

    }
    else{
        field.className="invalid";
    }
    
}

 const inputs = document.querySelectorAll("input");
    inputs.forEach(input=>{
        input.addEventListener("keyup",(e)=>{
           //
        validateForm(e.target,regexpressions[e.target.attributes.name.value]);
        if( userPass.value !== userConfirm.value ){
            userConfirm.className = "invalid";
        }
        else{
            userConfirm.className = "valid";
        }
        });
});

//show complete message after form valid
const successMsg = document.querySelector(".sign-up");
const formCompleted = document.querySelector("submit-btn");

const dismissMSg = document.querySelector(".continue-btn");
const myform = document.getElementById("card-form");
//function to show  for the user  after we stop submit from refreshing page
function userMsg(){
    successMsg.style.display = "flex";
    inputForm.style.display = "none";
}
//to reset the form and the cards value

dismissMSg.addEventListener('click',()=>{
    //clear the form previously entered values
    removeText();
    myform.reset();
    successMsg.style.display = "none";
    inputForm.style.display = "block"; 
});
//function to clear and to return palceholder on the cards
function removeText(){
  cardHolder.textContent = "Girma";
  cardNumber.textContent = "000 000 000";
  expireMonth.textContent = "MM";
  expireYear.textContent = "YY";
  cvcNumber.textContent = "000";
}

console.log(inputForm)

