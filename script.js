
const dropdown = document.querySelectorAll(".dropdown select ");

//Populating the <select> options
for (let select of dropdown) {
    for (let code in countryList) {
        let option = document.createElement("option");
        option.value = code;
        option.textContent = code;
        if (select.name === "from" && code === "USD") {   //default selections
            option.selected = 'selected';
        }
        else if (select.name === "to" && code === "PKR") {
            option.selected = 'selected';
        }
        select.appendChild(option);
    }
    select.addEventListener("change", (evt) => {
        updateFlag(evt.target);
    });
}

const updateFlag = (e) => {
    let currCode = e.value;
    let countryCode = countryList[currCode];
    let newSrc = `https://flagsapi.com/${countryCode}/flat/64.png`;
    let img = e.parentElement.querySelector("img");
    img.src = newSrc;
}



//currency exchange API

const API_KEY = "cur_live_ur78PaSdPQz9Xf4L3XufZ3xB6RKu8YX7HFij33BI"; // Your live key
const BASE_URL = "https://api.currencyapi.com/v3/latest";

// Get DOM elements
const btn = document.querySelector("button");
const amountInput = document.querySelector("input");
const resultDisplay = document.getElementById("latest_rates_display");
const fromCurrency = document.querySelector("select[name='from']");
const toCurrency = document.querySelector("select[name='to']");

btn.addEventListener("click", async (evt) => {
    evt.preventDefault();

    let amtValue = parseFloat(amountInput.value);
    if (!amountInput.value || amtValue <= 0 || isNaN(amtValue)) {
        alert("Please enter a valid amount to convert.");
        return;
    }

    const URL = `${BASE_URL}?apikey=${API_KEY}&base_currency=${fromCurrency.value}&currencies=${toCurrency.value}`;

    try {
        resultDisplay.innerText = "Fetching exchange rate...";
        const response = await fetch(URL);

        if (!response.ok) throw new Error("CurrencyAPI fetch failed");

        const data = await response.json();
        const rate = data.data[toCurrency.value].value;
        const finalAmount = (amtValue * rate).toFixed(2);

        resultDisplay.innerText = `${amtValue} ${fromCurrency.value} = ${finalAmount} ${toCurrency.value}`;
    } catch (error) {
        console.error("Error fetching data:", error);
        resultDisplay.innerText = "Exchange rate unavailable. Please try again.";
    }
});
