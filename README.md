# GroupA
------Group A Repository------

------How to run------
To run the application, use the command 'npm start' within this directory

------Swagger------
To update the swagger file with new route changes, run the command 'node swagger.js'
Then ensure backend service is running 'npm start'

To visit swagger go to the following url 'https://my.api:50001/doc/'

First authorize using a bearer token which you can get on the Job Views Roles console, once logged in

Only get requests currently work that dont require admin access. All Admin requests dont work on swagger, however you can still view details about each request.

------Tests------
To run unit tests currently on the backend service, run the command 'npm test'
To run performance tests, run the command 'artillery run performanceTests.yml'


------General Support------
If a package is missing such as artillery for example run the command 'npm install packageName'
below are useful links for node and npm
https://docs.npmjs.com/getting-started
https://treehouse.github.io/installation-guides/mac/node-mac.html
https://phoenixnap.com/kb/install-node-js-npm-on-windows
