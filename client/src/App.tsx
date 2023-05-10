// import { Counter } from "./features/counter/Counter"
import { useEffect, useState, useMemo } from "react"
import "./App.css"
import Pagination from "./features/pagination/Pagination";
import Title from "./features/title/Title";
import Sidebar from "./features/sidebar/Sidebar";
import {ApiUrl, PageSize} from "./config"

interface Result {
  URL: string;
  title: string;
}

function App() {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [history, setHistory] = useState<string[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [highlight, setHighlight] = useState("");
  const [counter, setCounter] = useState(0);

  const counters = new Array(PageSize).fill(0);

  useEffect(() => {
    setQuery('');
  }, []);

  const setCount = (i: number, count: number) => {
    counters[i] = count;
    setCounter(counters.reduce((acc, el) => acc + el));
  }

  const search = async (query: string, saveToHistory: boolean = true) => {
    let response;
    try {
      response = await fetch(ApiUrl + query).then(res => res.json());
      if (!response.success) {
        throw new Error(response.message);
      }
    } catch (error) {
      if (error instanceof Error) {
        console.warn(error.message, error);
        alert(error.message);
      }
    }
    if (response.success) {
      setResults(response.data);
      if (saveToHistory) {
        setHistory([...history, query])
      }
      setCurrentPage(1);
    }
  }

  const onSearch = async (e: React.MouseEvent<HTMLElement>) => {
    e.preventDefault();
    if (!query) {
      return;
    }
    search(query);
  };

  const currentPageResults = useMemo(() => {
    const firstPageIndex = (currentPage - 1) * PageSize;
    const lastPageIndex = firstPageIndex + PageSize;
    return results.slice(firstPageIndex, lastPageIndex);
  }, [currentPage, results]);

  function onHistoryItemClick(query: string) {
    setQuery(query);
    search(query, false);
  }

  return (
    <div className="App">
      <Sidebar history={history} onHistoryItemClick={onHistoryItemClick}></Sidebar>
      {/* Main Content */}
      <article>
        <header>
          <form className="search">
            <input
              type="text"
              placeholder="Enter you query"
              onChange={e => setQuery(e.target.value)}
              value={query}
            ></input>
            <button type="submit" onClick={onSearch}>search</button>
          </form>

          <div className="find">
            <input
              type="text"
              placeholder="Enter text to hightlight"
              value={highlight}
              onChange={(e) => setHighlight(e.target.value)}
            ></input>
            <span>found: {counter}</span>
          </div>
        </header>

        <ul className="search-results">
          {
            currentPageResults.map((result: Result, i) => (
              <li key={i}>
                <a href={result.URL}>
                  <Title
                    text={result.title}
                    highlight={highlight}
                    setCount={(count: number) => setCount(i, count)}></Title>
                </a>
              </li>
            ))
          }
        </ul>

        <Pagination
          className="pagination-bar"
          siblingCount={1}
          currentPage={currentPage}
          totalCount={results.length}
          pageSize={PageSize}
          onPageChange={(page: number | string) => setCurrentPage(page as number)}
        />
      </article>
    </div>
  );
}

export default App
