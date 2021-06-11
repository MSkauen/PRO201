# Welcome!

## How to run
* Run command ' npm install '
* Run command ' npm run start '
* Go to localhost:8080 in browser.
* For troubleshooting, see "troubleshooting" in this file

## TODO

* Disable all buttons on click
* Add numbers to all parts respectively in LogPage
* Add tab indexes to all elements for easier navigation
* Implement tracking of course progression
    * POST request on video completion
        * (In progress)
    * Callback on video completion implemented!
* Refactor some css and variable names
* Modal now uses useEffect, a lot of duplicate code still, should be extracted
* Jest!
   
## Troubleshooting

* Check parcel version
* Restart parcel (npm start)
* Delete .cache directory
* Run `npm install` - perhaps also delete `node_modules` directory
* Check that dbconfig.js is present in src/db/

## Known Issues
* react-dom.development.js:67 Warning: Can't perform a React state update on an unmounted component. This is a no-op, but it indicates a memory leak in your application. To fix, cancel all subscriptions and asynchronous tasks in a useEffect cleanup function.
      at LoginPage
