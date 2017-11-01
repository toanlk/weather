import * as React from 'react';

import { Forecast } from "./Forecast";

export interface MainState { location: string, current: any, forecast: any }
export interface MainProps extends React.Props<Main> { }

export class Main extends React.Component<MainProps, MainState> {

    constructor(props: MainProps) {
        super(props);
        this.state = this.getInitialState();
    }

    getInitialState(): MainState {
        return {
            location: '',
            current: [],
            forecast: {
                0: {temp: 7, text: "Cloudy", day: ""},
                1: {temp: 7, text: "Cloudy", day: ""},
                2: {temp: 7, text: "Cloudy", day: ""},
            }
        }
    }

    componentDidMount() {
        let woeid = 663350;
        this.fetchData(woeid);
    }

    async fetchData(woeid: number) {
        let url = "https://query.yahooapis.com/v1/public/yql?q=select%20*%20from%20weather.forecast%20where%20woeid%3D" + woeid + "%20and%20u%3D'c'&format=json&diagnostics=true&callback=";
        
        try {
            //const res = await fetch(url);
            //const data = await res.json();

            let data = require("../storage/data.json");

            const result = data.query.results.channel;
            console.log(result);

            let fLocation = result.location.city + ', ' + result.location.country;
            console.log(fLocation);

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

            this.setState({ location: fLocation, current: current_cond, forecast: forecast_cond });
        } catch (e) {
            console.log("Forecast::fetchData() " + e.message);
        }
    }

    render() {
        return (
            <div className='component-app'>
                <Forecast location={this.state.location} current={this.state.current} forecast={this.state.forecast}/>
            </div>
        );
    }
}