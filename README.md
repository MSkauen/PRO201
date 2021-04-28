Setting up a react application:

1. `npm start` to start application
2. Server should now be running at ``http://localhost:3000``
3. To get started click on `Login` / `Profile` or `Create user`
    1. Login straight away using `admin` `123456`
    2. All new users have `123456` hardcoded as password
4. Click `List users` to get an overview or to edit users.
5. Click `List messages` to see all messages this user has recieved.
    1. Simply click the message to respond
6. Use `Create message` to send a new message
    1. Separate recipients by using a seperator, such as `,`

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
 from my own HttpException while userinfo was being successfully retrieved, and I wasted much time trying to fix this. To be able to finish the rest of the functionality 
 I had to rollback a lot of changes and decided to use the Local strategy for login instead of the google authentication.
* In hindsight im 100% sure I could have implemeted this fully with some better preparation.
* The login button provided by my ErrorView component now sends you to /login instead of api/login which was used for google auth earlier.
* I wish had more time to refactor some duplicate code, but that had to be less prioritized.