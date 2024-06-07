import React, { Component } from 'react';
import {ErrorAlert} from './Alert';

class NumberOfEvents extends Component {
    
    constructor() {
        super();
        this.state = {
            numberOfEvents: 32
        }
    };
    
    handleInputChanged = (event) => {
        let actValue = event.target.value
        if (actValue > 0 && actValue <= 32) {
            this.setState({ 
                numberOfEvents: actValue,
                errorText: ''
             });
        } else {
            this.setState({ 
                numberOfEvents: event.target.value,
                errorText: '' 
            });
            actValue = 1;
        }
        this.props.updateEvents(undefined, actValue);
    };

    render() {

        return (
            <div>            
                <div className="numberOfEvents">
                <ErrorAlert className="errorAlert" text={this.state.errorText} /> 
                    <label htmlFor="number-of-events">Show max: </label>                                
                    <input
                        type="number"
                        className="number-of-events"
                        min="1" 
                        max="32"
                        value={this.state.numberOfEvents}
                        onChange={this.handleInputChanged}
                    />
                </div>
            </div>
            
        );
    }
}

export default NumberOfEvents;