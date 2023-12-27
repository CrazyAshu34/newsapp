import React from 'react';

const NewsItem = (props) => { // Add 'props' as a parameter
    const { title, description, imageUrl, url, author, date, source } = props;
    return (
        <div className='my-3'>
            <div className="card">
                <div style={{
                    display: 'flex',
                    justifyContent: 'flex-end',
                    position: 'absolute',
                    right: 0
                }}>
                    <span className="badge rounded-pill bg-danger" >{source}</span>
                </div>
                <img src={!imageUrl ? "https://wallpapers.com/images/featured/no-0ofqwe6s51ohii2t.jpg" : imageUrl} className="card-img-top" alt="cricket png" />
                <div className='card-body'>
                    <h4 className="card-title">{title}</h4>
                    <p className="card-text">{!description ? "I don't know why internet is so stupid and can't change it's enterprinces " : description}...</p>
                    <p className="card-text"><small className="text-danger">By {!author ? "unknown" : author} on {new Date(date).toGMTString()}</small></p>
                    <a rel="noreferrer" href={url} target='_blank' className="btn btn-sm btn-dark">Read More</a>
                </div>
            </div>
        </div>
    );
}

export default NewsItem;
