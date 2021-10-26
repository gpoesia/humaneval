This repository is a scaffold for implementing flexible human evaluations. It uses:

- [React.js](https://reactjs.org/) for implementing the front-end.
- [Node.js](https://nodejs.org/) for implementing the back-end.
- [Next.js](https://nextjs.org/) for coordinating front-end and back-end, running the server, etc.
- [MongoDB](https://www.mongodb.com/) as a database.
- [MaterialUI](https://mui.com/) as a React component library.

## Getting started

First, run a MongoDB instance:

```bash
mkdir db
mongod --dbpath=./db
```

The application can be executed in development mode with:

```bash
npx next dev
```

Then, open [http://localhost:3000](http://localhost:3000) to see the result.

## Structure

Each stage of the app is a "page" implemented in the `pages` directory.
The pattern is that each page interacts with the user, records relevant data,
then moves on to the next.

Back-end API functions are under `pages/api`. These can choose which content
is given to each user at what stage, and also record interactions to the database.

`lib` contains library functions. `lib/component` contains React components that are
only available in the client. Pages dynamically load these components when needed.
(this separation is necessary because of boring reasons related to server-side rendering and Next.js).

`lib/data.js` contains the database model for a user session. Add stuff you want to record
here, and see how the existing library functions retrieve and edit user sessions.

## Deployment

For deploying your human study, first push the code to the server where you'll host it, and then
build it in production mode there:

```bash
npx next build
# Start the production server on an open address on the specified port.
npx next start -H 0.0.0.0 -p 8888
```

You can get your data out as a simple JSON file by running `mongoexport` on the server:

```bash
mongoexport --db your-db --collection usersessions --jsonArray --out=my-data.json
```

That's it!
