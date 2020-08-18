async function getWeatherData(url) {
    const response = await fetch(url);
    return response.json();
};

export{getWeatherData}