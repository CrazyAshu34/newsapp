import React, { useEffect, useState } from 'react';

import NewsItem from './NewsItem';
import Spinner from './Spinner';
import PropTypes from 'prop-types';
import InfiniteScroll from 'react-infinite-scroll-component';

const News = (props) => {
    const [articles, setArticles] = useState([])
    const [loading, setLoading] = useState(true)
    const [page, setPage] = useState(1)
    const [totalResults, setTotalResults] = useState(0)


    const sentenceCase = (str) => {
        return str.charAt(0).toUpperCase() + str.slice(1);
    }

    const updateNews = async () => {
        props.setProgress(2);
        const url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=8b6cce548bfa43e8814a82f62b228d3c&page=${page}&pageSize=${props.pageSize}`;
        setLoading(true);
        try {
            let data = await fetch(url);
            props.setProgress(30);
            let parseData = await data.json();
            props.setProgress(50);
            setArticles(parseData.articles);
            setTotalResults(parseData.totalResults);
            setLoading(false);
            props.setProgress(100);
        } catch (error) {
            console.error("Error fetching news:", error);
            setLoading(false);
        }
    }


    useEffect(() => {
        document.title = `${sentenceCase(props.category)} - NewsChurcha`;
        updateNews();

    }, [])
    //previous click
    const handlePrevClick = async () => {
        setPage(page - 1)

        updateNews();

    }

    // Next click 
    const handleNextClick = async () => {
        setPage(page + 1)
        updateNews();
    };



    const fetchMoreData = async () => {
        const url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=8b6cce548bfa43e8814a82f62b228d3c&page=${page+1}&pageSize=${props.pageSize}`;
        setPage(page + 1);
        try {
            let data = await fetch(url);
            let parseData = await data.json();
            setArticles(articles.concat(parseData.articles)); // Use 'articles' directly
            setTotalResults(parseData.totalResults);
        } catch (error) {
            console.error("Error fetching more data:", error);
        }
    };




    return (
        <>
            <h1 className="text-center" style={{ margin: '20px 0px', marginTop: '90px' }}>AKS NewS - Top Headlines From {sentenceCase(props.category)} </h1>

            {loading && <Spinner />}
            <InfiniteScroll
                dataLength={articles.length}
                next={fetchMoreData}
                hasMore={articles.length !== totalResults}
                loader={<Spinner />}>

                <div className="container">
                    <div className='row'>
                        {articles.map((element) => {
                            return (
                                <div className="col-md-4" key={element.url} >
                                    <NewsItem title={element.title ? element.title.slice(0, 40) : ""} description={element.description ? element.description.slice(0, 88) : ""} imageUrl={element.urlToImage} url={element.url} author={element.author} date={element.publishedAt} source={element.source.name} />
                                </div>
                            );
                        })}

                    </div>
                </div>
            </InfiniteScroll>
        </>
    );
}


News.defaultProps = {
    category: "general",
    country: 'in',
    pageSize: 8
}
News.propTypes = {
    category: PropTypes.string,
    country: PropTypes.string,
    pageSize: PropTypes.number
}
export default News;

