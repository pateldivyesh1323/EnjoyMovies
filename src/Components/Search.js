import React, { useEffect, useState } from "react";
import MoviesCard from "./MoviesCard";
import InfiniteScroll from 'react-infinite-scroll-component';
import './style.css'
import Spinner from './Spinner'
import { useParams } from 'react-router-dom';

export default function Search(props) {

    let { searchKey } = useParams();

    const api_key = process.env.API_KEY;
    const [moviesData, setMoviesData] = useState([]);
    const [page, setPage] = useState(1);
    const [totalResult, setTotalResult] = useState(0);

    const languageNames = new Intl.DisplayNames(['en'], {
        type: 'language'
    });

    const fetchData = async () => {
        props.setProgress(10);
        const url = `https://api.themoviedb.org/3/search/movie?api_key=${api_key}&query=${searchKey}&page=${page}`;
        props.setProgress(30);
        const data = await fetch(url);
        props.setProgress(40);
        const parsedData = await data.json();
        props.setProgress(80);
        setMoviesData(parsedData.results);
        props.setProgress(90);
        setTotalResult(parsedData.total_results);
        props.setProgress(100);
    }

    useEffect(() => {
        fetchData();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [props.category])

    const fetchMoreData = async () => {
        const url = `https://api.themoviedb.org/3/search/movie?api_key=${api_key}&query=${searchKey}&page=${page + 1}`;
        const data = await fetch(url);
        const parsedData = await data.json();
        setMoviesData(moviesData.concat(parsedData.results));
        setPage(page + 1);
        setTotalResult(parsedData.total_results);
    }

    return (
        <>
            <div className="main">
                <div className="genTitle2">Showing search results for "{searchKey}"</div>
                <InfiniteScroll
                    dataLength={moviesData.length}
                    next={fetchMoreData}
                    hasMore={totalResult > moviesData.length}
                    loader={<Spinner />}
                >
                    <div className="cont">
                        <div className="row">
                            {moviesData.map((element, index) => {
                                return (<MoviesCard key={index} id={element.id} index={index} poster={element.poster_path} movieTitle={element.title} rating={element.vote_average} overview={element.overview} date={element.release_date} language={languageNames.of(element.original_language)} />)
                            })}
                        </div>
                    </div>
                </InfiniteScroll>
            </div>
        </>
    )
}
