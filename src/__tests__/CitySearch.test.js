import React from 'react';
import { shallow } from 'enzyme';
import CitySearch from '../CitySearch';
import { mockData } from '../mock-data';
import { extractLocations } from '../api';

describe('<CitySearch /> component', () => {
    let locations, CitySearchWrapper;
    beforeAll(() => {
        locations = extractLocations(mockData);
        CitySearchWrapper = shallow(<CitySearch locations={locations} updateEvents={() => {}} />);
    });

    /* -------------------------------------------------------------------
            FEATURE 1: FILTER EVENTS BY CITY
    ---------------------------------------------------------------------*/

    /* ----------------- SCENARIO 1 --------------------------------------: 
    By default, when a user hasn’t searched for a city, show upcoming events 
    from all locations.
    ---------------------------------------------------------------------*/
    test('Render text input', () => {
        expect(CitySearchWrapper.find('.city')).toHaveLength(1);
    });

    /* ----------------- SCENARIO 2 --------------------------------------: 
    User should see a list of suggestions when they search for a city.
    ---------------------------------------------------------------------*/
    test('Renders a list of suggestions', () => {
        expect(CitySearchWrapper.find('.suggestions')).toHaveLength(1);
    });

    test('Renders text input correctly', () => {
        const query = CitySearchWrapper.state('query');
        expect(CitySearchWrapper.find('.city').prop('value')).toBe(query);
    });

    test('Change state when text input changes', () => {
        CitySearchWrapper.setState({query: 'Munich'});
        const eventObject = { target: { value: 'Berlin' }};
        CitySearchWrapper.find('.city').simulate('change', eventObject);
        expect(CitySearchWrapper.state('query')).toBe('Berlin');
    });

    test('Render list of suggestions correctly', () => {
        CitySearchWrapper.setState({ suggestions: locations });
        const suggestions = CitySearchWrapper.state('suggestions');
        expect(CitySearchWrapper.find('.suggestions li')).toHaveLength(suggestions.length + 1);
        for (let i = 0; i < suggestions.length; i += 1) {
            expect(CitySearchWrapper.find('.suggestions li').at(i).text()).toBe(suggestions[i]);
        }
    });

    test('Suggestion list match the query when changed', () => {
        CitySearchWrapper.setState({ query: '', suggestions: [] });
        CitySearchWrapper.find(".city").simulate("change", {target: { value: "Berlin" }});
        const query = CitySearchWrapper.state("query");
        const filteredLocations = locations.filter((location) => {
            return location.toUpperCase().indexOf(query.toUpperCase()) > -1;
        });
        expect(CitySearchWrapper.state("suggestions")).toEqual(filteredLocations);
    });

    /* ----------------- SCENARIO 3 --------------------------------------: 
    User can select a city from the list of suggestions.
    ---------------------------------------------------------------------*/
    test('Selecting a suggestion should change query state', () => {
        CitySearchWrapper.setState({query: 'Berlin'});
        const suggestions = CitySearchWrapper.state('suggestions');
        /*
            This click event will be dealt with in the handleItemClicked() function
            where you use this.props.updateEvents() to call the updateEvents() function 
            of the parent component (App). 
            Back when you wrote this test in “CitySearch.test.js,” however, you didn’t 
            expect the updateEvents() prop to be passed. Fortunately, this is an easy fix, 
            as you can simply pass an empty function (updateEvents={() => { }}) into it 
            by way of the shallow rendering API (more specifically, in the line where you 
            declared CitySearchWrapper in the beforeAll section in “CitySearch.test.js”).
        */
        CitySearchWrapper.find('.suggestions li').at(0).simulate('click');
        expect(CitySearchWrapper.state("query")).toBe(suggestions[0]);
    });

    test('Selecting CitySearch input reveals the suggestions list', () => {
        CitySearchWrapper.find('.city').simulate('focus');
        expect(CitySearchWrapper.state('showSuggestions')).toBe(true);
        expect(CitySearchWrapper.find('.suggestions').prop('style')).not.toEqual({ display: 'none' });
    });

    test('Selecting a suggestion should hide the suggestions list', () => {
        CitySearchWrapper.setState({
            query: 'Berlin',
            showSuggestions: undefined
        });
        CitySearchWrapper.find('.suggestions li').at(0).simulate('click');
        expect(CitySearchWrapper.state('showSuggestions')).toBe(false);
        expect(CitySearchWrapper.find('.suggestions').prop('style')).toEqual({ display: 'none' });
    });
});