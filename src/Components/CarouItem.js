import React from 'react'
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from 'react-responsive-carousel';
import Unavailable from './ImageUnavailable.webp'
import { Link } from 'react-router-dom';

export default function CarouItem(props) {
  const carou = props.carou.filter((element,index)=>{
    return index<10;
  })

  const getDate = (date) => {
    let newDate = date.slice(8, 10);

    const monthArray = { "01": "Jan", "02": "Feb", "03": "Mar", "04": "Apr", "05": "May", "06": "Jun", "07": "Jul", "08": "Aug", "09": "Sep", "10": "Oct", "11": "Nov", "12": "Dec" };

    newDate = newDate + " " + monthArray[date.slice(5, 7)] + " " + date.slice(0, 4);

    return newDate;
  }

  return (
    <div className='carousel'>
      <Carousel
        autoPlay={true}
        showThumbs={false}
        transitionTime={1000}
        infiniteLoop={true}
        showStatus={false}
        interval={5000}
        preventMovementUntilSwipeScrollTolerance={true}
        swipeScrollTolerance={0}>
        {carou.map((element, index) => {
          return (
            <Link to={`/movie/${element.id}`}  key={index}><div className='carou' >
              <img className='backgroundImage' src={element.backdrop_path ? `https://image.tmdb.org/t/p/original/${element.backdrop_path}` : Unavailable} alt="Backdrop" />
              <div className="carouText">
                <div className='carouName'>{element.title}</div>
                <div className="carouDesc">{element.overview}</div>
                <div className="carouBox1">
                  <div className="caroudate">{getDate(element.release_date)}</div>
                  <div className='carouRating'>{element.vote_average}★</div>
                </div>
              </div>
            </div>
            </Link>)
        })}
      </Carousel>
    </div>
  )
}
