import { useState } from "react";
import styles from "./FilterBar.module.css";
import { FaSearch, FaFilter } from "react-icons/fa"; 

const FilterBar = ({ onFilterChange }) => {
    const [showSearch, setShowSearch] = useState(false);
    const [showFilters, setShowFilters] = useState(false);
    
    const [searchTerm, setSearchTerm] = useState("");
    const [filterDate, setFilterDate] = useState("");
    const [filterLocation, setFilterLocation] = useState("");

    const handleFilterChange = () => {
        onFilterChange({ searchTerm, filterDate, filterLocation });
    };

    return (
        <div className={styles.filterBar}>
            <div className={styles.iconContainer} onClick={() => setShowSearch(!showSearch)}>
                <FaSearch className={styles.icon} />
            </div>
            
            {showSearch && (
                <input 
                    type="text" 
                    placeholder="Search by title..." 
                    value={searchTerm} 
                    onChange={(e) => { setSearchTerm(e.target.value); handleFilterChange(); }}
                    className={styles.searchInput}
                />
            )}

            <div className={styles.iconContainer} onClick={() => setShowFilters(!showFilters)}>
                <FaFilter className={styles.icon} />
            </div>

            {showFilters && (
                <div className={styles.filterOptions}>
                    <input 
                        type="date" 
                        value={filterDate} 
                        onChange={(e) => { setFilterDate(e.target.value); handleFilterChange(); }}
                    />
                    <input 
                        type="text" 
                        placeholder="Filter by location..." 
                        value={filterLocation} 
                        onChange={(e) => { setFilterLocation(e.target.value); handleFilterChange(); }}
                    />
                </div>
            )}
        </div>
    );
};

export default FilterBar;
