import React, { useState } from "react";
import "./Header.css";
import { Link } from "react-router-dom";

const Header = () => {
    const [query, setQuery] = useState("");
    const [searchResults, setSearchResults] = useState([]);

    const handleInputChange = (event) => {
        setQuery(event.target.value);
    };

    const handleSearch = async (event) => {
        event.preventDefault();
        try {
            const response = await fetch(`https://api.themoviedb.org/3/search/movie?query=${query}&api_key=YOUR_API_KEY&include_adult=false&language=en-US&page=1`);
            const data = await response.json();
            setSearchResults(data.results);
        } catch (error) {
            console.error("Error fetching search results:", error);
        }
    };

    return (
        <div className="header">
            <div className="headerLeft">
                <Link to="/"><img className="header__icon" src="https://cdn2.vectorstock.com/i/1000x1000/38/76/cinema-logo-movie-emblem-template-vector-19873876.jpg" alt="logo"/></Link>
                <Link to="/movies/popular" style={{textDecoration: "none"}}><span>Popular</span></Link>
                <Link to="/movies/top_rated" style={{textDecoration: "none"}}><span>Top Rated</span></Link>
                <Link to="/movies/upcoming" style={{textDecoration: "none"}}><span>Upcoming</span></Link>
            </div>
            <form onSubmit={handleSearch} className="headerSearch">
                <input
                    type="text"
                    placeholder="Search movies..."
                    value={query}
                    onChange={handleInputChange}
                />
                <button type="submit">Search</button>
            </form>
            {searchResults.length > 0 && (
                <div className="searchResults">
                    <h2>Search Results</h2>
                    <ul>
                        {searchResults.map((movie) => (
                            <li key={movie.id}>{movie.title}</li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    );
};

export default Header;
