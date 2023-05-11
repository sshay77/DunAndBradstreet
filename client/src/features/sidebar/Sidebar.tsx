import React from 'react'
import './sidebar.css'

interface Props {
    history: string[];
    onHistoryItemClick : (query:string) => void;
}

function Sidebar({history, onHistoryItemClick}: Props) {
  return (
    <aside>
        <h3>History</h3>
        <ul>
          {
            history.map((query:string, i:number) => (
              <li
                key={i}
                onClick={()=>onHistoryItemClick(query)}>
                {query}
              </li>
            ))
          }
        </ul>
      </aside>
  )
}

export default Sidebar
