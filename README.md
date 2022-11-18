# Northcoders News API

This repository is for a RESTful api built with Javascript in Node.js, and uses PostGreSQL as a database. The API is built using the Express.js framework, and was developed using **Test Driven Development (TDD)**, using both Jest and Supertest packages to test end-to-end.

The database features the following tables:

- users
- articles
- comments
- topics

All available endpoints and their responses are listed [here](https://dp-api.cyclic.app/api). This API is hosted on Cyclic and uses ElephantSQL to host the database.

### INITIAL SET UP

In order to use this repository, please follow the steps below:

1.  Clone this repository to your own machine.
2.  Create a new public GitHub repository, and do not initialise the project with a readme, .gitignore or license.
3.  From your local copy of your repository, push your code to your new respository using the following commands:

    - git remote set-url origin YOUR_NEW_REPO_URL_HERE
    - git branch -M main
    - git push -u origin main

4.  Run 'npm install' to install all required production and development dependencies. These are as follows:

        "devDependencies": {
            "husky": "^7.0.0",
            "jest": "^27.5.1",
            "jest-extended": "^2.0.0",
            "jest-sorted": "^1.0.14",
            "pg-format": "^1.0.4",
            "supertest": "^6.3.1"
        },
        "dependencies": {
            "dotenv": "^16.0.0",
            "express": "^4.18.2",
            "pg": "^8.7.3"
        }

5.  Create a .env file called **.env.development** with the following code:

- PGDATABASE=nc_news

6. Create a .env file called **.env.test** with the following code:

- PGDATABASE=nc_news_test

### INITIALISE

Once you have followed the steps above, you will need to ensure you have PostGreSQL installed on your machine and that it is running. If you do not have PostGReSQL installed, please visit the [official PostGreSQL download page](https://www.postgresql.org/download/) to find the correct package for your machine, and follow the instructions.

Once PostGres is installed and running, please run the following scripts in your terminal to set up the database and seed with data :

      npm run setup-dbs
      npm run seed

#### TESTING

In order to test all endpoints, simply run:

      npm test
