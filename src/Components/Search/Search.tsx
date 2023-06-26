import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './Search.css';

const Search = () => {

    const [searchValue, setSearchValue] = useState<string>()
    const [breeds, setBreeds] = useState<string[]>()
    const [image, setImage] = useState<{src: string, alt: string}>({src: '', alt: ''})
    const [status, setStatus] = useState<string>("Not searched")

    useEffect(() => {
        axios.get('https://dog.ceo/api/breeds/list/all')
        .then(res => {
            let breedsArr:string[] = []
            for(var i in res.data.message){
                if(Boolean(res.data.message[i][0])){
                    for(var j in res.data.message[i]){
                        breedsArr.push(`${i} ${res.data.message[i][j]}`)
                    }
                }else{
                    breedsArr.push(`${i}`)
                }
            }
            setBreeds(breedsArr)
        })
        .catch(err => {
            console.log(err)
        })
    }, [])

    const handleSearch = () => {
        var searchedBreed = searchValue?.split(" ")[0]
        var searchedSubBreed = searchValue?.split(" ")[1]
        let found:any
        if(searchValue){
            found = breeds?.find(breed => breed.includes(searchValue))
        }
        var breed = found?.split(" ")[0]
        var subBreed = found?.split(" ")[1]

        if(found?.split(" ").length === 1){
            axios.get(`https://dog.ceo/api/breed/${breed}/images/random`)
            .then(res => {
                setStatus("Loaded")
                setImage({
                    src: res.data.message,
                    alt: breed
                })
            })
            .catch(err => {
                setStatus("Error")
                setImage({
                    src: '',
                    alt: ''
                })
                console.log(err)
            })
        }else{
            axios.get(`https://dog.ceo/api/breed/${breed}/${subBreed}/images/random`)
            .then(res => {
                setStatus("Loaded")
                setImage({
                    src: res.data.message,
                    alt: `${breed} ${subBreed}`
                })
            })
            .catch(err => {
                setStatus("Error")
                setImage({
                    src: '',
                    alt: ''
                })
                console.log(err)
            })
        }
    }

    const renderImage = () => {
        if(status === "Loaded"){
            return <img src={image.src} alt={image.alt} />
        }else if(status === "Error" && image.src.length === 0){
            return <><span>Podaj poprawną rasę</span><div>Nie znaleziono takiego psa</div></>
        }else if(status === "Not searched"){
            return <span>Podaj nazwę rasy</span>
        }else{
            return <div>Wczytywanie...</div>
        }
    }

    return (
        <div className='search-wrapper'>
            <label htmlFor="search-input">
                Podaj nazwę psa: 
            </label>
            <input type='text' id='search-input' onChange={(e:any)=>{setSearchValue(e.target.value)}}></input>
            <button className='search-btn' onClick={handleSearch}>Wyszukaj</button>
            {
                renderImage()
            }
        </div>
    );
}

export default Search;