import {getWeatherData} from '/getWeatherData.js'


async function drawBackground(city) {
    let photodata
    const startcity = city
    document.getElementById("background").style = "background-color: black; background-image: none"
    await (setTimeout(() => {}, 500));
    //check if after 500 ms the search is still the same, if yes do the api call
    if (city == startcity) {
        photodata = await getWeatherData('https://api.unsplash.com/photos/random?client_id=p2RsPWAavBwh-hvyW9GzFInfh3S3PC7W7VnLkTG6wVo&query=' + city + '%20sky&orientation=landscape');
        document.getElementById("background").style = "background-color: #668; background-image: url(" + photodata.urls.regular + ")";
    }
}


export {drawBackground}