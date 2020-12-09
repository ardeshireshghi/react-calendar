## Next.js React calendar

This is a small Calendar app written in Next.js which integrates with Google calendar and pulls the event data.

## Project Status

This project is under development. As far as the current features are concerned, it pulls the `primary` Google calendar data. The current build does not support multiple calendars and toggling between calendar events.

## Project Screen Shot(s)

![alt text](https://raw.githubusercontent.com/ardeshireshghi/react-calendar/main/assets/app-screenshot.png)

## Installation and Setup Instructions

Clone down this repository. You will need `node > 10.13` and `npm` installed globally on your machine.

Installation:

`npm install`

To Run Test Suite:

`npm test`

To Start Server:

`npm run dev`

To Visit App:

`localhost:3000/`

## Reflection and Technical considerations

### Implementation choices and tools

In terms of the implementation, there were key decision points:

#### 1. Choose `create-react-app` vs. `Next.js`

Having worked with `create-react-app` that was the first choice that came to mind. However, having read
some documents and the uncertainty I had about integration with Google API (assumed that there will be a need for secret management), led to choosing `Next.js` which was relatively new to me. So there was a bit of learning curve there. I haven't done a proper performace test to see if SSR really adds more benefits comparing to CSR.

I assume that it needs to be optimised in production and
run as a cluster otherwise because of the nature of Node (single thread), it could hold the event loop while rendering.

#### 2. Integrate with Google API for Authorization

This initially felt like an easy task as the snippet was provided by Google. But there was some challenge to integrate that to Next.js/React ecosystem as there was timing issue with loading an `async` and `defer` script as a `<script>` tag in body and handling load
event in React. This led to creating a HOC which wrapped a hook `useGoogleCalendar` to wrap the Next.js custom App component `_app.js` which took a while.

#### 3. Using `styled-component` vs. plain CSS and SASS

Again I went outside of my comfort zone and tried to use this a learning opportunity. Having read some comparisons and realising that in most modern React projects `styled-components` are used, the decision was to use that over SASS with BEM which is my typical goto approach. I am not sure how well I used `styled-components` or whether I have used best design patterns. It will be good to get some feedback on that.

#### 4. Using a date helper or use good old `Date`

I was hoping I could make use of `Intl.DateTimeFormat` so I decided to not go for `moment` as the date helper. So ended up re-writing many date related functions from scratch. I think this could have been avoided.

### Notes and considerations


1. Test coverage can be improved. I usually write tests for each component. But it proved to be really time-consuming. So at some point, I decided to not cover everything. Below is the current coverage:

```
--------------------------------|---------|----------|---------|---------|-------------------
File                            | % Stmts | % Branch | % Funcs | % Lines | Uncovered Line #s
--------------------------------|---------|----------|---------|---------|-------------------
All files                       |   95.71 |    56.76 |   97.01 |   95.71 |
```

As seen, not all the branches of code have been tested.

2. Some of the features that I intended to do are left for now:

* Multi calendar support
* All day events are not covered

3. These were some of my challenges:

- Making Google Calendar sign-in work easily with `Next.js`
- Using `Next.js` and `styled-components` for the first time

4. Other tools used:

- React
- Jest
- Prettier
- testing-library (React)
