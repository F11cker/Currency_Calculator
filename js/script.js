"use strict";

const inputRub = document.querySelector("#rub");
const inputUsd = document.querySelector("#usd");
const inputEur = document.querySelector("#eur");
const inputCny = document.querySelector("#cny");



const requestFn = (currency) => {
    currency.addEventListener("click", (event)=> {  
        inputRub.classList.remove("active");
        inputUsd.classList.remove("active");
        inputEur.classList.remove("active");
        inputCny.classList.remove("active");
        event.target.classList.add("active");
    });

    currency.addEventListener("input", (event)=> {
        
        fetch('https://www.cbr-xml-daily.ru/daily_json.js')
        .then(response => {              
            return response.json();
        })
        .then(data => {            
            if (event.target == inputRub) {
                if (isNaN(inputRub.value)) {
                    inputUsd.value = "Вы ввели не число";
                    inputEur.value = "Вы ввели не число";
                    inputCny.value = "Вы ввели не число";                    
                } else {                    
                    inputUsd.value = (inputRub.value / data.Valute.USD.Value).toFixed(4).replace(".", ",");
                    inputEur.value = (inputRub.value / data.Valute.EUR.Value).toFixed(4).replace(".", ",");
                    inputCny.value = (inputRub.value * 10/ data.Valute.CNY.Value).toFixed(4).replace(".", ","); // Курс ЦБ РФ CNY за 10 единиц                    
                }

            } 
            
            if (event.target == inputUsd) {
                if (isNaN(inputUsd.value)) {
                    inputRub.value = "Вы ввели не число";
                    inputEur.value = "Вы ввели не число";
                    inputCny.value = "Вы ввели не число";                    
                } else {                    
                    inputRub.value = (inputUsd.value * data.Valute.USD.Value).toFixed(4).replace(".", ",");
                    inputEur.value = (data.Valute.USD.Value * inputUsd.value / data.Valute.EUR.Value).toFixed(4).replace(".", ",");
                    inputCny.value = (data.Valute.USD.Value * inputUsd.value * 10 / data.Valute.CNY.Value).toFixed(4).replace(".", ","); // Курс ЦБ РФ CNY за 10 единиц                   
                }

            }
            
            if (event.target == inputEur) {
                if (isNaN(inputEur.value)) {
                    inputRub.value = "Вы ввели не число";
                    inputUsd.value = "Вы ввели не число";
                    inputCny.value = "Вы ввели не число";                    
                } else {                    
                    inputRub.value = (inputEur.value * data.Valute.EUR.Value).toFixed(4).replace(".", ",");
                    inputUsd.value = (data.Valute.EUR.Value * inputEur.value / data.Valute.USD.Value).toFixed(4).replace(".", ",");
                    inputCny.value = (data.Valute.EUR.Value * inputEur.value * 10 / data.Valute.CNY.Value).toFixed(4).replace(".", ","); // Курс ЦБ РФ CNY за 10 единиц                    
                }
            }

            if (event.target == inputCny) {
                if (isNaN(inputCny.value)) {
                    inputRub.value = "Вы ввели не число";
                    inputUsd.value = "Вы ввели не число";
                    inputEur.value = "Вы ввели не число";                    
                } else {
                    
                    inputRub.value = (inputCny.value * data.Valute.CNY.Value / 10 ).toFixed(4).replace(".", ","); // Курс ЦБ РФ CNY за 10 единиц
                    inputUsd.value = (data.Valute.CNY.Value * inputCny.value  / (data.Valute.USD.Value * 10)).toFixed(4).replace(".", ","); // Курс ЦБ РФ CNY за 10 единиц
                    inputEur.value = (data.Valute.CNY.Value * inputCny.value  / (data.Valute.EUR.Value * 10)).toFixed(4).replace(".", ","); // Курс ЦБ РФ CNY за 10 единиц                    
                }
            }  
        })
        .catch(()=>{
            inputRub.value = "Сервер не доступен";
            inputUsd.value = "Сервер не доступен";
            inputEur.value = "Сервер не доступен";
            inputCny.value = "Сервер не доступен";
        });       
    });
};

requestFn(inputRub);
requestFn(inputUsd);
requestFn(inputEur);
requestFn(inputCny);

