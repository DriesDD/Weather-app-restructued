// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles
parcelRequire = (function (modules, cache, entry, globalName) {
  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof parcelRequire === 'function' && parcelRequire;
  var nodeRequire = typeof require === 'function' && require;

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire = typeof parcelRequire === 'function' && parcelRequire;
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error('Cannot find module \'' + name + '\'');
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = cache[name] = new newRequire.Module(name);

      modules[name][0].call(module.exports, localRequire, module, module.exports, this);
    }

    return cache[name].exports;

    function localRequire(x){
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x){
      return modules[name][1][x] || x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [function (require, module) {
      module.exports = exports;
    }, {}];
  };

  var error;
  for (var i = 0; i < entry.length; i++) {
    try {
      newRequire(entry[i]);
    } catch (e) {
      // Save first error but execute all entries
      if (!error) {
        error = e;
      }
    }
  }

  if (entry.length) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(entry[entry.length - 1]);

    // CommonJS
    if (typeof exports === "object" && typeof module !== "undefined") {
      module.exports = mainExports;

    // RequireJS
    } else if (typeof define === "function" && define.amd) {
     define(function () {
       return mainExports;
     });

    // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }

  // Override the current require with this new one
  parcelRequire = newRequire;

  if (error) {
    // throw error from earlier, _after updating parcelRequire_
    throw error;
  }

  return newRequire;
})({"getWeatherData.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getWeatherData = getWeatherData;

async function getWeatherData(url) {
  const response = await fetch(url);
  return response.json();
}

;
},{}],"drawBackground.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.drawBackground = drawBackground;

var _getWeatherData = require("/getWeatherData.js");

async function drawBackground(city) {
  let photodata;
  const startcity = city;
  document.getElementById("background").style = "background-color: black; background-image: none";
  await setTimeout(() => {}, 500); //check if after 500 ms the search is still the same, if yes do the api call

  if (city == startcity) {
    photodata = await (0, _getWeatherData.getWeatherData)('https://api.unsplash.com/photos/random?client_id=p2RsPWAavBwh-hvyW9GzFInfh3S3PC7W7VnLkTG6wVo&query=' + city + '%20sky&orientation=landscape');
    document.getElementById("background").style = "background-color: #668; background-image: url(" + photodata.urls.regular + ")";
  }
}
},{"/getWeatherData.js":"getWeatherData.js"}],"drawPointer.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.drawPointer = drawPointer;

function drawPointer(tmparray, graphmin, graphdif, time, label, target) {
  let html = document.createElement("div");
  html.classList.add('note');
  let img = document.createElement("img");
  let lbl = document.createTextNode(label);
  const bottom = String(-20 + (Number(tmparray[time]) - graphmin) / graphdif * 80) + '%';
  const left = String(-0 + 100 / 9 * time + 2) + '%';
  const top = String(55 - (Number(tmparray[time]) - graphmin) / graphdif * 80) + '%';
  const right = String(100 - (100 / 8 * time + 2)) + '%';

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
},{}],"getWeatherUrl.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getWeatherUrl = getWeatherUrl;

