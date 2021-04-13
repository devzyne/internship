import React, { useState, useEffect } from "react";
import searchIcon from "../../assets/search.svg";
import "./Searchbar.css";

function Searchbar({ autoSuggest, getSuggestions, addTechnology }) {
  // Added hideButton prop since, the search bar is reused and button is not required
  const [suggestions, setSuggestions] = useState([]);
  const [text, setText] = useState("");

  useEffect(() => {
    setSuggestions(autoSuggest);
  }, [autoSuggest]);

  const onTextChange = (event) => {
    const value = event.target.value;
    if (getSuggestions) {
      getSuggestions(value);
      setSuggestions(autoSuggest);
      setText(value);
    } else {
      setText(value);
    }
  };

  const selectedText = (value) => {
    if (addTechnology) {
      setText("");
      setSuggestions([]);
      addTechnology(value);
    } else {
      setText("");
    }
  };

  const renderSuggestions = () => {
    if (text === "") {
      return null;
    }

    return (
      <div className="suggestion container p-0 m-0">
        {suggestions.map((item, index) => (
          <div
            className="suggestion-item"
            key={index}
            onClick={() => selectedText(item)}
          >
            {item.nme}
          </div>
        ))}
      </div>
    );
  };

  return (
    <div>
      <div className="input">
        <img
          src={searchIcon}
          className="search-icon"
          style={{ height: "20px", width: "24px" }}
          alt="search icon"
        />
        <div className="autosuggest">
          <input
            type="text"
            minLength="3"
            maxLength="64"
            placeholder="Search by technology"
            onChange={onTextChange}
            value={text}
          />
          {autoSuggest.length > 0 && renderSuggestions()}
        </div>
      </div>
    </div>
  );
}

export default Searchbar;
