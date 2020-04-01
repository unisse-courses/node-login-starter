# Configure application to use sessions

To use sessions in our application, we must first require the packages in [`app.js`](../app.js):
```JavaScript
const session = require('express-session');
const flash = require('connect-flash');
const MongoStore = require('connect-mongo')(session);
```

* [`express-session`](https://github.com/expressjs/session) is the middleware by Express.js to create sessions for users accessing the application.
* [`connect-flash`](https://github.com/jaredhanson/connect-flash#readme) makes use of the `flash` property in a session and stores messages that is cleared right after it's displayed to the user. It's a good way to handle error messages for redirecting (without using AJAX).
* [`connect-mongo`](https://github.com/jdesboeufs/connect-mongo) is a MongoDB session store used for Connect and Express. The `express-session` instance (or whichever session manager you're using) must be passed in the constructor.

Express runs middlewares according to the order you add it to the `app` ([Source](https://stackoverflow.com/a/26634507)). Add the `express-session` configuration right after the static file route.

```JavaScript
// Sessions
app.use(session({
  secret: 'somegibberishsecret',
  store: new MongoStore({ mongooseConnection: mongoose.connection }),
  resave: false,
  saveUninitialized: true,
  cookie: { secure: false, maxAge: 1000 * 60 * 60 * 24 * 7 }
}));
```

This configures the application to use `express-session` with some options. The table below explains the option set (mostly taken from the [`express-session` documentation](https://github.com/expressjs/session#options)).

option              | value
--------------------|------
`secret`            | A string that is used to sign the session ID. Ideally it should be kept as an environment variable so it's not exposed and it should be some randomly generated string.
`store`             | The session store to be used.
`resave`            | When set to `true`, it forces the session to be saved back to the session store, even if the session was never modified during the request. Best to set it to **`false`** to only save when there's a modified value.
`saveUninitialized` | Forces a session that is "uninitialized" to be saved to the store. A session is uninitialized when it is new but not modified. Choosing `false` is useful for implementing login sessions, reducing server storage usage, or complying with laws that require permission before setting a cookie. Choosing `false` will also help with race conditions where a client makes multiple parallel requests without a session.
`cookie`            | Settings object for the session ID cookie. The default value is `{ path: '/', httpOnly: true, secure: false, maxAge: null }` The `maxAge` option is a useful option to extend the validity of the cookie. The value is in **milliseconds**.

Next, we'll configure use `flash` and set up some global variables that can be used by the routes (and templates). You'll see how the global variables are used when we get to the [Registration](02-REGISTER.md) steps.

```JavaScript
// Flash
app.use(flash());

// Global messages vars
app.use((req, res, next) => {
  res.locals.success_msg = req.flash('success_msg');
  res.locals.error_msg = req.flash('error_msg');
  next();
});
```

Using `flash` is straightforward. The next function is a middleware function that we're creating to assign the value of the flash message `success_msg` and `error_msg` to `res.locals`.

From the [`express` documentation](http://expressjs.com/en/api.html#res.locals):
> An object that contains response local variables scoped to the request, and therefore available only to the view(s) rendered during that request / response cycle (if any). Otherwise, this property is identical to app.locals.
>
> This property is useful for exposing request-level information such as the request path name, authenticated user, user settings, and so on.

If you want to see where we'll be using this, there's a handlebars partial: [`partials/messages.hbs`](../views/partials/messages.hbs).
```HTML
{{#if error_msg}}
<div class="row">
  <div class="col s12 card-panel z-depth-0 red lighten-5">
    <h6 class="red-text text-darken-2"><strong>{{error_msg}}</strong></h6>
  </div>
</div>
{{/if}}

{{#if success_msg}}
<div class="row">
  <div class="col s12 card-panel z-depth-0 green lighten-5">
    <h6 class="green-text text-darken-2"><strong>{{success_msg}}</strong></h6>
  </div>
</div>
{{/if}}
```

This partial is loaded in [`views/login.hbs`](../views/login.hbs) and  [`views/register.hbs`](../views/register.hbs) and will dispalay only if there's a value for the variables set.

#### That's it for the session configurations.

### Next: [`02-REGISTER`](02-REGISTER)
