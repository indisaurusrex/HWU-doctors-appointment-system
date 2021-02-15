Doctors appointment system, following YouTube tutorial: 
https://www.youtube.com/watch?v=ASljkuYwHkc&list=PLNOjHC_BXrfBvYQVOfgUcKmWHK25SsPc6&index=3

this was useful while setting up the db https://codeforgeek.com/getting-started-sequelize-postgresql/
as were the sequelize docs when making the models and migrations: https://sequelize.org/v4/manual/tutorial/transactions.html#usage-with-other-sequelize-methods


To be made into the HWU appointment system 

run with `npm start` on local host 8080
    
Using postgres db and sequelize for tables and migrations

Using bcryptjs to hash the passwords

Using Passportjs to handle login auth, using only the local server with passport-local for now, but this can be extended to use social media profiles as well http://www.passportjs.org/packages/passport-local/

Styling the admin page using a customised version of AdminLTE from https://github.com/ColorlibHQ/AdminLTE/releases/tag/v3.0.5

When migrating a table, navigate to the src folder before running the following: 
`../node_modules/.bin/sequelize db:migrate`

Integrating React: 
Follow this from the docs: https://reactjs.org/docs/add-react-to-a-website.html
And this might help from freecodecamp: https://www.freecodecamp.org/news/react-cheatsheet-with-real-world-examples/
This calendar may be suitable: https://projects.wojtekmaj.pl/react-calendar/ | https://www.npmjs.com/package/react-calendar
Run this when working with components `npx babel --watch src --out-dir . --presets react-app/prod`
