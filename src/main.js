const api = {
    key: "7e3f21edee540e6110af347b55eb1ab2",
    base: "https://api.openweathermap.org/data/2.5/"
}

const searchBox = document.querySelector('.search-box');
searchBox.addEventListener('keypress', setQuery);

function setQuery(event) {
    if (event.keyCode == 13) {
        getResults(searchBox.value)
    }

}

function getResults(query) {
    const url = `${api.base}weather?q=${query}&units=metric&appid=${api.key}`;
    fetch(url).then(weather => {
        return weather.json()
    }).then(response => {
        console.log(response);
        displayResults(response);
    })

}

function displayResults(weather) {
    if (weather.cod == 404) {
        window.alert(`Entered ${weather.message}`);
        location.reload(true);
    }

    let city = document.querySelector('.location .city');
    city.innerText = `${weather.name}, ${weather.sys.country}`;

    let currDate = new Date();
    let date = document.querySelector('.location .date');
    date.innerText = dateBuilder(currDate);

    let temp = document.querySelector('.current .temp');
    temp.innerHTML = `${Math.round(weather.main.temp)}<span>°c</span>`;

    let weather_el = document.querySelector('.current .weather');
    weather_el.innerText = weather.weather[0].main;

    let minmax = document.querySelector('.min-max');
    minmax.innerText = `${Math.round(weather.main.temp_min)}°c / ${Math.round(weather.main.temp_max)}°c`;

}

function dateBuilder(d) {
    let months = ['Janaury', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    let days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

    let day = days[d.getDay()];
    let date = d.getDate();
    let month = months[d.getMonth()];
    let year = d.getFullYear();

    return `${day} ${date} ${month} ${year}`;
}
