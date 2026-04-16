const Search = ({searchTerm, setSearchTerm}) => {


    const clearSearch = () => {
        setSearchTerm("");
    };

    return (
        <div className="search">
            <input 
                type="text"
                maxLength={70}
                placeholder="Search Movies..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
            />
            {searchTerm ? 
            <button onClick={clearSearch}>
                <img src="./clear-search.svg" alt="" />
            </button>
            : ""}
        </div>
    );
};

export default Search;