import * as React from 'react';

export interface ForecastProps extends React.Props<Forecast> { location: string, current: any, forecast: any }

export class Forecast extends React.Component<ForecastProps> {

    map_class(text: string) {
        let className = "wi-day-lightning";

        let class_map = require("../storage/weather-class-map.json");

        if (text) {
            let grade: string = text.toString().toLowerCase();

            className = Object.keys(class_map).filter(function(key) {return class_map[key] === grade})[0];
        }

        return "wi " + className;
    }

    render() {
        console.log(this.props.forecast);
        
        return (
            <div className="component-forecast">
                <div className="location">{this.props.location}</div>
                <div className="current">
                    <i className={this.map_class(this.props.current.text)}></i>
                    <div className="time">Today</div>
                    <div className="temp">{this.props.current.temp}<sup>o</sup></div>
                    <div className="text">{this.props.current.text}</div>
                    <div className="wind">Wind: {this.props.current.wind} km/h</div>
                    <div className="humidity">Humidity: {this.props.current.humidity}%</div>
                </div>
                <div className="current day">
                    <div className="time">{this.props.forecast[0].day}</div>
                    <div className="temp">{this.props.forecast[0].temp}<sup>o</sup></div>
                </div>
                <div className="current evening">
                    <div className="time">{this.props.forecast[1].day}</div>
                    <div className="temp">{this.props.forecast[1].temp}<sup>o</sup></div>
                </div>
                <div className="current night">
                    <div className="time">{this.props.forecast[2].day}</div>
                    <div className="temp">{this.props.forecast[2].temp}<sup>o</sup></div>
                </div>
            </div>
        );
    }
}