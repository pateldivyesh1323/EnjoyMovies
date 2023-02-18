import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import MoviesCard from './MoviesCard';
import Play from './play_button.png'
import './style.css'

export default function MovieDetails() {

    let { movieId } = useParams();
    let api_key = "afd9086e3c061313176661d70983f827"
    const [movieData, setMovieData] = useState({});
    const [movieGen, setMovieGen] = useState([]);
    const [trailerLink, setTrailerLink] = useState("");
    const [movieImages, setMovieImages] = useState([]);
    const [similarMovies, setSimilarMovies] = useState([]);

    const languageNames = new Intl.DisplayNames(['en'], {
        type: 'language'
    });

    const fetchData = async () => {
        let url = `https://api.themoviedb.org/3/movie/${movieId}?api_key=${api_key}&append_to_response=images,similar,videos`;
        let data = await fetch(url);
        let parsedData = await data.json();
        console.log(parsedData);
        setMovieData(parsedData);
        setMovieGen(parsedData.genres);

        let backDropImages = parsedData.images.backdrops.filter((element, index) => {
            return index < 4;
        })
        setMovieImages(backDropImages);

        let similar = parsedData.similar.results.filter((element, index) => {
            return index < 5;
        })
        setSimilarMovies(similar);

        let link = await parsedData.videos.results.filter((element) => {
            return (element.type === "Trailer")
        })
        setTrailerLink(link[0].key);
    }

    useEffect(() => {
        fetchData();
        // eslint-disable-next-line
    }, [movieId])

    const getDate = (date) => {
        let newDate = date.slice(8, 10);

        const monthArray = { "01": "Jan", "02": "Feb", "03": "Mar", "04": "Apr", "05": "May", "06": "Jun", "07": "Jul", "08": "Aug", "09": "Sep", "10": "Oct", "11": "Nov", "12": "Dec" };

        newDate = newDate + " " + monthArray[date.slice(5, 7)] + " " + date.slice(0, 4);

        return newDate;
    }

    return (
        <div style={{ paddingBottom: "50px" }}>
            <div style={{ height: "750px" }}>
                <div className='detailsCont'>
                    <img src={`https://image.tmdb.org/t/p/original${movieData.backdrop_path}`} alt="BackDrop" className='backDropImg' />
                    <div className='movieDetails'>
                        <div className='posterCont'>
                            <div style={{ position: "relative", width: "320px", height: "410px" }}>
                                <img src={`https://image.tmdb.org/t/p/original${movieData.poster_path}`} alt="Poster" className='posterImg' />
                                <a href={trailerLink !== "" ? `https://www.youtube.com/watch?v=${trailerLink}` : ""}><img src={Play} alt="Play Trailer" className='play' /></a></div>
                        </div>
                        <div className='movieDetailsbox1'>
                            <div className="movieDetailsbox11">
                                <div className="movieDetailsTitle">{movieData.title}</div>
                                <div className="movieDetailsTag">{movieData.tagline}</div>
                                <div className="movieDetailsGenCont">
                                    {movieGen.map((element, index) => {
                                        return (<div className='movieDetailsGen' key={index}>{element.name}</div>)
                                    })}
                                </div>
                                <div className="movieDetailsRat">Rating: {movieData.vote_average}★</div>
                                <div className="movieDetailsDate">Release Date: {movieData.release_date ? getDate(movieData.release_date) : " "}</div>
                                <div className="movieDetailsStatus">Status: {movieData.status}</div>
                            </div>
                            <div className="movieDetailsbox12">
                                {movieData.overview && <div className="movieDetailsDesc">About: {movieData.overview}</div>}
                                {movieData.homepage && <div className="movieDetailsLink">Official Link: <a className="movieDetailsLink1" href={movieData.homepage}>{movieData.homepage}</a></div>}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className='moreMovieDetails'>
                Budget: ${movieData.budget}&nbsp;|&nbsp;Revenue: ${movieData.revenue}&nbsp;|&nbsp;Run-Time: {movieData.runtime} Minutes&nbsp;|&nbsp;Vote Count: {movieData.vote_count}&nbsp;|&nbsp;Adult: {movieData.adult ? "True" : "False"}
            </div>
            {movieData.production_companies && <div className="productionComp">
                Production Companies:&nbsp; {movieData.production_companies.map((element, index) => {
                    return (<span key={index}>{element.name} &nbsp;|&nbsp;</span>)
                })}
            </div>}
            <div className='detailImagesCont'>
                {movieImages.length !== 0 &&
                    movieImages.map((element, index) => {
                        return (<div key={index} style={{ display: "flex", justifyContent: "center", alignItems: "center" }}><img className='detailsBackdropImages' src={`https://image.tmdb.org/t/p/original${element.file_path}`} alt="" /></div>)
                    })
                }
            </div>
            {similarMovies.length!==0 && <div className='detailSimilarMov'>
                <div className='detailSimilarTitle'>Similar Movies</div>
                <div className="detailSimilarCont">
                    {
                        similarMovies.map((element, index) => {
                            return (<MoviesCard key={index} id={element.id} index={index} poster={element.poster_path} movieTitle={element.title} rating={element.vote_average} overview={element.overview} date={element.release_date} language={languageNames.of(element.original_language)} />)
                        })
                    }</div>
            </div>}
        </div>
    )
}
