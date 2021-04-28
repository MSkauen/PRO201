## Welcome
The initial plan for this project was creating more of a Messenger type app, less than an email service.
Yet I was overambitious and ended up struggling on time.

I'm not quite sure I got the naming conventions and folder structure for the different
components as such in React quite right, but its neat at least.

All in all this was quite the fun exam, and I'll definitely be using more react for future projects.


Setting up the react application:

1. `npm start` to start application
2. Server should now be running at ``http://localhost:3000``
3. To get started click on `Login` / `Profile`
    1. Login straight away using `admin` `123456`
    2. All new users have `123456`  as password
4. Or click `Create user` to create a new one
5. `List users` shows an overview of the users, click to edit.
6. `Messages` to see all messages this user has received
    1. Or click the message to make a response
7. Use `Send message` to create a new message
    1. Separate recipients by using a separator, such as `,`
    2. Logged in users can only see their own messages
8. ``Profile page`` asks you to login and provides a login button for redirect

## Troubleshooting

* Check parcel version
* Restart parcel (npm start)
* Delete .cache directory
* Run `npm install` - perhaps also delete `node_modules` directory

## Known Issues
* Too low test coverage as well as not comprehensive enough tests.
* ~~While using TestRenderer.Act and .Create for testing and results in ``Error: Can't access .root on unmounted test renderer``.~~
* ~~A workaround for this was using the old try/catch you see in _ApplistMessages.jsx_ instead of ``` setMessages(await messageApi.listMessages()); ``` which is not optimal~~
* ~~I recreated the issue using a clone from working lecture and could not get it to work.~~
* I had troubles with jest running tests while I had css import on the different components.
I fixed this by using a ModuleMapper under jest in ``package.json`` as well as a mock file which does nothing.

* After implementing google auth I had troubles the next day getting the callback to store the access_key which resulted in a 401 error
 from my own HttpException while userinfo was being successfully retrieved, and I wasted much time trying to fix this. To be able to finish the rest of the functionality 
 I had to rollback a lot of changes and decided to use the Local strategy as login instead of the Google authentication.
* In hindsight im 100% sure I could have implemented this fully with some better preparation, and I'm definitely using it for future projects.
* I do wish had put off more time to refactoring, but that had to be less prioritized.
* If you pay enough attention to my otherwise poorly described commit messages, you can actually see my mind slowly deteriorating.