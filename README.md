
# ![logo](/src/images/meet-logo.png) MEET-APP

The Meet-App is allow users to find upcoming events in his city or nearest city, the app is serverless, progressive web application (PWA) created with React and using a test-driven development (TDD) technique. The application uses the Google Calendar API to fetch upcoming events.

## Built with:
- HTML, CSS, JavaScript
- React
- Cucumber (acceptance testing)
- Jest (unit and integration testing)
- Puppeteer (end-to-end testing)
- AWS Lambda (cloud provider)
- Recharts (library for data visualisation)
- Axios (library for asynchronous calls to the Google Calendar API)


## Key features:
- Filter events by city
- Show/hide event details
- Specify number of events
- Use the app when offline
- Add an app shortcut to the home screen
- View a chart showing the number of upcoming events by city

---
# User stories and scenarios
---

### **Feature 1: Filter events by city**

*User story: 
    As a user I should be able to “filter events by city” so that I can see the list of events that take place in that city.*

    Scenario: When user hasn’t searched for a city, show upcoming events from all cities.
        Given user hasn’t searched for any city
        When the user opens the app
        Then the user should see the list of upcoming events.

    Scenario: User should see a list of suggestions when they search for a city
        Given the main page is open
        When the user starts typing in the city textbox
        Then the user should receive a list of cities (suggestions) that match what they’ve typed

    Scenario: User can select a city from the suggested list
        Given user was typing “Berlin” in the city textbox
        And the list of suggested cities is showing
        When the user selects a city (e.g., “Berlin, Germany”) from the list
        Then their city should be changed to that city (i.e., “Berlin, Germany”)
        And the user should receive a list of upcoming events in that city


### **Feature 2: Show/hide an event's details**

*User story: 
    As a user I should be able to show/hide an event's detail, so that I can control which details I am shown.*

	Scenario: An event element is collapsed by default.
        Given A collapsed event element containing events is loaded on the page.
        When  The user opens the app and performs no action.
        Then The event element is collapsed by default.

    Scenario: User can expand an event to see its details.
        Given The event list and event elements have loaded.
        When The user clicks on a  details button in the event element.
        Then The event element expands to show details about the specific event chosen.

    Scenario: User can collapse an event to hide its details.
        Given The event element is showing the event details.
        When The user clicks on the details button again.
        Then The event details part of the event elemnt is collapsed.

### **Feature 3: Specify number of events**

*User story: 
    As a user I should be able to specify the number of events so that the number of shown events is limited.*

	Scenario: When user has not specified a number, 32 is the default number.
        Given The app has loaded
        When The user has yet to choose a number of events in the input box.
        Then A default number of 32 events is loaded on the page.

    Scenario: User can change the number of events they want to see.
        Given The app has loaded.
        When User changes the number of events in the input box.
        Then The event list elements shows the number of events set by the user.