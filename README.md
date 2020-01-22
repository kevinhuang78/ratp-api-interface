# RATP API Interface with [Pierre Grimaud RATP API](https://github.com/pgrimaud/ratp-api-rest).

## Deploy

### Online demo

You can found a working demo on this URL : https://ratp-api-interface.herokuapp.com/ (Beware, it'll be slow at beginning because Heroku let the app "sleep" if nobody check the web app)

### How is it operating
- [x] Develop branch is for developers
- [x] Staging branch is here to deploy on the staging website where the environment is the same as master and you can test it whenever you want
- [x] Master branch is here to deploy on the production website
- [x] Notification is activated with Slack

### Security
Branches are protected :

| Branch name        | Allowed to merge      | Allowed to push |
| ------|-----|-----|
| Develop (default)  	| Maintainers 	| Developers + Maintainers	|
| Staging  	| Maintainers 	| No one	|
| Master  	| Maintainers 	| No one	|

## Available Scripts

In the project directory, you can run:

### `yarn start`

Runs the app in the development mode.<br>
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br>
You will also see any lint errors in the console.

### `yarn test`

Launches the test runner in the interactive watch mode.<br>
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `yarn run build`

Builds the app for production to the `build` folder.<br>
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br>
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `yarn run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (Webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.
