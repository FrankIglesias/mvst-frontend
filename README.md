# Repository List

### Test it

This project is deployed in: https://mvst-frontend.vercel.app/

## Tech Stack

The project utilizes the following technologies:

- Frontend: HTML, CSS, JavaScript
- Framework: React.js
- Deployment & CD: Vercel
- GraphQL: Apollo Client
- Testing: React Testing Library & Vitest
- Storybook

## How to run

### Install dependencies

To install dependencies run

```sh
npm i
```

### Import GraphQL files (optional)

To import graphql types you should run the following command

```sh
GITHUB_TOKEN="XXXXXXXXXX" npm run compile
```

### Define a .env file with the same variable

Create a .env file in the root of the project and set the following variable

```sh
VITE_GITHUB_TOKEN="XXXXXXXXXX"
```

### Run the server

To run the server type the following:

```sh
npm run dev
```

This will run the project inside `http://localhost:5173/`

## Run the test suite

```sh
npm run test
```


## Run Storybook
```sh 
npm run storybook
```
 Will open the storybook server on `http://localhost:6006/`

## Future improvements

- Test the intersection observer
- Add search by language
- Install pre-commit
