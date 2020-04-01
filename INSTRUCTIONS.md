# How to get the app working

Code for the views and the models are already **complete**. No need to modify any of these files.

Instructions given will be for completing the **controllers**, creating **middlewares** and updating the main `app.js` for **server configuration** for sessions. Middlewares will also be added to **route definitions** for authentication checks.

Follow the specific files below to complete the features of this application. These instructions need to be executed sequentially.

### [`01-SERVER.md`](docs/01-SERVER.md)
Configure the server to store sessions.

### [`02-REGISTER.md`](docs/02-REGISTER.md)
Functionality for **registration** which includes request validation and creating the user once all validation checks pass.

### [`03-LOGIN.md`](docs/03-LOGIN.md)
Functionality for **user login** which includes request validation, existing user validation and other validation checks. Once authentication is complete, session will be updated and user will be directed to the main page.

### [`04-LOGOUT.md`](docs/04-LOGOUT.md)
Functionality for **logout** to destroy the session and redirect to the login page.
