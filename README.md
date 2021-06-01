# PaymentSpring Demo

This site is the front end portion of a small project made for fun :). It is an authenticated portal built on top of a Vuetify theme that allows users to make sample payments (through the "Make a Donation" page).  It uses PaymentSpring as a payment processing system. This means that anyone running this project locally can sign in to their PaymentSpring account and see the sample payments that were made through this site. Please see the [API page](https://github.com/kayleiburke/PaymentSpringGateway) for instructions on setting up a free PaymentSpring account and associating it with this project.

The live demo site can be accessed at: https://payment-spring-demo.herokuapp.com

- **Username:**  kaylei.burke@gmail.com
- **Password:** \*paymentspring*

## Credits
Built using the [Vuetify Material Dashboard](https://www.creative-tim.com/product/vuetify-material-dashboard) theme

## Getting Started
- Install Nodejs from [Nodejs Official Page](https://nodejs.org/en/)
- Set up a [Google reCAPTCHA v3 site](https://www.google.com/recaptcha/intro/v3.html)
- Create the following environment variables:
    - RECAPTCHA_SITE_KEY: holds your Google reCAPTCHA v3 site key
    - PAYMENTSPRING_GATEWAY_API_URL _(optional)_: the URL of the API.  This is only necessary if the [API](https://github.com/kayleiburke/PaymentSpringGateway) is running locally.
- Run `npm install` or `yarn install` if you use [Yarn](https://yarnpkg.com/en/)
- Run `npm run dev` or `yarn serve` to start a local development server
- A new tab will be opened in your browser

You can also run additional npm tasks such as
- `npm run build` to build your app for production
- `npm run lint` to run linting.

## Login
A default user has been created on the Heroku-based API called by this app (https://whispering-cove-68110.herokuapp.com).  The login information is below.

- **Username:**  kaylei.burke@gmail.com
- **Password:** \*paymentspring*
