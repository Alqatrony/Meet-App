import React, { Component } from 'react';
import { InfoAlert } from './Alert';

class CitySearch extends Component {
    constructor(){
        super();
        this.state = {
          query: '',
          infoText: "",
          suggestions: [],
          showSuggestions: undefined
        }
    }

    handleInputChanged = (event) => {
        const value = event.target.value;
        this.setState({ showSuggestions: true });
        const suggestions = this.props.locations.filter((location) => {
            return location.toUpperCase().indexOf(value.toUpperCase()) > -1;
        });
        if (suggestions.length === 0){
            this.setState({
              query: value,
              infoText: `Is there No event in "${value}". Please try another city`,
            });
          } else {
            return this.setState({
              query: value,
              suggestions,
              infoText: "",
            });
        }
    };

    handleItemClicked = (suggestion) => {
        this.setState({
            query: suggestion,
            suggestions: [],
            showSuggestions: false,
            infoText: "",
        });

        this.props.updateEvents(suggestion);
    }

    render() {
        return (
            <div className="CitySearch">
                <InfoAlert text={this.state.infoText} />
                <p>Choose desired city:</p>
                <input
                    type="text"
                    placeholder="Select city:"
                    className="city"
                    value={this.state.query}
                    onChange={this.handleInputChanged}
                    onFocus={() => { this.setState({ showSuggestions: true }) }}
                    onBlur={() => { this.setState({ showSuggestions: false }) }}
                />
                <ul 
                    className="suggestions"
                    style={this.state.showSuggestions 
                        ? {}
                        : { display: 'none' }
                    }>
                    {
                        this.state.suggestions.map((suggestion) => (
                            <li
                                className="suggestions-item"
                                key={suggestion}
                                onMouseDown={() => this.handleItemClicked(suggestion)}>{suggestion}
                            </li>
                        ))
                    }
                    <li className="suggestions-all" key="all" onMouseDown={() => this.handleItemClicked("all")}>
                        <b>See all cities</b>
                    </li>
                </ul>
            </div>
        );
    }
}

export default CitySearch;