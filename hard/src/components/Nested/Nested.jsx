import { useState } from "react";
import "./styles.css";

function Nested({ folders, handleInsertNode = () => {} }) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [showInput, setShowInput] = useState({
    visible: false,
    isFolder: null,
  });

  const handleNewFolder = (e, isFolder) => {
    e.stopPropagation();
    setIsExpanded(true);
    setShowInput({
      visible: true,
      isFolder,
    });
  };

  const onAddNew = (e) => {
    if (e.key === "Enter" && e.target.value) {
      handleInsertNode(folders.id, e.target.value, showInput.isFolder);
      setShowInput({ ...showInput, visible: false });
    }
  };

  if (folders?.isFolder) {
    return (
      <div style={{ marginTop: 5 }}>
        <div className="folder" onClick={() => setIsExpanded((prev) => !prev)}>
          <span>📂{folders.name}</span>

          <div>
            <button onClick={(e) => handleNewFolder(e, true)}>Folder +</button>
            <button onClick={(e) => handleNewFolder(e, false)}>File +</button>
          </div>
        </div>

        <div
          style={{
            display: isExpanded ? "block" : "none",
            paddingLeft: "20px",
          }}
        >
          {showInput.visible && (
            <div>
              <span>{showInput.isFolder ? "📂" : "📄"}</span>
              <input
                className="inputContainer__input"
                type="text"
                autoFocus
                onBlur={() => setShowInput({ ...showInput, visible: false })}
                onKeyDown={onAddNew}
              />
            </div>
          )}
          {folders.items.map((item) => (
            <Nested
              folders={item}
              handleInsertNode={handleInsertNode}
              key={item.id}
            />
          ))}
        </div>
      </div>
    );
  } else {
    return <span className="file">📄{folders.name}</span>;
  }
}

export default Nested;
