# Open Source Challenge

This Challenge is a Morse Code decoder that fetches data from an API and decodes it into English text. The challenge was given by Real Dev Squad as part of the Open Source Challenge.

## How it works

The program makes a series of requests to an API to fetch Morse Code data. This data is then decoded into English text using a predefined mapping of Morse Code to English characters.

The program is divided into several functions:

- `fetchAssignments()`: This function fetches the number of parts of data that need to be fetched from the API.
- `fetchData(i)`: This function fetches the `i`th part of the data from the API.

The `startFetch()` function is the main function that calls the other functions and handles the results.

## How to run

1. Install Node.js and npm.
2. Clone this repository.
3. Replace the `cookie` constant in `index.js` with your actual cookie.
4. Run `node index.js` to start the program.

## Note

This program assumes that the server's responses are in a specific format. If the actual responses don't match this format, the program may not work correctly.