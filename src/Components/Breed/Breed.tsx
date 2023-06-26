import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import './Breed.css'

const Breed = () => {

    type BreedParams = {
        breed: string
    }

    const params = useParams<keyof BreedParams>() as BreedParams

    const [image, setImage] = useState<{src: string, alt: string}>({src: '', alt: ''})
    const [breed, setBreed] = useState<string>(params.breed.split("-")[0])
    const [subBreed, setSubBreed] = useState<string>(params.breed.split("-")[1])
    const [status, setStatus] = useState<string>()


    useEffect(() => {

        if(Boolean(subBreed)){
            axios.get(`https://dog.ceo/api/breed/${breed}/${subBreed}/images/random`)
            .then(res =>{
                setImage({src: res.data.message, alt: `${breed} ${subBreed}`})
                setStatus("Loaded")
            })
            .catch(err => {
                console.log(err)
                setStatus("Error")
            })
        }else{
            axios.get(`https://dog.ceo/api/breed/${breed}/images/random`)
            .then(res =>{
                setImage({src: res.data.message, alt: breed})
                setStatus("Loaded")
            })
            .catch(err => {
                console.log(err)
                setStatus("Error")
            })
        }
    }, [])

    const dogImage = () => {
        if(status === "Loaded"){
            return <div className='dog-wrapper'><h1>{breed} {subBreed}</h1> <img src={image.src} alt={image.alt}></img></div>
        }else if(status === "Error"){
            return <h1>Nie znaleziono pieska</h1>
        }else{
            return <h1>Wczytywanie...</h1>
        }
    }

    return (
        <>
            {
                dogImage()
            }
        </>
    );
}

export default Breed;
