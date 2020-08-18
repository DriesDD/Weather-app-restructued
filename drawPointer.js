
function drawPointer(tmparray1,tmparray2,tmparray3,tmparray4,tmparray5,graphmin,graphmax,graphdif, day, time, label, target) {
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
    target.appendChild(html);
}

export {drawPointer}