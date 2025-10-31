import { useState } from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Nested from "./components/Nested/Nested";
import Search from "./components/Search/Search";
import useTraverseTree from "./components/Hooks/useTraverseTree";
import { explorer } from "./data/data";
import "./app.css";

// Home page displaying both sections and nav links
function Home({ explorerData }) {
  return (
    <div className="home-container">
      <nav className="nav-links">
        <Link to="/search" className="nav-link-btn">
          Go to Search Bar
        </Link>
        <Link to="/nested" className="nav-link-btn green">
          Go to Nested Folders
        </Link>
      </nav>
      <div className="cards-grid">
        <div className="challenge-card">
          <h2 className="search-title">Search Bar</h2>
        </div>
        <div className="challenge-card">
          <h2 className="nested-title">Nested Folders & Files</h2>
        </div>
      </div>
    </div>
  );
}

export default function App() {
  const [explorerData, setExplorerData] = useState(explorer);
  const { insertNode } = useTraverseTree();

  const handleInsertNode = (folderId, item, isFolder) => {
    const finalTree = insertNode(explorerData, folderId, item, isFolder);
    setExplorerData(finalTree);
  };

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home explorerData={explorerData} />} />
        <Route
          path="/search"
          element={<Search explorerData={explorerData} />}
        />
        <Route
          path="/nested/*"
          element={
            <Nested
              folders={explorerData}
              handleInsertNode={handleInsertNode}
            />
          }
        />
      </Routes>
    </Router>
  );
}
