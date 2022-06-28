import React, { useEffect, useRef, useState } from 'react'
import styles from './searchBox.module.scss';
import data from '../../common/mockSuggestions.json';
import { useNavigate } from 'react-router-dom';
import { connect } from 'react-redux';
import { handleQuery, setQuery } from '../../features/autocomplete/autoCompleteSlice';

function SearchBox({ autoCompleteState, handleQuery, handleQueryInput }) {

    const [search, setSearch] = useState("" || autoCompleteState.query);
    const [suggestions, setSuggestions] = useState([]);
    const [focus, setFocus] = useState(false);

    const navigate = useNavigate();

    useEffect(() => {
        const timeOutId = setTimeout(() => handleQuery(search), 200);
        return () => clearTimeout(timeOutId);
    }, [search]);

    useEffect(() => {
        setSearch(autoCompleteState.query);
    }, [autoCompleteState.query]);

    useEffect(() => {
        if (search.length == 0) {
            setSuggestions([]);
            return;
        }
        setSuggestions(autoCompleteState.suggestions);
    }, [autoCompleteState.suggestions]);

    const handleInput = (e) => {
        setSearch(e.target.value);
    }

    const handleClick = (_) => {
        navigate('/search?q=' + search);
    }

    const handleClickSuggestion = (name) => {
        handleQueryInput(name);
        navigate('/search?q=' + name);
    }

    const handleFocus = () => {
        setTimeout(() => setFocus(false), 150);
    }

    const handleKeyDown = (event) => {
        if (event.key === 'Enter') {
            handleClickSuggestion(search);
        }
      }

    return (
        <div className={styles.searchBox}>
            <div className={styles.inputSeachBox}>
                <input type="text"
                    className={styles.input}
                    placeholder="Type to search"
                    onChange={handleInput}
                    onFocus={() => setFocus(true)}
                    onBlur={() => handleFocus()}
                    onKeyDown={handleKeyDown}
                    value={search} />
                {(search.length > 0 && focus) &&
                    <div className={styles.suggestions}>
                        {suggestions.map(({ id, name }) => {

                            // bold query suggestions first
                            var clearQuery = name.substring(search.length)
                            return (
                                <div key={id} onClick={() => handleClickSuggestion(name)}>
                                    <b>{search}</b>{clearQuery}
                                </div>
                            )
                        })}
                    </div>}
            </div>
            <div className={styles.searchIconBox} onClick={handleClick}>
                <a className="search-btn">
                    <i className="fas fa-search"></i>
                </a>
            </div>
        </div>
    )
}

const mapStateToProps = (state) => {
    return {
        autoCompleteState: state.autocomplete
    }
}

const mapDispatchToProps = dispatch => {
    return {
        handleQuery: (query) => dispatch(handleQuery(query)),
        handleQueryInput: (query) => dispatch(setQuery(query))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(SearchBox);