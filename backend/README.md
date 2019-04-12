# dashboard-backend-gu

Dashboard backend for TLA based on express, typescript and Mongo

## Installing

### Node

The project requires Node.js.
After having installed Node, go into the directory and from the console run

```bash
npm install
```

### Environment

In the project packages, dotenv is used so it is probably the easiest approach to define those environment variables in a .env file.
An example .env file can be found in the file "devenv". Simply copying and renaming this file to .env gives you the minimum starting requirements.

The backend depends on a MongoDB database to run.
For connecting to the database, the environment variables

DB_URI
DB_PASSWORD
DB_USERNAME
DB_NAME

are expected.
## Running

Run

```bash
npm start
```

to start the server
