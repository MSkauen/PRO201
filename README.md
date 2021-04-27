Setting up a react application:

1. `npm start` to start application
2. Server should now be running at ``http://localhost:3000``
3. To get started click on `Login` / `Profile` or `Create user`
    1. Login straight away using `admin` `123456`
    2. All new users have `123456` hardcoded as password
4. Use `List users` to get an overview or edit users.
5. 

The React application should now be running.

## Troubleshooting

* Check parcel version
* restart parcel (npm start)
* Delete .cache directory
* Run `npm install` - perhaps also delete `node_modules` directory

## Known Issues
* While using TestRenderer.Act and .Create for testing and results in ``Error: Can't access .root on unmounted test renderer``
* A workaround for this was using the old try/catch you see in _ApplistMessages.jsx_ instead of ``` setMessages(await messageApi.listMessages()); ``` which is not optimal
* I recreated the issue using a clone from working lecture and could not get it to work.
* After successfully implementing google auth I had troubles the next day getting the callback to store the access_key which resulted in a 401 error
 from my own HttpException and I wasted much time trying to fix this. To be able to finish the rest of the functionality I had to rollback a lot of changes and decided to use the Local strategy for login instead.
* The login button provided by my ErrorView component now sends you to /login instead of api/login which was used for google auth earlier.
* I wish had more time to refactor some duplicate code, but that had to be less prioritized.