function getWeatherUrl(city) {
    if (document.getElementById("placeholder").innerText.length - 4 < document.getElementById('inputcity').value.length) {
        document.getElementById("placeholder").innerText = ""
    }
    return 'https://api.openweathermap.org/data/2.5/forecast?q=' + city + '&mode=xmly&appid=48a8b4741cc8cb086ca2bbffc8c983cb'
}

export {getWeatherUrl}