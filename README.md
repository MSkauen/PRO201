## Welcome
OKEI DA KJØRERN

* Express vil si i fra på terminalen når serveren er oppe samt hvor du finner den.
    * Standard vil dette være ``localhost:8080``

## To-Do
* POST request on video completion
 
   (In progress!)
* Disable alle buttons etter klikk
* Refactor some css and variable names
* Modal now uses useEffect, a lot of duplicate code still, should be extracted
   
## Feilsøking

* Sjekk parcel versjon
* Restart parcel (npm start)
* Slett .parcel-cache 
* Run `npm install` - og prøv også å slette `node_modules` mappen

## Kjente feil
* react-dom.development.js:67 Warning: Can't perform a React state update on an unmounted component. This is a no-op, but it indicates a memory leak in your application. To fix, cancel all subscriptions and asynchronous tasks in a useEffect cleanup function.
      at LoginPage
