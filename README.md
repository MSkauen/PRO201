## Welcome
OKEI DA KJØRERN

## TODO
* Disable alle buttons etter klikk
* Add numbers to all parts respectively in LogPage
* Check if course and its courseParts are unlocked or not
    * Add lock image as in homepage
* Add back button to all pages for easier navigation
* Add tab indexes to all elements for easier navigation
* Implement tracking of courseprogress
* Refactor some css and variable names
* Modal needs rework, use useState and components instead of a function call

## Troubleshooting

* Check parcel version
* Restart parcel (npm start)
* Delete .cache directory
* Run `npm install` - perhaps also delete `node_modules` directory

## Known Issues
* react-dom.development.js:67 Warning: Can't perform a React state update on an unmounted component. This is a no-op, but it indicates a memory leak in your application. To fix, cancel all subscriptions and asynchronous tasks in a useEffect cleanup function.
      at LoginPage
* react-dom.development.js:67 Warning: Functions are not valid as a React child. This may happen if you return a Component instead of <Component /> from render. Or maybe you meant to call this function rather than return it.
      at LoginPage