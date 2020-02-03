const weatherForm = document.querySelector('form');
const address = document.querySelector('input');
const message1 = document.querySelector('#message1');
const message2 = document.querySelector('#message2');

weatherForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const loc = address.value;
    fetch('http://localhost:3000/weather?address='+loc).then((response) => {
        response.json().then((data) => {
            message1.textContent = data.forecast;
            console.log(data);
        })
    })
    //console.log(loc);
})