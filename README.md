## Welcome
OKEI DA KJØRERN

## TODO
* Fjern all unødvendig drit
* Gjør om resten av sidene og route de
    * EditUser.jsx, EditResponse.jsx, CreateNewUser.jsx, LogPage.jsx, AppListUsers.jsx, AppListMessages.jsx
* Håndtere database logikk i `app.js:27`
    * I ``app.js:57`` ligger det hardkodet brukere som ble brukt istedenfor
* Disable alle buttons etter klikk
## Troubleshooting

* Check parcel version
* Restart parcel (npm start)
* Delete .cache directory
* Run `npm install` - perhaps also delete `node_modules` directory

## Known Issues
Diverse warnings rundt om kring ja atm men de er ufarlige
* Routing fra `LoginPage.jsx` fungerer ikke og sender deg tilbake til `localhost:8080/login?`
* Det blir logget "test" i chrome så det er nok pga at vi ikke har noe database.
 ```
const { handleSubmit: handleLogin, submitting, error } = useSubmit(
                    async () => {
                      await postJson("/api/login", { username, password });
                    },
                    () => history.push("/home"),
                    console.log("test")
                  );```
                      