function getWeatherUrl(city) {
  if (document.getElementById("placeholder").innerText.length - 4 < document.getElementById('inputcity').value.length) {
    document.getElementById("placeholder").innerText = "";
  }

  return 'https://api.openweathermap.org/data/2.5/forecast?q=' + city + '&mode=xmly&appid=48a8b4741cc8cb086ca2bbffc8c983cb';
}
},{}],"index.js":[function(require,module,exports) {
"use strict";

var _drawBackground = require("/drawBackground.js");

var _drawPointer = require("/drawPointer.js");

var _getWeatherData = require("/getWeatherData.js");

var _getWeatherUrl = require("/getWeatherUrl.js");

//wrap all in a global function
(() => {
  let i, j, city, weatherdata, tmparray, iconarray, timearray, hoursarray, now, timeblock, graphmin, graphmax, graphdif, tmparray1, tmparray2, tmparray3, tmparray4, tmparray5, tempweatherdata, hoursarray1;
  tmparray1 = [], tmparray2 = [], tmparray3 = [], tmparray4 = [], tmparray5 = [], document.getElementById('inputcity').value = localStorage.getItem("StoredCity");
  city = document.getElementById('inputcity').value;
  setForecast(); //new forecast on input

  document.getElementById('inputcity').oninput = () => {
    city = document.getElementById('inputcity').value;
    setForecast();
  };

  async function setForecast() {
    tempweatherdata = await (0, _getWeatherData.getWeatherData)((0, _getWeatherUrl.getWeatherUrl)(city)); //set current city and country so we can then check if they aren't identical to the ones we just looked up

    let activecity, activecountry;

    if (weatherdata === undefined) {
      activecity = 'placeholder';
      activecountry = 'placeholder';
    } else {
      activecity = weatherdata.city.name;
      activecountry = weatherdata.city.country;
    }

    if (tempweatherdata.city != undefined && tempweatherdata.city.name + tempweatherdata.city.country != activecity + activecountry) {
      weatherdata = tempweatherdata;
      localStorage.setItem("StoredCity", document.getElementById('inputcity').value);
      document.getElementById("placeholder").innerText = weatherdata.city.name + ", " + weatherdata.city.country;
      drawForecast();
    }
  }

  function drawForecast() {
    (0, _drawBackground.drawBackground)(city);
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
                fontSize: 20
              }
            }],
            xAxes: {
              ticks: {
                fontSize: 40
              }
            }
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
      });
    }

    function drawDayText() {
      let day = 0;
      const weekdays = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday']; //add the day and a brief forecast

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
          day = weekdays[day.getDay()];
      }

      if (weatherdata.list[i * 8 - 11] != undefined && weatherdata.list[i * 8 - 6] != undefined) {
        document.getElementById('day' + i).innerText = day + ": " + weatherdata.list[i * 8 - 11].weather[0].description + " to " + weatherdata.list[i * 8 - 6].weather[0].description;
      } else {
        document.getElementById('day' + i).innerText = day + " is a beautiful day with " + weatherdata.list[i * 8 - 6].weather[0].description;
      }
    }

    function drawDayIcons() {
      let daymax = -1000;
      let daymaxtime = null; //draw symbols on top of the graph

      const target = document.getElementById('chart' + i).parentElement;

      for (j = 0; j < 9; j++) {
        if (iconarray[(i - 1) * 8 + j] != null) {
          let html = document.createElement("div");
          html.classList.add('note');
          html.classList.add('icon');
          let img = document.createElement("img");
          img.style.width = '60px';
          const bottom = "calc(-6px + " + String((Number(eval('tmparray' + i)[j]) - graphmin) / graphdif * 90 + 0) + '%)';
          const left = String(-5 + 100 / 8.3 * j + 2) + '%';
          img.setAttribute('src', "http://openweathermap.org/img/wn/" + iconarray[(i - 1) * 8 + j] + "@2x.png");
          html.appendChild(img);
          html.style.bottom = bottom;
          html.style.left = left;
          target.appendChild(html);

          if (Number(eval('tmparray' + i)[j]) > daymax) {
            daymax = Number(eval('tmparray' + i)[j]);
            daymaxtime = j;
          }
        }
      }

      addTmpPointers();

      function addTmpPointers() {
        (0, _drawPointer.drawPointer)(eval('tmparray' + i), graphmin, graphdif, daymaxtime, String(daymax) + '°C', document.getElementById('chart' + i).parentElement);
        (0, _drawPointer.drawPointer)(eval('tmparray' + i), graphmin, graphdif, 8, String(eval('tmparray' + i)[8]) + '°C', document.getElementById('chart' + i).parentElement);
      }
    }

    function clearData() {
      //clear icons
      for (i = document.getElementsByClassName('note').length - 1; i >= 0; i--) {
        document.getElementsByClassName('note')[i].remove();
      } //clear arrays of all the needed data points


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
        timearray.push(Date(weatherdata.list[i].dt_txt));
        let day = new Date(weatherdata.list[i].dt_txt);
        hoursarray.push(day.getHours() + "h");
        tmparray.push(Math.round(weatherdata.list[i].main.temp - 273.15));
        iconarray.push(weatherdata.list[i].weather[0].icon); //add the standardized minima and maxima which are the same for each day chart

        graphmin = Math.min(graphmin, tmparray[i]);
        graphmax = Math.max(graphmax, tmparray[i]);
      }

      graphmin = Math.floor((graphmin - 2) / 5) * 5;
      graphmax = Math.ceil((graphmax + 7) / 5) * 5;
      graphdif = graphmax - graphmin; //add passed time on day 1

      addPassedTime(); //now break up the array in five arrays of one day each

      tmparray1 = tmparray.slice(0, 9);
      tmparray2 = tmparray.slice(8, 17);
      tmparray3 = tmparray.slice(16, 25);
      tmparray4 = tmparray.slice(24, 33);
      tmparray5 = tmparray.slice(32, 41);
      hoursarray1 = hoursarray.slice(0, 9);
    }

    function addPassedTime() {
      //for the first day, add the missing hours that have already passed to the front correcting for timezone
      now = new Date(weatherdata.list[0].dt_txt);
      timeblock = Math.floor((now.getHours() + weatherdata.city.timezone / 3600) / 3) % 8; //add null values to passed time on day 1

      for (i = 1; i < timeblock; i++) {
        timearray.unshift(null);
        hoursarray.unshift(now.getHours() - i * 3 + "h");
        tmparray.unshift(null);
        iconarray.unshift(null);
      }
    }
  }
})();
},{"/drawBackground.js":"drawBackground.js","/drawPointer.js":"drawPointer.js","/getWeatherData.js":"getWeatherData.js","/getWeatherUrl.js":"getWeatherUrl.js"}],"../../../../../../usr/lib/node_modules/parcel-bundler/src/builtins/hmr-runtime.js":[function(require,module,exports) {
var global = arguments[3];
var OVERLAY_ID = '__parcel__error__overlay__';
var OldModule = module.bundle.Module;

function Module(moduleName) {
  OldModule.call(this, moduleName);
  this.hot = {
    data: module.bundle.hotData,
    _acceptCallbacks: [],
    _disposeCallbacks: [],
    accept: function (fn) {
      this._acceptCallbacks.push(fn || function () {});
    },
    dispose: function (fn) {
      this._disposeCallbacks.push(fn);
    }
  };
  module.bundle.hotData = null;
}

module.bundle.Module = Module;
var checkedAssets, assetsToAccept;
var parent = module.bundle.parent;

if ((!parent || !parent.isParcelRequire) && typeof WebSocket !== 'undefined') {
  var hostname = "" || location.hostname;
  var protocol = location.protocol === 'https:' ? 'wss' : 'ws';
  var ws = new WebSocket(protocol + '://' + hostname + ':' + "44893" + '/');

  ws.onmessage = function (event) {
    checkedAssets = {};
    assetsToAccept = [];
    var data = JSON.parse(event.data);

    if (data.type === 'update') {
      var handled = false;
      data.assets.forEach(function (asset) {
        if (!asset.isNew) {
          var didAccept = hmrAcceptCheck(global.parcelRequire, asset.id);

          if (didAccept) {
            handled = true;
          }
        }
      }); // Enable HMR for CSS by default.

      handled = handled || data.assets.every(function (asset) {
        return asset.type === 'css' && asset.generated.js;
      });

      if (handled) {
        console.clear();
        data.assets.forEach(function (asset) {
          hmrApply(global.parcelRequire, asset);
        });
        assetsToAccept.forEach(function (v) {
          hmrAcceptRun(v[0], v[1]);
        });
      } else if (location.reload) {
        // `location` global exists in a web worker context but lacks `.reload()` function.
        location.reload();
      }
    }

    if (data.type === 'reload') {
      ws.close();

      ws.onclose = function () {
        location.reload();
      };
    }

    if (data.type === 'error-resolved') {
      console.log('[parcel] ✨ Error resolved');
      removeErrorOverlay();
    }

    if (data.type === 'error') {
      console.error('[parcel] 🚨  ' + data.error.message + '\n' + data.error.stack);
      removeErrorOverlay();
      var overlay = createErrorOverlay(data);
      document.body.appendChild(overlay);
    }
  };
}

function removeErrorOverlay() {
  var overlay = document.getElementById(OVERLAY_ID);

  if (overlay) {
    overlay.remove();
  }
}

function createErrorOverlay(data) {
  var overlay = document.createElement('div');
  overlay.id = OVERLAY_ID; // html encode message and stack trace

  var message = document.createElement('div');
  var stackTrace = document.createElement('pre');
  message.innerText = data.error.message;
  stackTrace.innerText = data.error.stack;
  overlay.innerHTML = '<div style="background: black; font-size: 16px; color: white; position: fixed; height: 100%; width: 100%; top: 0px; left: 0px; padding: 30px; opacity: 0.85; font-family: Menlo, Consolas, monospace; z-index: 9999;">' + '<span style="background: red; padding: 2px 4px; border-radius: 2px;">ERROR</span>' + '<span style="top: 2px; margin-left: 5px; position: relative;">🚨</span>' + '<div style="font-size: 18px; font-weight: bold; margin-top: 20px;">' + message.innerHTML + '</div>' + '<pre>' + stackTrace.innerHTML + '</pre>' + '</div>';
  return overlay;
}

function getParents(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return [];
  }

  var parents = [];
  var k, d, dep;

  for (k in modules) {
    for (d in modules[k][1]) {
      dep = modules[k][1][d];

      if (dep === id || Array.isArray(dep) && dep[dep.length - 1] === id) {
        parents.push(k);
      }
    }
  }

  if (bundle.parent) {
    parents = parents.concat(getParents(bundle.parent, id));
  }

  return parents;
}

function hmrApply(bundle, asset) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (modules[asset.id] || !bundle.parent) {
    var fn = new Function('require', 'module', 'exports', asset.generated.js);
    asset.isNew = !modules[asset.id];
    modules[asset.id] = [fn, asset.deps];
  } else if (bundle.parent) {
    hmrApply(bundle.parent, asset);
  }
}

