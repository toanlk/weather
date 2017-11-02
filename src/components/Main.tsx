import * as React from 'react';

import { Forecast } from "./Forecast";
import { Location } from "./Location";
import { LocationSearch } from "./LocationSearch";

//// Props and States /////////////////////////////////////////////////////////////////////

export interface MainState { location: any, current: any, forecast: any, is_search_on: boolean }
export interface MainProps extends React.Props<Main> { }

//// Class ///////////////////////////////////////////////////////////////////////////////

export class Main extends React.Component<MainProps, MainState> {

    constructor(props: MainProps) {
        super(props);
        this.state = this.getInitialState();
    }

    getInitialState(): MainState {
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
        }
    }

    componentDidMount() {
        console.log("Main::componentDidMount() " + this.state.location);
        this.fetchData(this.state.location.id);
    }

    displaySearchBox = () => {
        console.log('Show search box');
        this.setState({ is_search_on: true });
    }

    hideSearchBox = () => {
        console.log('Hide search box');
        this.setState({ is_search_on: false });
    }

    selectLocation = (woeid: number) => {
        console.log('Change location: ' + woeid);
        this.fetchData(woeid);
    }

    render() {
        let searchClass = this.state.is_search_on ? "" : "hide";

        console.log("Main::render() " + this.state.location);

        return (
            <div className="component-app">
                <LocationSearch class={searchClass} onSelectLocation={this.selectLocation} hideSearchBox={this.hideSearchBox} />
                <Location class={searchClass} location={this.state.location.name} clickHandler={this.displaySearchBox} />
                <Forecast class={searchClass} current={this.state.current} forecast={this.state.forecast} />
            </div>
        );
    }

    //// logic ///////////////////////////////////////////////////////////////////////////////

    async fetchData(woeid: number) {

        let url = "https://query.yahooapis.com/v1/public/yql?q=select%20*%20from%20weather.forecast%20where%20woeid%3D" + woeid + "%20and%20u%3D'c'&format=json&diagnostics=true&callback=";

        try {
            const res = await fetch(url);
            const data = await res.json();

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
            }

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
            }

            this.setState({
                location: {
                    id: woeid,
                    name: location_name
                },
                current: current_cond,
                forecast: forecast_cond,
                is_search_on: false
            });
        } catch (e) {
            console.log("Forecast::fetchData() " + e.message);
        }
    }
}