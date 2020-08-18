import {
    drawBackground
} from "/drawBackground.js"
import {
    drawPointer
} from "/drawPointer.js"
import {
    getWeatherData
} from '/getWeatherData.js'
import {
    getWeatherUrl
} from '/getWeatherUrl.js'


//wrap all in a global function

(() => {

    let i, j, city, weatherdata, tmparray, iconarray, timearray, hoursarray, now, timeblock,
        graphmin, graphmax, graphdif, tmparray1, tmparray2, tmparray3, tmparray4, tmparray5, tempweatherdata, hoursarray1

    tmparray1 = [],
        tmparray2 = [],
        tmparray3 = [],
        tmparray4 = [],
        tmparray5 = [],

        document.getElementById('inputcity').value = localStorage.getItem("StoredCity")

    city = document.getElementById('inputcity').value
    setForecast()

    //new forecast on input
    document.getElementById('inputcity').oninput = () => {
        city = document.getElementById('inputcity').value;
        setForecast()
    }

    async function setForecast() {
        tempweatherdata = await getWeatherData(getWeatherUrl(city))

        //set current city and country so we can then check if they aren't identical to the ones we just looked up
        let activecity, activecountry;
        if (weatherdata === undefined) {
            activecity = 'placeholder';
            activecountry = 'placeholder'
        } else {
            activecity = weatherdata.city.name;
            activecountry = weatherdata.city.country
        }

        if ((tempweatherdata.city != undefined) && (tempweatherdata.city.name + tempweatherdata.city.country != activecity + activecountry)) {
            weatherdata = tempweatherdata
            localStorage.setItem("StoredCity", document.getElementById('inputcity').value)
            document.getElementById("placeholder").innerText = weatherdata.city.name + ", " + weatherdata.city.country
            drawForecast()
        }
    }

    function drawForecast() {

        drawBackground(city);
        clearData();
        createData();

        Chart.defaults.global.defaultFontFamily = "'Pangolin',  cursive;";

        for (i = 1; i <= 5; i++) {
            drawDayChart();
            drawDayText();
            drawDayIcons();
        }

        function drawDayChart() {
            new Chart(document.getElementById("chart" + i), {
                type: 'line',
                data: {
                    labels: hoursarray1,
                    datasets: [{
                        label: "Temperature in °C",
                        type: "line",
                        borderColor: "#fff",
                        borderWidth: 5,
                        data: eval('tmparray' + i),
                        pointStyle: 'https://openweathermap.org/img/w/10d.png',
                        lineTension: 0.4,
                        fill: false
                    }]
                },
                options: {
                    scales: {
                        yAxes: [{
                            display: false,
                            ticks: {
                                min: graphmin,
                                max: graphmax
                            },
                            pointLabels: {
                                fontSize: 20,
                            }
                        }],
                        xAxes: {
                            ticks: {
                                fontSize: 40
                            }
                        },
                    },
                    tooltips: {
                        enabled: false
                    },
                    title: {
                        display: false,
                        text: 'Weather'
                    },
                    legend: {
                        display: false
                    }
                }

            })
        }

        function drawDayText() {
            let day = 0
            const weekdays = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday']
            //add the day and a brief forecast
            switch (i) {
                case 1:
                    day = 'today';
                    break;
                case 2:
                    day = 'tomorrow';
                    break;
                case 3:
                case 4:
                case 5:
                    day = new Date(weatherdata.list[i * 8 - 8].dt_txt);
                    day = weekdays[day.getDay()]
            }
            if ((weatherdata.list[i * 8 - 11] != undefined) && (weatherdata.list[i * 8 - 6] != undefined)) {
                document.getElementById('day' + i).innerText = day + ": " + weatherdata.list[i * 8 - 11].weather[0].description + " to " + weatherdata.list[i * 8 - 6].weather[0].description
            } else {
                document.getElementById('day' + i).innerText = day + " is a beautiful day with " + weatherdata.list[i * 8 - 6].weather[0].description
            }
        }

        function drawDayIcons() {
            let daymax = -1000;
            let daymaxtime = null;
            //draw symbols on top of the graph
            const target = document.getElementById('chart' + i).parentElement;

            for (j = 0; j < 9; j++) {
                if (iconarray[(i - 1) * 8 + j] != null) {
                    let html = document.createElement("div");
                    html.classList.add('note');
                    html.classList.add('icon');
                    let img = document.createElement("img");
                    img.style.width = '60px';
                    const bottom = "calc(-6px + " + String(((Number((eval('tmparray' + i))[j]) - graphmin) / graphdif) * 90 + 0) + '%)';
                    const left = String(-5 + (100 / 8.3) * j + 2) + '%';
                    img.setAttribute('src', "http://openweathermap.org/img/wn/" + iconarray[(i - 1) * 8 + j] + "@2x.png")
                    html.appendChild(img);
                    html.style.bottom = bottom;
                    html.style.left = left;
                    target.appendChild(html)
                    if (Number((eval('tmparray' + i))[j]) > daymax) {
                        daymax = Number((eval('tmparray' + i))[j])
                        daymaxtime = j
                    }
                }
            }
            addTmpPointers()

            function addTmpPointers() {
                drawPointer(eval('tmparray' + i), graphmin, graphdif, daymaxtime, String(daymax) + '°C', document.getElementById('chart' + i).parentElement);
                drawPointer(eval('tmparray' + i), graphmin, graphdif, 8, String((eval('tmparray' + i))[8]) + '°C', document.getElementById('chart' + i).parentElement);
            }
        }

        function clearData() { //clear icons
            for (i = document.getElementsByClassName('note').length - 1; i >= 0; i--) {
                document.getElementsByClassName('note')[i].remove()
            }
            //clear arrays of all the needed data points
            tmparray = [];
            tmparray1 = [];
            tmparray2 = [];
            tmparray3 = [];
            tmparray4 = [];
            tmparray5 = [];
            iconarray = [];
            timearray = [];
            hoursarray = [];
            graphmin = 30;
            graphmax = 0;
            let day;
        }

        function createData() {
            for (i = 0; i < weatherdata.list.length; i++) {
                timearray.push(Date(weatherdata.list[i].dt_txt))
                let day = new Date(weatherdata.list[i].dt_txt)
                hoursarray.push(day.getHours() + "h")
                tmparray.push(Math.round(weatherdata.list[i].main.temp - 273.15))
                iconarray.push(weatherdata.list[i].weather[0].icon)
                //add the standardized minima and maxima which are the same for each day chart
                graphmin = Math.min(graphmin, tmparray[i])
                graphmax = Math.max(graphmax, tmparray[i])
            }
            graphmin = Math.floor((graphmin - 2) / 5) * 5
            graphmax = Math.ceil((graphmax + 7) / 5) * 5
            graphdif = graphmax - graphmin
            //add passed time on day 1
            addPassedTime();
            //now break up the array in five arrays of one day each
            tmparray1 = tmparray.slice(0, 9);
            tmparray2 = tmparray.slice(8, 17);
            tmparray3 = tmparray.slice(16, 25);
            tmparray4 = tmparray.slice(24, 33);
            tmparray5 = tmparray.slice(32, 41);

            hoursarray1 = hoursarray.slice(0, 9);
        }

        function addPassedTime() {
            //for the first day, add the missing hours that have already passed to the front correcting for timezone
            now = new Date(weatherdata.list[0].dt_txt)
            timeblock = Math.floor((now.getHours() + weatherdata.city.timezone / 3600) / 3) % 8;
            //add null values to passed time on day 1
            for (i = 1; i < timeblock; i++) {
                timearray.unshift(null)
                hoursarray.unshift(now.getHours() - i * 3 + "h")
                tmparray.unshift(null)
                iconarray.unshift(null)
            }
        }
    }

})();