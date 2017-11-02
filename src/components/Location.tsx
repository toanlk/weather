import * as React from 'react';

export interface LocationProps extends React.Props<Location> { class: string, location: string, clickHandler: () => void }

export class Location extends React.Component<LocationProps> {
    handleClick() {
        this.props.clickHandler();
    }

    render() {
        let className = "component-location";
        
        if(!this.props.class) className = className + " hide";

        console.log("Location::render() "+this.props.location);
        
        return (
            <div className={className}>
                <i className="fa fa-map-marker"></i>{this.props.location}
                <i className="fa fa-bars" onClick={() => this.handleClick()}></i>
            </div>
        );
    }
}