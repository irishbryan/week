# Week
A React powered calendar that can be used to track events for current week.

:information_source: Project was created as part of an interview assignment and is provided here for reference only.

![assignment](https://user-images.githubusercontent.com/311182/49975837-7b5d7d80-fef4-11e8-949a-e14a49af9411.gif)

| Contents |
|:---------|
| [Assignment Instructions](#assignment-instructions) |
| [Getting Started](#getting-started) |
| [Overview](#overview) |

## Assignment Instructions
Full instructions can be found in [calendar-widget.pdf](./calendar-widget.pdf).

## Getting Started
This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app). To run locally, execute the following commands:

 1. `npm install`
 2. `npm start`

## Overview
The React application was initially configured using [Create React App](https://github.com/facebook/create-react-app) and it uses [redux](https://redux.js.org/) for state management. An overview of the React component structure can be seen in the following diagram.

![image](https://user-images.githubusercontent.com/311182/49975722-fc684500-fef3-11e8-978f-958ee3121bc4.png)

### State Overview
There are two redux reducers, `calendar` and `event`. 

The `calendar` portion of state consists of data needed to render the current week, based on client system time, and stores the following:

| Element | Notes |
|:--------|:------|
| `currentDate` | Used to provide efficient access to current date. |
| `days` | Array of date objects representing current week |
| `timeOfDaySegments` | Array of strings representing 48 time segments in day, requirements specified 30 minute segments |


The `event` portion of state stores all information relating to events, and is structured as follows:

| Element | Notes |
|:--------|:------|
| `nextID` | The use of numeric consecutive IDs was mentioned in requirements and the decision was made to simply track `nextID` in redux to avoid possible collisions. |
| `events` | Object representing all events, keyed by `id` to simplify update and delete actions. In production environment it's likely a more time specific key structure would be used.|

### Calendar Construction
Once calendar data is added to the redux state, it's relatively straight forward to render a week view, similar to those seen on [Google Calendar](google.com/calendar).

A future enhancement would be to allow for viewing of time periods other than the current week.

### Display of Events
Events are positioned by performing arithmetic related to the start time and duration of each event.

 - The `duration` of an event dictates the height of the element, based on number of time segments it spans.
 - The `start` of an event dictates how far from the top of the `Day` component it should be placed.

### Ommissions
The following ommissions merit specific mention as they were not included due to time constraints.

 - Events that share the same time period are not laid out correctly.
 - The text area for event name doesn't currently expand as the user types.
 - Some code related to positioning of events merits refactoring, something that would be addressed if goal was to make calendar responsive.

### Improvement Thoughts

| Areas for Improvement | Notes |
|:----------------------|:------|
| Improve `events` data model in redux | Currently events are stored in a simple dictionary that is indexed using the `id` of an event, making it easy to update events upon edit. A future improvement would likely index events based on time they occupy, such as `day`, that way it'd be easier to retrieve all days for a specific day or time period. View this as a future production enhancement. |
| Support for events that span multiple days | Currently events cannot span multiple days, leading to a cumbersome experience. The reason they are not supported right now is due to technical difficulties having an event block render across multiple day columns in the UI |
| Lay out of events that occupy same time period | This is proving ticky to implement and will require more research or support from a team member, the key challenge is dynamically figuring out the size of the container that would wrap multiple events that occupy the same time period. |
| Allow selecting of different date ranges | For this proof of concept the time period displayed is always the current week, based on the client date. A requirement for a production version of this product, assuming the goal is to provide a robust calendar experience, will be ability to select alternate time periods. |
| Make responsive | Rendering of calendar time segments and positioning of events is not dynamic enough. See [`Event.js`](/src/components/Event.js) for reference. |
| Performance improvements | In the interest of shipping a MVP (Minimal Viable Product) little time was spent optimizing the libraries used or the data structures employed in this application. For example, arithmetic related to start time and duration of events makes liberal use of [`moment.js`](http://momentjs.com/) when it's likely more efficient to avoid converting standard `Date` objects into another instance of a `moment` object. |
