------Group A Repository------

------How to run------ To set up application go to /etc/hosts and map 127.0.0.1 to my.api. To run the application, use the command 'npm start' within this directory. App will start at https://my.api:50001.

------Technologies----- Main technologies: Node.js, Express.js, libraries: https://github.com/KainosAcademyGroupA2021/Group_A_BackEnd/blob/main/package.json

------Swagger------ To update the swagger file with new route changes, run the command 'node swagger.js' Then ensure backend service is running 'npm start'

To visit swagger go to the following url 'https://my.api:50001/doc/'

First authorize using a bearer token which you can get on the Job Views Roles console, once logged in or using method method getTokenSilently from Auth0 library.

Only get requests currently work that dont require admin access. All Admin requests dont work on swagger, however you can still view details about each request.

------Tests------ To run unit tests currently on the backend service, run the command 'npm test' To run performance tests, run the command 'artillery run performanceTests.yml'

------Autharization---- All routes are protected using two middlewares checkJwt and checkScopes or adminCheckScopes. First one checks corectness of JWT token and the second one looks for appropriate scope in the token. 

------General Support------ If a package is missing such as artillery for example run the command 'npm install packageName' below are useful links for node and npm https://docs.npmjs.com/getting-started https://treehouse.github.io/installation-guides/mac/node-mac.html https://phoenixnap.com/kb/install-node-js-npm-on-windows