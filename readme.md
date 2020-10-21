# React TypeScript SCSS WebApp template bundled with Parcel
Boilerplate template for a React SPA, written in TypeScript with support for modular SCSS. Bundling handled by Parcel.

## Requirements
Dependencies not install by NPM/Yarn:
- Node (v12.8.1)
- Git (optional, for development)
- A package manager, like `npm` or `yarn`

### Installing dependencies

#### Non-node_modules dependencies
- Node. refer to [this guide](https://nodejs.org/en/download/) or your OS package manager.
- Git, refer to [this guide](https://git-scm.com/downloads).

#### node_modules Dependencies
To install all dependencies run `npm install`.

### Running
To run in hot module reloading mode:

```shell script
npm start
```

### Testing
```shell script
npm test
```

If a snapshot fails for a particular test, you may want to update the snapshot by running the following:

```shell script
npm test:ts src/app/path/to/module/Module.test.tsx -u 
```

If this fails to update the snapshot, you may need to delete the snapshot file, located in the __snapshots__ at the same
 folder level as the failing test; then re-run the tests.

#### Linting
There are various linting tools used to standardise style across the TypeScript and SCSS; they are run as part of the 
test scripts but are able to be run as standalone scripts: 

```shell script
npm run lint

npm run lint:ts

npm run lint:scss
```

If the linting of your TypeScript fails, there is a command to call that fixes the syntax
```shell script
npm run lint:fix-ts
```

### Building
```shell script
npm build
```

### Running
To view, either:
- open the file `dist/index.html` in your browser 
- or for a more reliable comparison to running in production, host the app on a local sever and navigate to the app root
