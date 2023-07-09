How to run application:

Open terminal or ctrl + j if you're windows, open two terminal both for server and client.

/starting point /QSHARE

run the server:

- run this code:
  1. cd server
  2. npm i
  3. npx sequelize db:create
  4. npx sequelize db:migrate
  5. npx sequelize db:seed:all
  6. npx nodemon app

run the client:

- run this code:
  1. cd client
  2. npm i
  3. npm run dev or npx vite

You should be able to run the application now

Detail of server API are in /Qshare/server/readme.md
