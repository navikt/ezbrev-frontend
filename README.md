# Setup 

Install nodejs

# Dev Guide

***Important! Open shell/terminal as administrator***

Install dependencies by running `npm install`

Start development server by running `npm start`.
This will start `test:watch` and `lint:watch` in addition to webpack. 
When the server is ready `http://localhost:3000` will open in your default browser.
Webpack enables state to be kept when source file are reloaded. 
Restart of dev_server is not required on compilation errors (amend to gulp build). 

# Lint

To run only lint use `npm run lint`

# Test

Mocha test are run with `npm run test`. 

To run individual tests, add grep option: `mocha --compilers js:babel-core/register ./src/js/test/*.js --grep "string in: describe or it"`