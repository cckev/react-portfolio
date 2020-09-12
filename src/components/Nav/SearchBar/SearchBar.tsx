import React, { useState, useRef, Dispatch } from 'react';
import styles from './SearchBar.module.css';
import { filterProjects } from '../../../store/actions/projects';
import { connect } from 'react-redux';


interface Props {
    filterProjects: (searchText: string) => void;
}

const SearchBar: React.FC<Props> = props => {
    const { filterProjects } = props;
    const [searchText, setSearchText] = useState('');
    const inputRef = useRef(null);

    const onSearchTextChange = (value: string) => {
        setSearchText(value);
        filterProjects(value);
    }

    return (

        <input
            ref={inputRef}
            type="text"
            placeholder="Search for a Project"
            value={searchText}
            onChange={e => onSearchTextChange(e.target.value)}
            className={styles.SearchBar}
        />

    );
}

const mapDispatchToProps = (dispatch: Dispatch<{ type: string }>) => ({
    filterProjects: (searchText: string) => dispatch(filterProjects(searchText))
})

export default connect(null, mapDispatchToProps)(SearchBar);