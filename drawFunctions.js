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

function DrawPointer(day, time, label, target) 
    {
    let html = document.createElement("div");
    html.classList.add('note');
    let img = document.createElement("img");
    let lbl = document.createTextNode(label);
    const bottom = String(-20 + ((Number((eval('tmparray' + day))[time]) - graphmin) / graphdif) * 80) + '%';
    const left = String(-0 + (100 / 9) * time + 2) + '%';
    const top = String(55 - ((Number((eval('tmparray' + day))[time]) - graphmin) / graphdif) * 80) + '%';
    const right = String(100 - ((100 / 8) * time + 2)) + '%';
    switch (time) {
        case 0:
        case 1:
            img.setAttribute('src', "arrow0.svg");
            html.appendChild(lbl);
            html.appendChild(document.createElement("br"));
            html.appendChild(img);
            html.style.top = top;
            html.style.right = right;
            break;
        case 2:
        case 3:
            img.setAttribute('src', "arrow1.svg");
            html.appendChild(img);
            html.appendChild(document.createElement("br"));
            html.appendChild(lbl);
            html.style.bottom = bottom;
            html.style.left = left;
            break;
        case 4:
        case 5:
        case 6:
            img.setAttribute('src', "arrow2.svg");
            html.appendChild(img);
            html.appendChild(document.createElement("br"));
            html.appendChild(lbl);
            html.style.bottom = bottom;
            html.style.right = right;
            break;
        case 7:
        case 8:
        case 9:
            img.setAttribute('src', "arrow3.svg");
            html.appendChild(lbl);
            html.appendChild(document.createElement("br"));
            html.appendChild(img);
            html.style.top = top;
            html.style.left = left;
            break;

    }
    target.appendChild(html)
}

export {drawBackground,drawPointer}