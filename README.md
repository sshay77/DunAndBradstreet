# Dun & Bradstreet
## Running the application
* from root project change directory to server folder and run `npm start`
* from root project change directory to client folder and run `npm start`
## Configuration

### Cors
The client is fetching data from the server using CORS.
The application is configured by default correctly, but if it can't run on the default ports you can configure them in the `config.js` at the server directory, and `config.ts` at the client directory.

### PageSize
This const define the amount of results per page. Current configuration is 10 results per page.
It is configuered in the client directory at config.ts.

## Application Features
* searching for a given term using duckduckgo api.
* highlighting and counting a given string in the result view.
* paging
* keeping track of previous searching terms.
* persist history of searched terms that were searched from the main search field (not from the sidebar)