# burger-app
> Single page application

- [Website](https://burger-a499f.firebaseapp.com/)

## Quick Start

# Step 1 Clone repo
```bash
git clone git@github.com:konstantindergachev/burger-app.git
```
# Step 2 Install dependencies
```bash
yarn install or npm install
```


# Step 3 The real data stored in the firebase
- [firebase](https://firebase.google.com/)

You need to create settings.js file with:
1) api key
2) db url;
3) auth url;
4) verify password;

For example, settings.js:
```bash
const apiKey = '***************************************';
const URL = {
    dbURL: '***********************************',
    auth_URL: '**************************************************************************************',
    verifyPassword: '***************************************************************************************',
};

export default URL;
```
# Step 4 Use your own social icons
# Step 5 Use your own favicon.ico: 
```bash
src/favicon.ico
```
and favicon directory: 
```bash
src/img/favicon
```
# Step 6 Start the development server with hot reloading enabled
```bash
yarn run dev or npm run dev
```
# Step 7 Build for production
```bash
yarn run build or npm run build
```
# Step 8 Follow Firebase guide to use the Firebase JavaScript SDK for deploy web app


## Info
### Author
Konstantin Dergachev [portfolio](http://dergachevkonstantin.surge.sh/)
