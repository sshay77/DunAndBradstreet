# Dun & Bradstreet
## Installing and Running the Application
* from root project change directory to **server** folder. run `npm i` and then run `npm start`.
* from root project change directory to **client** folder. run `npm i` and then run `npm start`.
## Configuration

### Cors
The client is fetching data from the server using CORS.
The application is configured by default correctly, but if it can't run on the default ports you can configure them in the `config.js` at the server directory, and `config.ts` at the client directory.

### PageSize
This const defines the amount of results per page. Current configuration is 10 results per page.
It is configured in the client directory at `config.ts`.

## Application Features
* searching for a given term using duckduckgo api.
* highlighting and counting a given string in the result view.
* paging
* keeping track of previous searching terms.
* persist history of searched terms that were searched from the main search field (not from the sidebar)
