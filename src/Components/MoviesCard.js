import React from 'react'
import './style.css'
import Unavailable from './ImageUnavailable.webp'
import { Link } from 'react-router-dom'

export default function MoviesCard(props) {

    const cropRating = (rating) => {
        const newRating = rating.toString().slice(0, 3);
        return newRating;
    }

    const aniFun = () => {
        let card = document.getElementsByClassName("myCard")[props.index];
        card.style.transitionProperty = "width";
        card.style.transitionProperty = "height";
        card.style.transitionDuration = "0.1s";
    }

    return (
        <div className='myCardCont'>
            <Link to={`/movie/${props.id}`} style={{ textDecoration: "none" }}>
                <div className='myCard' onMouseEnter={aniFun}>
                    <img className="posterImage" src={props.poster ? `https://image.tmdb.org/t/p/original${props.poster}` : Unavailable} alt="Poster" />
                    <div className="movieTitle">{props.movieTitle}</div>
                    <div className="rating">{cropRating(props.rating)}★</div>
                </div>
            </Link>
        </div>
    )
}
