import React, { Component } from 'react';
import numeral from 'numeral';
let backdropIMG;

class Card extends Component {
  componentDidMount() {
    setBackdrop();
  }

  componentDidUpdate() {
    setBackdrop();
  }

  render() {
    let data = this.props.data,
        posterIMG = 'https://image.tmdb.org/t/p/w500' + data.poster_path,
        production = data.production_companies,
        genres = data.genres,
        totalRevenue = data.revenue,
        productionList = nestedDataToString(production),
        noData = '-',
        genresList = nestedDataToString(genres);
        backdropIMG = 'https://image.tmdb.org/t/p/original' + data.backdrop_path;
    
    if (data.vote_average === 'undefined' || data.vote_average === 0) {
      data.vote_average = noData
    } else {
      data.vote_average = data.vote_average + ' / 10'
    };

    if (totalRevenue === 'undefined' || totalRevenue === 0) {
      totalRevenue = noData
    } else {
      totalRevenue = numeral(data.revenue).format('($0,0)');
    };

    if(data.poster_path == null){
      posterIMG = 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSols5HZxlQWyS9JY5d3_L9imbk0LiziHiyDtMZLHt_UNzoYUXs2g';
    }

    return (
      <div className="section">
        <div className="columns card">
          <div className="column is-5 card-poster">
            <img src={posterIMG} alt={data.original_title} />
          </div>

          <div className="column card-meta-data">
            <div className="content">
              <div className="section">
                <h1>{data.original_title}</h1>

                <span className="tagline">{data.tagline}</span>
                <p>{data.overview}</p>
                <div className="additional-details">
                  <span className="genre-list">{genresList}</span>
                  <span className="production-list">{productionList}</span>
                  <div className="columns">
                    <div className="column is-half"> Original Release: <span className="meta-data">{data.release_date}</span></div>
                    <div className="column is-half"> Running Time: <span className="meta-data">{data.runtime} mins</span> </div>
                  </div>
                  <div className="columns">
                    <div className="column is-half"> Box Office: <span className="meta-data">{totalRevenue}</span></div>
                    <div className="column is-half"> Vote Average: <span className="meta-data">{data.vote_average}</span></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

function setBackdrop() {
  document.body.style.backgroundImage = 'url(' + backdropIMG + ')';
}

function nestedDataToString(nestedData) {
  let nestedArray = [],
      resultString;
  nestedArray.forEach(function(item, i){
    nestedArray.push(item.name);
  });
  resultString = nestedArray.join(', '); // array to string
  return resultString;
};

export default Card;