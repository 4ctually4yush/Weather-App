import React, { useState } from "react";
import {AsyncPaginate} from 'react-select-async-paginate'
import { geoApiClient } from '../../api';
const Search = ({onSearchChange}) => {
    const [search, setSearch] = useState(null);

    const loadOptions = (inputValue) => {
        return geoApiClient.get(`cities?namePrefix=${inputValue}`)
        .then((res) => {
            return {
                options: res.data.data
                .filter((city) => {return city.type === "CITY"})
                .map((city) => {
                    return {
                        value: `${city.latitude} ${city.longitude}`,
                        label: `${city.name}, ${city.countryCode}`,
                    };
                }),
            };
        })
        .catch((err) => console.log(err));
    };

    const handleOnChange = (searchData) => {
        setSearch(searchData);
        onSearchChange(searchData);
    };

    return (
        <AsyncPaginate
            placeholder="Search for city"
            debounceTimeout={500}
            value={search}
            onChange={handleOnChange}
            loadOptions={loadOptions}
        />
    );
}

export default Search;