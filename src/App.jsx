import React, { useState, useEffect } from 'react';
import './App.css';
import SearchBar from './SearchBar'; 

const App = () => {
  const [posts, setPosts] = useState([]);
  const [sortedPosts, setSortedPosts] = useState([]);
  const [sortDirection, setSortDirection] = useState('asc'); 
  useEffect(() => {
    const fetchPost = async () => {
      const response = await fetch(
        'https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=10&page=1&sparkline=false'
      );
      const data = await response.json();
      console.log(data);
      setPosts(data);
      setSortedPosts(data);
    };
    fetchPost();
  }, []);
  const handleSortByMktCap = () => {
    const sortedData = [...sortedPosts].sort((a, b) => {
      if (sortDirection === 'asc') {
        return a.market_cap - b.market_cap;
      } else {
        return b.market_cap - a.market_cap;
      }
    });
    setSortedPosts(sortedData);
    setSortDirection(prev => (prev === 'asc' ? 'desc' : 'asc'));
  };

  const handleSortByPercentage = () => {
    const sortedData = [...sortedPosts].sort((a, b) => {
      if (sortDirection === 'asc') {
        return a.market_cap_change_percentage_24h - b.market_cap_change_percentage_24h;
      } else {
        return b.market_cap_change_percentage_24h - a.market_cap_change_percentage_24h;
      }
    });
    setSortedPosts(sortedData);
    setSortDirection(prev => (prev === 'asc' ? 'desc' : 'asc'));
  };

  return (
    <div className="container">
      <SearchBar onSortByMktCap={handleSortByMktCap} onSortByPercentage={handleSortByPercentage} /> 
      <div className="table-container">
        <table className="table custom-table text-white">
          <tbody>
            {sortedPosts.map(item => (
              <TableRow key={item.id} data={item} />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

const TableRow = ({ data }) => {
    const textClass = data.market_cap_change_percentage_24h > 0 ? 'green-text' : 'red-text';
  return (
    <tr>
    <td><img src={data.image} alt={data.name} style={{ width: '50px', height: '50px' }} /></td>
    <td>{data.id}</td>
    <td>{data.name}</td>
    <td>{data.symbol}</td>
    <td>{data.current_price}</td>
    <td>{data.total_volume}</td>
    <td className={textClass}>{data.market_cap_change_percentage_24h}%</td>
    <td>Mkt Cap : ${data.market_cap}</td>
  </tr>
  );
};

export default App;
