const inputSlider = document.querySelector("[data-lengthSlider]")
const lengthDisplay = document.querySelector("[data-lengthNumber]")
const passwordDisplay = document.querySelector("[data-passwordDisplay]")
const copyBtn = document.querySelector("[data-copy]");
const copyMsg = document.querySelector("[data-copyMsg]");
const uppercaseCheck = document.querySelector("#uppercase");
const lowercaseCheck = document.querySelector("#lowercase");
const numberCheck = document.querySelector("#numbers");
const symbolsCheck = document.querySelector("#symbols");
const indicator = document.querySelector("[data-indicator]");
const generateBtn = document.querySelector(".generateButton");
const allCheckBox = document.querySelectorAll("input[type=checkbox]");
const symbols='!@#$%^&*()-_=+[]{}|;:,.<>/?'

let password = "";
let passwordLength= 10;
let checkCount=1;
// set strength circle color grey

handleSlider();

//set password length
function handleSlider(){
  inputSlider.value=passwordLength;
  lengthDisplay.innerText=passwordLength;


}

function setIndicator(color){
      indicator.style.backgroundColor = color;
      indicator.style.boxShadow = '0px 0px 10px 5px color'
}

function getRndInteger(min, max){
    //Math.random() will give values between 0 to 1, so need to multiply
    // in which 0 is inclusive and 1 is exclusive if multiplied by max-min, then the length will be min to max, but there is a possibility of getting flooting point number
    // so only for integers will use Math.floor function
    // we wqnt min to max range so (min+0 = (max-min) +min  
   return Math.floor(Math.random()*(max-min)) + min 
}

function generateRandomNumber(){
   return getRndInteger(0,9)
}

//a to z ASCI value will be 
function generateLowerCase(){
    return  String.fromCharCode(getRndInteger(97, 123) );//convert number to Character 
}

function generateUpperCase(){
    return String.fromCharCode(getRndInteger(65, 91))
}

function generateSymbol(){
    const randNum = getRndInteger(0, symbols.length);
    return symbols.charAt(randNum);  //char at funcion will return the character at the position 
}

function calcStrength(){
     let hasUpper=false;
     let hasLower=false;
     let hasNumber=false;
     let hasSym = false;

     if(uppercaseCheck.checked) hasUpper=true;
     if(lowercaseCheck.checked) hasLower=true;
     if(numberCheck.checked) hasNumber=true;
     if(symbolsCheck.checked) hasSym=true;

     if(hasUpper && hasLower && (hasNumber|| hasSym) && passwordLength>=8){
        setIndicator('#0f0');
     }else if(
        (hasLower || hasUpper)&& 
        (hasNumber || hasSym) &&
        passwordLength >= 6
     ){
        setIndicator("#ff0")
     }
     else{
        setIndicator("#f00")
     }
    
}


async function copyContent(){
    try{
        await navigator.clipboard.writeText(passwordDisplay.value);
       copyMsg.innerText="copied";

    }
    catch(e){
        copyMsg.innerText="failed"
    }

    copyMsg.classList.add("active");


//we can do it like display none
    setTimeout(()=>{
        copyMsg.classList.remove("active");
    },2000);

   
}

inputSlider.addEventListener('input', (e)=>{
    passwordLength=e.target.value;
    handleSlider();
})

copyBtn.addEventListener('click',()=>{
    if(passwordDisplay.value)
    copyContent();
})

function handleCheckboxChange(){
    checkCount=0;
    allCheckBox.forEach((checkbox)=>{
        if(checkbox.checked)
        checkCount++;
    })

    //special condition
    if(passwordLength< checkCount){
        passwordLength=checkCount;
        handleSlider();
    }
}

allCheckBox.forEach((checkbox)=>{
    checkbox.addEventListener('change', handleCheckboxChange)
})

generateBtn.addEventListener('click',()=>{

})

