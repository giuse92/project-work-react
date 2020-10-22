import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import SezDettaglio from './SezDettaglio'

const JSONURL = 'https://raw.githubusercontent.com/giuse92/Project-work/json/assets/js/dataApp.json';

const ElencoPercategoria = (props) => {
    const [err, setErr] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const [json, setJson] = useState([]);
    const [isDivClicked, setIsDivClicked] = useState(false);
    const [getDiv, setGetDiv] = useState([]);
    const [categoryName, setCategoryName] = useState([]);

    const handleClick = (event) => {
        setIsDivClicked(true);
        setGetDiv([...event.currentTarget.children]);
        setCategoryName(event.currentTarget.parentElement.previousElementSibling.textContent)
    }

    useEffect(() => {
        fetch(JSONURL)
        .then(response => response.json())
        .then(result => {
            setIsLoaded(true);
            setJson(result);
        },
        error => {
            setIsLoaded(true);
            setErr(error)
        })
    })
    

}

export default ElencoPerCategoria;