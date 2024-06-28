document.getElementById('currency-form').addEventListener('submit', function(event) {
    event.preventDefault();

    let amount = document.getElementById('amount').value;
    let fromCurrency = document.getElementById('from_currency').value;
    let toCurrency = document.getElementById('to_currency').value;

    fetch(`https://api.exchangerate-api.com/v4/latest/${fromCurrency}`)
        .then(response => response.json())
        .then(data => {
            let rate = data.rates[toCurrency];
            let result = amount * rate;
            document.getElementById('exchange-rate').innerText = `${amount} ${fromCurrency} = ${result.toFixed(2)} ${toCurrency}`;
        })
        .catch(error => {
            console.error('Error fetching exchange rate:', error);
            document.getElementById('exchange-rate').innerText = 'Error fetching exchange rate';
        });

    updateFlags(fromCurrency, toCurrency);
});

function updateFlags(fromCurrency, toCurrency) {
    const fromFlag = document.getElementById('from_flag');
    const toFlag = document.getElementById('to_flag');

    fromFlag.src = `https://flagcdn.com/48x36/${fromCurrency.slice(0, 2).toLowerCase()}.png`;
    toFlag.src = `https://flagcdn.com/48x36/${toCurrency.slice(0, 2).toLowerCase()}.png`;
}



