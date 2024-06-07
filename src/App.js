import React, { Component } from 'react';
import './App.css';
import EventList from './EventList';
import CitySearch from './CitySearch';
import NumberOfEvents from './NumberOfEvents';
import EventGenre from "./EventGenre";
import { extractLocations, getEvents, checkToken, getAccessToken } from './api';
import {ScatterChart, Scatter, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer} from 'recharts';
import './nprogress.css';
import WelcomeScreen from './WelcomeScreen';


class App extends Component {

    constructor(){
        super();
        this.state = {
          events: [],
          locations: [],
          numberOfEvents: 32,
          seletedLocation: 'all',
          showWelcomeScreen: undefined
        }
      }

      async componentDidMount() {
        this.mounted = true;
        const accessToken = localStorage.getItem('access_token');
        const isTokenValid = (await checkToken(accessToken)).error ? false : true;
        const searchParams = new URLSearchParams(window.location.search);
        const code = searchParams.get('code');
        this.setState({ showWelcomeScreen: !(code || isTokenValid) });
        if ((code || isTokenValid) && this.mounted) {
          getEvents().then((events) => {
            if (this.mounted) {
              this.setState({ events, locations: extractLocations(events) });
            }
          });
        }
        if (!navigator.onLine) {
          this.setState({
            warningText:
              "It seems that you're not connected to the internet, your data was loaded from the cache.",
          });
        } else {
          this.setState({
            warningText: '',
          });
        }
      }

    componentWillUnmount(){
        this.mounted = false;
    }

    updateEvents = (location, maxNumEvents) => {
        if (maxNumEvents === undefined) {
            maxNumEvents = this.state.numberOfEvents;
        } else(
            this.setState({ numberOfEvents: maxNumEvents })
        )
        if (location === undefined) {
            location = this.state.seletedLocation;
        }
        getEvents().then((events) => {
            let locationEvents = (location === 'all') 
                ? events 
                : events.filter((event) => event.location === location);
            const isOffline = navigator.onLine ? false : true;
            this.setState({
                events: locationEvents.slice(0, maxNumEvents),
                numberOfEvents: maxNumEvents,
                seletedLocation: location,
                offlineInfo: isOffline
                    ? "No internet connection. Data is loaded from cache."
                    : null
            });
        });
    }

    getData = () => {
      let { locations, events } = this.state;
      let data = locations.map((location) => {
        let number = events.filter(
          (event) => event.location === location
        ).length;
        let city = location.split(', ').shift()
        city = city.split('- ').shift()
        return { city, number };
      });
  
      data = data.filter(data => (data.number >= 1))
      return data;
    };

    render() {
      if (this.state.showWelcomeScreen === undefined) return <div className='App' />;
        return (
          <div className="App">
            <div className='head-section'>
              <h1 className="app-name">Meet App</h1>
              <h3 className="subtitle">Choose your nearest city and see the upcoming events:</h3>
              <CitySearch locations={this.state.locations} updateEvents={this.updateEvents}/>
              <NumberOfEvents
              numberOfEvents={this.state.numberOfEvents}
              updateEvents={this.updateEvents}
              />
            </div>
            <div className='container'>
              <div className="data-vis-wrapper">
              <EventGenre events={this.state.events} />
                <h4>Events in each city</h4>
                <ResponsiveContainer height={400} >
                  <ScatterChart
                      margin={{top: 20, right: 60, bottom: 20, left: 20}}
                  >
                    <CartesianGrid className="grid"/>
                    <XAxis 
                        type="category" 
                        dataKey="city" 
                        name="stature" />
                    <YAxis 
                        type="number" 
                        dataKey="number" 
                        name="number of events"
                        allowDecimals={false}/>
                    <Tooltip cursor={{ strokeDasharray: '3 3' }} />
                    <Scatter 
                        data={this.getData()} 
                        fill="#ff7b8e" />
                  </ScatterChart>
                </ResponsiveContainer>
                    <EventList events={this.state.events} />
              </div>
            </div>
              <WelcomeScreen showWelcomeScreen={this.state.showWelcomeScreen} getAccessToken={() => { getAccessToken() }} />
          </div>
        );
    }
}

export default App;