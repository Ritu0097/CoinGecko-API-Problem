import React from 'react';

const SearchBar = ({ onSortByMktCap, onSortByPercentage, onChange }) => {
  return (
    <div className="mydiv">
      <input type="text" id="searchInput" placeholder="Search By Name or Symbol"/>
      <button id="sortByMarketCap" onClick={onSortByMktCap}>Sort By Mkt Cap</button>
      <button id="sortByPercentageChange" onClick={onSortByPercentage}>Sort by percentage</button>
    </div>
  );
};

export default SearchBar;
