# Log Out

We're almost done! Now that we have a user logged in to the application, we need to be able to log them out once they choose to log out. Sessions will be kept until the cookie is valid and users will still be authenticated even after they close the browser.

But when user clicks on the Logout link (or button), the session has to be deleted.

The `/logout` route is already defined in [`routes/auth.js`](routes/auth.js). It's using the `logoutUser` function in the controller.
```JavaScript
router.get('/logout', userController.logoutUser);
```

In [`userController.js`](../controllers/userController.js), there's already a function for logout which simply redirects to the login page. But we need to ensure that the session is destroyed in the database.
```JavaScript
exports.logoutUser = (req, res) => {
  // Destroy the session and redirect to login page
  res.redirect('/login');
};
```

To destroy the session, we need to check if the session exists  in the `req` object before destroying it using `req.session.destroy()`.
```JavaScript
exports.logoutUser = (req, res) => {
  if (req.session) {
    req.session.destroy(() => {
      res.clearCookie('connect.sid')
      res.redirect('/')
    });
  }
};
```
Since we prefer asynchronous functions, we clear the cookie and redirect once the `destroy()` function is complete.

Additionally, we can also safeguard the route `/logout` by adding the middleware function `checkAuthenticated` we created before executing the destroy and redirect. This is so that unauthenticated users cannot directly access [http://localhost:9090/logout](http://localhost:9090/logout).

Update the `/logout` route in [`routes/auth.js`](routes/auth.js) to this:
```JavaScript
router.get('/logout', checkAuthenticated, userController.logoutUser);
```

That's it, we're done!
