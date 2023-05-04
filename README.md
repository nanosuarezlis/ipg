# NanoGlobal - Movie Search App

This is a movie search app that allows users to search for movies using keywords. It uses the OMDB API to retrieve movie data.

## Installation

To get started, clone this repository and install the dependencies:

## Scripts

- `npm start`: Starts the production server.
- `npm run build`: Builds the production-ready app.
- `npm run dev`: Starts the development server and watches for changes.


## Docker
This project includes a Dockerfile that allows you to run the application inside a container. To build the Docker image, run the following command in the root directory of the project:

docker build -t movie-search-app .
To run the Docker container, use the following command:

docker run -p 3001:3001 movie-search-app
This will start the server on port 3001 inside the Docker container, which can be accessed from your host machine by visiting http://localhost:3001. Note that the -p 3001:3001 option maps the container's port 3001 to the host machine's port 3001.

If you want to run the container in detached mode, use the -d option:

docker run -d -p 3001:3001 movie-search-app
This will run the container in the background. To stop the container, run:

docker stop <container-name-or-id>
You can also remove the container when you're done with it by running:

docker rm <container-name-or-id>
And that's it! With Docker, you can easily package and run your application in any environment.

## Architecture

The project is divided into two main layers:

1. **Client**: The frontend layer built with React and TypeScript. It is responsible for rendering the UI and communicating with the server layer.
2. **Server**: The backend layer built with Node.js, Express, and TypeScript. It is responsible for handling requests, communicating with the OMDB API, and serving the client layer.

### Separation of API Key

For security reasons, the API key is stored in a `.env` file and is not committed to the repository.



## Technical Test - Frontend Developer Selection

The objective of this test is to create a mini web application that displays a list of movies with their poster, title, and release date. When a movie's image is clicked, all its information should be displayed, and a small form should allow the user to rate the movie.

The following API Key from TheMovieDB API will be used to obtain movie data: `8f781d70654b5a6f2fa69770d1d115a3`

We can obtain a list of popular movies with this endpoint:
`https://developers.themoviedb.org/3/movies/get-popular-movies`

We can also use a query to search for a movie with this endpoint:
`https://developers.themoviedb.org/3/search/search-movies`

To rate a movie, we will use this endpoint:
`https://developers.themoviedb.org/3/movies/rate-movie`

To do this, we will need to create and use a "guest session" with this endpoint:
`https://developers.themoviedb.org/3/authentication/create-guest-session`

### Requirements
- Develop using React 18
- Use TypeScript
- Implement a search function and display a list of movies on the main route (`/search`)
- Implement another route (`/mylist`) that displays the movies that have been rated
- Information should be stored using `redux-toolkit` or `useContext` + `useReducer` hooks

### Delivery
- Create a repository on GitHub
- Keep the basic structure on the `main` branch
- Upload the development of the web app on the `develop` branch

### Optional (extra points)
- Use any library of components, public or your own
- Implement unit/functional tests using React Testing Library
- Use code splitting and lazy loading
- Implement a good project structure