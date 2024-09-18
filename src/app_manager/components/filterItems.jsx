import React, { useEffect, useRef, useState } from "react";
import "../style/filter.css";
import displayImage from "../utils/icons_FEtask/Display.svg";
import down from "../utils/icons_FEtask/down.svg";
const Filter = ({ onGroupChange, onSortChange }) => {
  const [showFilters, setShowFilters] = useState(false);
  const filterRef = useRef(null);

  const handleDisplayClick = () => {
    setShowFilters((prevState) => !prevState);
  };

  const handleClickOutside = (event) => {
    if (filterRef.current && !filterRef.current.contains(event.target)) {
      setShowFilters(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="filter" ref={filterRef}>
      <button onClick={handleDisplayClick} className="display-button">
        <img src={displayImage} alt="Display" />
        <span>Display</span>
        <img src={down} alt="Display" />
      </button>

      {showFilters && (
        <div className="filter-box">
          <div className="grouping_box">
            <div>Grouping</div>
            <select onChange={onGroupChange}>
              <option value="status">Status</option>
              <option value="user">Group by User</option>
              <option value="priority">Group by Priority</option>
            </select>
          </div>
          <div className="grouping_box">
            <div>Ordering</div>
            <select onChange={onSortChange}>
              <option value="title">Sort by Title</option>
              <option value="priority">Sort by Priority</option>
            </select>
          </div>
        </div>
      )}
    </div>
  );
};

export default Filter;
