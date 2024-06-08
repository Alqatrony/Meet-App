/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable jsx-a11y/anchor-has-content */
import React, { Component } from 'react';
import meetIcon from "./images/meet-event.png"
import add_icon from "./images/add-circle-outline.svg";

class Event extends Component {
    state = {
        collapsed: true,
    };

    handleClick = () => {
        this.setState({ collapsed: !this.state.collapsed })
    };


    toggleBtnText = () => {
        return `${this.state.collapsed 
            ? 'SHOW DETAILS'
            : 'HIDE DETAILS'
        }`;
    };

    render() {
        const { event } = this.props;

        return (
            <div className={this.state.collapsed !== true ? 'event active' : 'event'}>
                <a href={event.htmlLink} className="calendar-link" target="_blank" rel="noreferrer">
                    <img  alt='addIcon' style={{ Width:'24px' ,height:'24px' }} src={add_icon} className="add_icon"></img> 
                    <span>See details on Google Calendar</span>
                </a>
                <img alt='event-img' className='event-img' src = {meetIcon}/>
                <h3 className="title">{event.summary}</h3>
                <div className="fb-date-location">
                    <p className="start-time">
                        {event.start.dateTime.slice(0,10)}                  
                    </p>
                    
                    <p className="location">{event.location}</p>
                    <p className="event-details">
                        {event.description}                       
                    </p>
                </div>
                <a className='btn-toggle-details' onClick={this.handleClick}> {this.toggleBtnText()} </a>
            </div>
        );
    }
}
export default Event;