function hmrAcceptCheck(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (!modules[id] && bundle.parent) {
    return hmrAcceptCheck(bundle.parent, id);
  }

  if (checkedAssets[id]) {
    return;
  }

  checkedAssets[id] = true;
  var cached = bundle.cache[id];
  assetsToAccept.push([bundle, id]);

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    return true;
  }

  return getParents(global.parcelRequire, id).some(function (id) {
    return hmrAcceptCheck(global.parcelRequire, id);
  });
}

function hmrAcceptRun(bundle, id) {
  var cached = bundle.cache[id];
  bundle.hotData = {};

  if (cached) {
    cached.hot.data = bundle.hotData;
  }

  if (cached && cached.hot && cached.hot._disposeCallbacks.length) {
    cached.hot._disposeCallbacks.forEach(function (cb) {
      cb(bundle.hotData);
    });
  }

  delete bundle.cache[id];
  bundle(id);
  cached = bundle.cache[id];

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    cached.hot._acceptCallbacks.forEach(function (cb) {
      cb();
    });

    return true;
  }
}
},{}]},{},["../../../../../../usr/lib/node_modules/parcel-bundler/src/builtins/hmr-runtime.js","index.js"], null)
//# sourceMappingURL=/Weather-app-restructured.e31bb0bc.js.map