const username = document.querySelector("#username");
const phone = document.querySelector("#phone");
const registrbtn = document.querySelector("#registrbtn");
const sms = document.querySelector("#sms");
const registrform = document.querySelector("#registrform");
const smsform = document.querySelector("#smsform")



registrform.addEventListener("submit", function(e) {
    e.preventDefault();
    
    fetch("https://gateway.texnomart.uz/api/common/v1/user/check-phone", {
        method: "post",
        body: JSON.stringify({
            phone: phone.value
        }),
        headers: {
            "content-type": "application/json; charset=UTF-8"
        }
    })
    .then((response) => response.json())
    .then((json) => {
        localStorage.setItem("token", json.data.token);
        if(localStorage.getItem("phone") !== phone.value){
            localStorage.setItem("phone", phone.value);
            alert("Nomeringizga SMS yuborildi");
            window.location.href = "sms.html";
        } else {
            alert("Raqamingiz ro'yxatdan o'tgan");
        }
    });
});

smsform.addEventListener("submit", function(event) {
    event.preventDefault();
    
    fetch("https://gateway.texnomart.uz/api/common/v1/user/check-auth-key", {
        method: "post",
        body: JSON.stringify({ code: sms.value, phoneNumber: phone.value, token: localStorage.getItem("token") }),
        headers: {
            "content-type": "application/json; charset=UTF-8"
        }
    })
    .then((response) => {
        if(response.status === 200){
            window.location.href = "main.html"
        }
    })
    .then((json) => {
        localStorage.setItem("logintoken", json.data.token);
       
    })
    .catch((error) => {
        alert("SMS kodni xato kiritdingiz");
    });
});

if (localStorage.getItem("logintoken") !== null){
    window.location.href = "login.html";
} else {
    window.location.href = "index.html";
}



