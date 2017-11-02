import * as React from 'react';

export interface LocationEntity { woeid: number, name: string, country: string }
export interface LocationSearchState { userInput: string, locations: Array<LocationEntity> }
export interface LocationSearchProps extends React.Props<LocationSearch> {
    class: string,
    onSelectLocation: (id: number) => void,
    hideSearchBox: () => void,

}

export class LocationSearch extends React.Component<LocationSearchProps, LocationSearchState> {

    constructor(props: LocationSearchProps) {
        super(props);
        this.state = this.getInitialState();
    }

    getInitialState(): LocationSearchState {
        return { userInput: '', locations: [] };
    }

    componentDidMount() {
        //console.log("LocationSearch::componentDidMount() " + this.state.userInput);

        if (this.state.userInput) {
            console.log("LocationSearch::componentDidMount() update location");
            this.searchLocation(this.state.userInput);
        }
    }

    handleKeyPress(e: any) {
        if (e.key == "Enter") {
            event.preventDefault();
            event.stopPropagation();

            //console.log("LocationSearch::handleKeyPress() " + e.target.value);

            if (e.target.value) this.searchLocation(e.target.value);
        }
    }

    handleClick(woeid: number) {
        if (woeid) {
            console.log(woeid);
            this.props.onSelectLocation(woeid);
        }
    }

    hideSearchBox() {
        this.props.hideSearchBox();
    }

    render() {
        let className = "component-location-search";

        if (this.props.class) className = className + " " + this.props.class;

        return (
            <div className={className}>
                <div className="box-search">
                    <input type="text" onKeyDown={this.handleKeyPress.bind(this)}
                        placeholder="Search your place" className="txt-location" tabIndex={0} autoFocus />
                    <i className="fa fa-search"></i>
                </div>
                <div className="lst-location">
                    {this.state.locations.map(location =>
                        <div key={location.woeid} className="item" onClick={() => this.handleClick(location.woeid)}>
                            <i className="fa fa-map-marker"></i>
                            <div className="title">{location.name}</div>
                            <div className="description">{location.country}</div>
                        </div>
                    )}
                </div>
                <button className="btnCancel" onClick={() => this.hideSearchBox()}>Cancel</button>
            </div>
        );
    }

    //// logic ///////////////////////////////////////////////////////////////////////////////

    async searchLocation(location: string) {
        console.log("LocationSearch::searchLocation() " + location);

        try {
            const url = 'https://query.yahooapis.com/v1/public/yql?q=select%20*%20from%20geo.places%20where%20text%3D%22' + location + '%22&format=json&diagnostics=true&callback=';

            const res = await fetch(url);
            const data = await res.json();

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
            } else {
                this.setState(this.getInitialState());
            }
        } catch (e) {
            console.log("Forecast::fetchData() " + e.message);
            this.setState(this.getInitialState());
        }
    }
}

const mapToLocations = (arr: any): LocationEntity[] => {
    return arr.map(mapToLocation);
}

const mapToLocation = (loc: any): LocationEntity => {
    if (loc.locality1 && loc.locality1.woeid) {
        return {
            woeid: loc.locality1.woeid,
            name: loc.locality1.content,
            country: loc.country.content
        }
    }

    return {
        woeid: 0,
        name: "",
        country: ""
    }
}