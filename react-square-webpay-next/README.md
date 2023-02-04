This is an app we can use for integrating the Square Web Payments SDK with React in a scalable and performant way. This will allow us to take multiple payment types from our client side application. This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app). Uses components from [`react-square-web-payments-sdk`](https://github.com/weareseeed/react-square-web-payments-sdk). 

Requires: 

- a Square access token
- a locationId and 
- applicationId 

from your [Square Developer Account](https://squareup.com/signup/us?lang_code=en-us&country_code=us&return_to=https%3A%2F%2Fdeveloper.squareup.com%2Fapps%2Fsq0idp-tlAwlpPxRhMrfYrwlxvCHg%2Fsettings&v=developer)

Please use
sandbox versions of these three values.  

Click [here](https://streamyard.com/zzc66bv9ijj3) for a video walkthrough

## Getting Started

First, install node packages with ```npm install```

Then run the development server:

```bash
npm run dev
# or
yarn dev
```

TIP: Make sure you are running these commands from `next-square-react-afterpay/react-square-webpay-next`

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can continue editing the page by modifying `pages/index.js`. The page auto-updates as you edit the file.

[API routes](https://nextjs.org/docs/api-routes/introduction) can be accessed on [http://localhost:3000/api/pay](http://localhost:3000/api/pay). This endpoint can be edited in `pages/api/pay.js`.

The `pages/api` directory is mapped to `/api/*`. Files in this directory are treated as [API routes](https://nextjs.org/docs/api-routes/introduction) instead of React pages.

## Learn More

To learn more about Next.js or Square APIs, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.
- [Square APIs](https://developer.squareup.com/) - the home for Square APIs, SDKs, docs, and tutorials.
- [React Square Web Payments wrapper](https://react-square-payments.weareseeed.com/docs) - docs for a community-created library of components that wraps
- the Square Webpay SDK functionality

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out the [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.
