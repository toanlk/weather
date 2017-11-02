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
const Location_1 = __webpack_require__(6);
const LocationSearch_1 = __webpack_require__(7);
//// Class ///////////////////////////////////////////////////////////////////////////////
class Main extends React.Component {
    constructor(props) {
        super(props);
        this.displaySearchBox = () => {
            console.log('Show search box');
            this.setState({ is_search_on: true });
        };
        this.selectLocation = (woeid) => {
            console.log('Change location: ' + woeid);
            this.fetchData(woeid);
        };
        this.state = this.getInitialState();
    }
    getInitialState() {
        return {
            location: {
                id: 663350,
                name: "Ilmenau"
            },
            current: [],
            forecast: {
                0: { temp: 7, text: "Cloudy", day: "" },
                1: { temp: 7, text: "Cloudy", day: "" },
                2: { temp: 7, text: "Cloudy", day: "" },
            },
            is_search_on: false
        };
    }
    componentDidMount() {
        console.log("Main::componentDidMount() " + this.state.location);
        this.fetchData(this.state.location.id);
    }
    render() {
        let searchClass = this.state.is_search_on ? "" : "hide";
        console.log("Main::render() " + this.state.location);
        return (React.createElement("div", { className: "component-app" },
            React.createElement(LocationSearch_1.LocationSearch, { class: searchClass, onSelectLocation: this.selectLocation }),
            React.createElement(Location_1.Location, { class: searchClass, location: this.state.location.name, clickHandler: this.displaySearchBox }),
            React.createElement(Forecast_1.Forecast, { class: searchClass, current: this.state.current, forecast: this.state.forecast })));
    }
    //// logic ///////////////////////////////////////////////////////////////////////////////
    fetchData(woeid) {
        return __awaiter(this, void 0, void 0, function* () {
            let url = "https://query.yahooapis.com/v1/public/yql?q=select%20*%20from%20weather.forecast%20where%20woeid%3D" + woeid + "%20and%20u%3D'c'&format=json&diagnostics=true&callback=";
            try {
                const res = yield fetch(url);
                const data = yield res.json();
                //let data = require("../storage/data.json");
                const result = data.query.results.channel;
                //console.log(result);
                let location_name = result.location.city + ', ' + result.location.country;
                //console.log(location_name);
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
                this.setState({
                    location: {
                        id: woeid,
                        name: location_name
                    },
                    current: current_cond,
                    forecast: forecast_cond,
                    is_search_on: false
                });
            }
            catch (e) {
                console.log("Forecast::fetchData() " + e.message);
            }
        });
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
        console.log(text);
        if (!className)
            className = " wi-cloud";
        return "wi " + className;
    }
    render() {
        let className = "component-forecast";
        if (!this.props.class)
            className = className + " hide";
        //console.log(this.props.forecast);
        return (React.createElement("div", { className: className },
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
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const React = __webpack_require__(0);
class Location extends React.Component {
    handleClick() {
        this.props.clickHandler();
    }
    render() {
        let className = "component-location";
        if (!this.props.class)
            className = className + " hide";
        console.log("Location::render() " + this.props.location);
        return (React.createElement("div", { className: className },
            React.createElement("i", { className: "fa fa-map-marker" }),
            this.props.location,
            React.createElement("i", { className: "fa fa-bars", onClick: () => this.handleClick() })));
    }
}
exports.Location = Location;


/***/ }),
/* 7 */
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
class LocationSearch extends React.Component {
    constructor(props) {
        super(props);
        this.state = this.getInitialState();
    }
    getInitialState() {
        return { userInput: '', locations: [] };
    }
    componentDidMount() {
        //console.log("LocationSearch::componentDidMount() " + this.state.userInput);
        if (this.state.userInput) {
            console.log("LocationSearch::componentDidMount() update location");
            this.searchLocation(this.state.userInput);
        }
    }
    handleKeyPress(e) {
        if (e.key == "Enter") {
            event.preventDefault();
            event.stopPropagation();
            //console.log("LocationSearch::handleKeyPress() " + e.target.value);
            if (e.target.value)
                this.searchLocation(e.target.value);
        }
    }
    handleClick(woeid) {
        if (woeid) {
            console.log(woeid);
            this.props.onSelectLocation(woeid);
        }
    }
    render() {
        let className = "component-location-search";
        if (this.props.class)
            className = className + " " + this.props.class;
        return (React.createElement("div", { className: className },
            React.createElement("div", { className: "box-search" },
                React.createElement("input", { type: "text", onKeyDown: this.handleKeyPress.bind(this), placeholder: "Search your place", className: "txt-location", tabIndex: 0, autoFocus: true }),
                React.createElement("i", { className: "fa fa-search" })),
            React.createElement("div", { className: "lst-location" }, this.state.locations.map(location => React.createElement("div", { key: location.woeid, className: "item", onClick: () => this.handleClick(location.woeid) },
                React.createElement("i", { className: "fa fa-map-marker" }),
                React.createElement("div", { className: "title" }, location.name),
                React.createElement("div", { className: "description" }, location.country))))));
    }
    //// logic ///////////////////////////////////////////////////////////////////////////////
    searchLocation(location) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log("LocationSearch::searchLocation() " + location);
            try {
                const url = 'https://query.yahooapis.com/v1/public/yql?q=select%20*%20from%20geo.places%20where%20text%3D%22' + location + '%22&format=json&diagnostics=true&callback=';
                const res = yield fetch(url);
                const data = yield res.json();
                const results = data.query.results.place;
                console.log(results);
                if (results && Array.isArray(results)) {
                    let locations = mapToLocations(results);
                    if (locations) {
                        // remove duplicate items
                        locations = locations.filter((obj, pos, arr) => {
                            return arr.map(mapObj => mapObj['woeid']).indexOf(obj['woeid']) === pos && obj['woeid'] != 0;
                        });
                        this.setState({ userInput: location, locations: locations });
                    }
                }
                else {
                    this.setState(this.getInitialState());
                }
            }
            catch (e) {
                console.log("Forecast::fetchData() " + e.message);
                this.setState(this.getInitialState());
            }
        });
    }
}
exports.LocationSearch = LocationSearch;
const mapToLocations = (arr) => {
    return arr.map(mapToLocation);
};
const mapToLocation = (loc) => {
    if (loc.locality1 && loc.locality1.woeid) {
        return {
            woeid: loc.locality1.woeid,
            name: loc.locality1.content,
            country: loc.country.content
        };
    }
    return {
        woeid: 0,
        name: "",
        country: ""
    };
};


/***/ })
/******/ ]);
//# sourceMappingURL=bundle.js.map