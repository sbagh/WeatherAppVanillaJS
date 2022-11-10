//Open Weather API
const api = {
    key: "a2bd1e809b54a8d25c4ed57cd64f7a74",
    base: "https://api.openweathermap.org/data/2.5/",
}

//user types in the required location in the search-box and hits enter, passing location as an argument to "getResults()"
const searchbox = document.querySelector(".search-box")
searchbox.addEventListener("keypress",setQuery)

function setQuery(evt) {
    if (evt.key === "Enter") {
        getResults(searchbox.value)
    }
}

//fetches API, and uses location as a query, returns information as JSON, and pushes to displayResults()
function getResults (query) {
    fetch(`${api.base}weather?q=${query}&units=metric&appid=${api.key}`)
        .then(weather => {
            return weather.json()
        }).then(displayResults)
}


// display results by replacing the parts in the HTML page
function displayResults(weather) {
    console.log(weather)
    let city = document.querySelector(".location .city")
    city.innerText = `${weather.name}, ${weather.sys.country}`

    let now = new Date()
    let date = document.querySelector(".location .date")
    date.innerText = dateBuilder(now)

    let temp = document.querySelector(".current .temp")
    temp.innerText = `${Math.round(weather.main.temp)}`

    let weatherType =document.querySelector(".current .weather")
    weatherType.innerText = weather.weather[0].main
}

// build date for the date function above
function dateBuilder(d){
    const months = ["January", "February", "March", "April", "May", "June", "July", "August",
        "September", "October", "November", "December"];
    const days = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];

    let day=days[d.getDay()]
    let month = months[d.getMonth()]
    let date = d.getDate()
    let year = d.getFullYear()

    return `${day}, ${date} ${month} ${year}`
}

