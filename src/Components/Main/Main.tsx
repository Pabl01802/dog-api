import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom'
import './Main.css';
import axios from 'axios';

const Main = () => {

    const [breeds, setBreeds] = useState<string[]>([])

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

    const breedsList = breeds.map((b:string, key) => {
        let path = b.split(" ")
        return(
            <div className='breed-name' key={key}>
                <span>
                    <Link style={{ 'textDecoration': 'none', 'color': 'black' }} to={ path.length === 1 ? `/${path[0]}` : `/${path[0]}-${path[1]}` }>{b}</Link>
                </span>
            </div>
        )
    })

    return (
        <div className='breeds-list'>
            {breedsList}
        </div>
    );
}

export default Main;