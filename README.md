# ezbrev-frontend

EzBrev is a service that allows inspection of Brevmaler. This is the frontend
of that service. The backend can be found at
<https://github.com/navikt/ezbrev-backend>

The frontend consists of a react-based SPA that is hosted by an nginx-server in
a docker-container. It is hosted in the dev-fss-cluster. This project is
currently not deployed to any production environment, and is intended for
internal use only.


# Local development

You must have `node` installed to run this project locally.

## Setup

Install dependencies by running `npm ci -q`.

Start development server by running `npm start`. This runs the frontend locally
on your machine, while the backend is ezbrev-backend in q4. This will also
start `test:watch` and `lint:watch`, which will run all tests and lint your
code on each recompile. When the server is ready `http://localhost:3000` will
open in your default browser. Webpack/react-refresh enables state to be kept
when source file are reloaded. The dev-server will usually automatically
recover in case of any compilation errors.

## Additional information on linting

To run only lint use `npm run lint`. You can manually format files with
prettier with `npm run lint -- --fix`, or you can install a prettier-plugin in
your favourite editor.

## Tests

Mocha test are run with `npm run test`.

To run individual tests, add grep option: `mocha --compilers js:babel-core/register ./src/js/test/*.js --grep "string in: describe or it"`
