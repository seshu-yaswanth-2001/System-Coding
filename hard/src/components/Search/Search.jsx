import { useEffect, useState } from "react";
import "./styles.css";

// custom Hook
const useDebounce = (value, delay) => {
  const [debounced, setDebounced] = useState(value);

  useEffect(() => {
    const handler = setTimeout(() => setDebounced(value), delay);
    return () => clearTimeout(handler);
  }, [value, delay]);
  return debounced;
};

const Search = () => {
  const [input, setInput] = useState("");
  const [results, setResults] = useState([]);
  const [showResults, setShowResults] = useState(false);
  const [cache, setCache] = useState({});
  const [loading, setLoading] = useState(false);

  const debouncedInput = useDebounce(input, 300);

  const fetchData = async () => {
    const key = debouncedInput.trim().toLowerCase();
    if (!key) return;

    if (cache[key]) {
      setResults(cache[key]);
      return;
    }

    try {
      setLoading(true);
      const res = await fetch(`https://dummyjson.com/recipes/search?q=${key}`);
      if (!res.ok) throw new Error("Network error");
      const json = await res.json();
      setResults(json?.recipes || []);
      setCache((prev) => ({ ...prev, [key]: json?.recipes || [] }));
    } catch {
      setResults([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [debouncedInput]);

  return (
    <div className="search-container">
      <h1>Search Recipes</h1>
      <input
        className="input"
        type="text"
        placeholder="Search recipes"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        onFocus={() => setShowResults(true)}
        onBlur={() => setTimeout(() => setShowResults(true), 100)}
      />
      {loading && <div className="loading">Loading...</div>}
      {showResults && !loading && (
        <div className="recipes-list">
          {results.length ? (
            results.map((recipe) => (
              <span className="recipe" key={recipe.id}>
                {recipe.name}
              </span>
            ))
          ) : (
            <span className="no-results">No recipes found</span>
          )}
        </div>
      )}
    </div>
  );
};

export default Search;
