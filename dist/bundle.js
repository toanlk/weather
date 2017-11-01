/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 1);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports) {

module.exports = React;

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const React = __webpack_require__(0);
const ReactDOM = __webpack_require__(2);
const Main_1 = __webpack_require__(3);
ReactDOM.render(React.createElement(Main_1.Main, null), document.getElementById("root"));


/***/ }),
/* 2 */
/***/ (function(module, exports) {

module.exports = ReactDOM;

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const React = __webpack_require__(0);
const Forecast_1 = __webpack_require__(4);
class Main extends React.Component {
    constructor(props) {
        super(props);
        this.state = this.getInitialState();
    }
    getInitialState() {
        return {
            location: '',
            current: [],
            forecast: {
                0: { temp: 7, text: "Cloudy", day: "" },
                1: { temp: 7, text: "Cloudy", day: "" },
                2: { temp: 7, text: "Cloudy", day: "" },
            }
        };
    }
    componentDidMount() {
        let woeid = 663350;
        this.fetchData(woeid);
    }
    fetchData(woeid) {
        return __awaiter(this, void 0, void 0, function* () {
            let url = "https://query.yahooapis.com/v1/public/yql?q=select%20*%20from%20weather.forecast%20where%20woeid%3D" + woeid + "%20and%20u%3D'c'&format=json&diagnostics=true&callback=";
            try {
                //const res = await fetch(url);
                //const data = await res.json();
                let data = __webpack_require__(6);
                const result = data.query.results.channel;
                console.log(result);
                let fLocation = result.location.city + ', ' + result.location.country;
                console.log(fLocation);
                let current_cond = {
                    temp: result.item.condition.temp,
                    text: result.item.condition.text,
                    wind: Math.round(result.wind.speed),
                    humidity: result.atmosphere.humidity,
                };
                let forecast_cond = {
                    0: {
                        temp: result.item.forecast[1].low,
                        text: result.item.forecast[1].text,
                        day: result.item.forecast[1].day,
                    },
                    1: {
                        temp: result.item.forecast[2].low,
                        text: result.item.forecast[2].text,
                        day: result.item.forecast[2].day,
                    },
                    2: {
                        temp: result.item.forecast[3].low,
                        text: result.item.forecast[3].text,
                        day: result.item.forecast[3].day,
                    },
                };
                this.setState({ location: fLocation, current: current_cond, forecast: forecast_cond });
            }
            catch (e) {
                console.log("Forecast::fetchData() " + e.message);
            }
        });
    }
    render() {
        return (React.createElement("div", { className: 'component-app' },
            React.createElement(Forecast_1.Forecast, { location: this.state.location, current: this.state.current, forecast: this.state.forecast })));
    }
}
exports.Main = Main;


/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const React = __webpack_require__(0);
class Forecast extends React.Component {
    map_class(text) {
        let className = "wi-day-lightning";
        let class_map = __webpack_require__(5);
        if (text) {
            let grade = text.toString().toLowerCase();
            className = Object.keys(class_map).filter(function (key) { return class_map[key] === grade; })[0];
        }
        return "wi " + className;
    }
    render() {
        console.log(this.props.forecast);
        return (React.createElement("div", { className: "component-forecast" },
            React.createElement("div", { className: "location" }, this.props.location),
            React.createElement("div", { className: "current" },
                React.createElement("i", { className: this.map_class(this.props.current.text) }),
                React.createElement("div", { className: "time" }, "Today"),
                React.createElement("div", { className: "temp" },
                    this.props.current.temp,
                    React.createElement("sup", null, "o")),
                React.createElement("div", { className: "text" }, this.props.current.text),
                React.createElement("div", { className: "wind" },
                    "Wind: ",
                    this.props.current.wind,
                    " km/h"),
                React.createElement("div", { className: "humidity" },
                    "Humidity: ",
                    this.props.current.humidity,
                    "%")),
            React.createElement("div", { className: "current day" },
                React.createElement("div", { className: "time" }, this.props.forecast[0].day),
                React.createElement("div", { className: "temp" },
                    this.props.forecast[0].temp,
                    React.createElement("sup", null, "o"))),
            React.createElement("div", { className: "current evening" },
                React.createElement("div", { className: "time" }, this.props.forecast[1].day),
                React.createElement("div", { className: "temp" },
                    this.props.forecast[1].temp,
                    React.createElement("sup", null, "o"))),
            React.createElement("div", { className: "current night" },
                React.createElement("div", { className: "time" }, this.props.forecast[2].day),
                React.createElement("div", { className: "temp" },
                    this.props.forecast[2].temp,
                    React.createElement("sup", null, "o")))));
    }
}
exports.Forecast = Forecast;


/***/ }),
/* 5 */
/***/ (function(module, exports) {

module.exports = {"wi-yahoo-0":"tornado","wi-yahoo-1":"day-storm-showers","wi-yahoo-2":"hurricane","wi-yahoo-3":"thunderstorm","wi-yahoo-4":"thunderstorm","wi-yahoo-5":"rain-mix","wi-yahoo-6":"rain-mix","wi-yahoo-7":"rain-mix","wi-yahoo-8":"hail","wi-yahoo-9":"showers","wi-yahoo-10":"hail","wi-yahoo-11":"showers","wi-yahoo-12":"showers","wi-yahoo-13":"snow","wi-yahoo-14":"day-snow","wi-yahoo-15":"snow-wind","wi-yahoo-16":"snow","wi-yahoo-17":"hail","wi-yahoo-18":"rain-mix","wi-yahoo-19":"dust","wi-yahoo-20":"fog","wi-yahoo-21":"windy","wi-yahoo-22":"smoke","wi-yahoo-23":"strong-wind","wi-yahoo-24":"strong-wind","wi-yahoo-25":"snowflake-cold","wi-yahoo-26":"cloudy","wi-yahoo-27":"night-cloudy","wi-yahoo-28":"day-cloudy","wi-yahoo-29":"night-cloudy","wi-yahoo-30":"day-cloudy","wi-yahoo-31":"night-clear","wi-yahoo-32":"day-sunny","wi-yahoo-33":"night-partly-cloudy","wi-yahoo-34":"day-sunny-overcast","wi-yahoo-35":"rain-mix","wi-yahoo-36":"hot","wi-yahoo-37":"day-storm-showers","wi-yahoo-38":"day-storm-showers","wi-yahoo-39":"day-storm-showers","wi-yahoo-40":"showers","wi-yahoo-41":"snow-wind","wi-yahoo-42":"snow","wi-yahoo-43":"snow-wind","wi-yahoo-44":"day-sunny-overcast","wi-yahoo-45":"day-storm-showers","wi-yahoo-46":"snow","wi-yahoo-47":"day-storm-showers","wi-yahoo-3200":"stars"}

/***/ }),
/* 6 */
/***/ (function(module, exports) {

module.exports = {"query":{"count":1,"created":"2017-11-01T12:12:42Z","lang":"en-US","diagnostics":{"publiclyCallable":"true","url":{"execution-start-time":"0","execution-stop-time":"4","execution-time":"4","content":"http://weather-ydn-yql.media.yahoo.com:4080/v3/public/weather/rss?u=c&w=663350"},"user-time":"4","service-time":"4","build-version":"2.0.203"},"results":{"channel":{"units":{"distance":"km","pressure":"mb","speed":"km/h","temperature":"C"},"title":"Yahoo! Weather - Ilmenau, TH, DE","link":"http://us.rd.yahoo.com/dailynews/rss/weather/Country__Country/*https://weather.yahoo.com/country/state/city-663350/","description":"Yahoo! Weather for Ilmenau, TH, DE","language":"en-us","lastBuildDate":"Wed, 01 Nov 2017 01:12 PM CET","ttl":"60","location":{"city":"Ilmenau","country":"Germany","region":" TH"},"wind":{"chill":"41","direction":"230","speed":"22.53"},"atmosphere":{"humidity":"91","pressure":"32306.16","rising":"0","visibility":"23.82"},"astronomy":{"sunrise":"7:9 am","sunset":"4:50 pm"},"image":{"title":"Yahoo! Weather","width":"142","height":"18","link":"http://weather.yahoo.com","url":"http://l.yimg.com/a/i/brand/purplelogo//uh/us/news-wea.gif"},"item":{"title":"Conditions for Ilmenau, TH, DE at 12:00 PM CET","lat":"50.6838","long":"10.91973","link":"http://us.rd.yahoo.com/dailynews/rss/weather/Country__Country/*https://weather.yahoo.com/country/state/city-663350/","pubDate":"Wed, 01 Nov 2017 12:00 PM CET","condition":{"code":"26","date":"Wed, 01 Nov 2017 12:00 PM CET","temp":"7","text":"Cloudy"},"forecast":[{"code":"12","date":"01 Nov 2017","day":"Wed","high":"7","low":"3","text":"Rain"},{"code":"28","date":"02 Nov 2017","day":"Thu","high":"10","low":"5","text":"Mostly Cloudy"},{"code":"28","date":"03 Nov 2017","day":"Fri","high":"7","low":"3","text":"Mostly Cloudy"},{"code":"28","date":"04 Nov 2017","day":"Sat","high":"10","low":"4","text":"Mostly Cloudy"},{"code":"39","date":"05 Nov 2017","day":"Sun","high":"8","low":"5","text":"Scattered Showers"},{"code":"28","date":"06 Nov 2017","day":"Mon","high":"6","low":"3","text":"Mostly Cloudy"},{"code":"30","date":"07 Nov 2017","day":"Tue","high":"5","low":"2","text":"Partly Cloudy"},{"code":"30","date":"08 Nov 2017","day":"Wed","high":"6","low":"2","text":"Partly Cloudy"},{"code":"28","date":"09 Nov 2017","day":"Thu","high":"5","low":"2","text":"Mostly Cloudy"},{"code":"28","date":"10 Nov 2017","day":"Fri","high":"8","low":"3","text":"Mostly Cloudy"}],"description":"<![CDATA[<img src=\"http://l.yimg.com/a/i/us/we/52/26.gif\"/>\n<BR />\n<b>Current Conditions:</b>\n<BR />Cloudy\n<BR />\n<BR />\n<b>Forecast:</b>\n<BR /> Wed - Rain. High: 7Low: 3\n<BR /> Thu - Mostly Cloudy. High: 10Low: 5\n<BR /> Fri - Mostly Cloudy. High: 7Low: 3\n<BR /> Sat - Mostly Cloudy. High: 10Low: 4\n<BR /> Sun - Scattered Showers. High: 8Low: 5\n<BR />\n<BR />\n<a href=\"http://us.rd.yahoo.com/dailynews/rss/weather/Country__Country/*https://weather.yahoo.com/country/state/city-663350/\">Full Forecast at Yahoo! Weather</a>\n<BR />\n<BR />\n<BR />\n]]>","guid":{"isPermaLink":"false"}}}}}}

/***/ })
/******/ ]);
//# sourceMappingURL=bundle.js.map