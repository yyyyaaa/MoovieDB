import React, { Component } from 'react';
import numeral from 'numeral';

class Card extends Component {
  render() {
    let data = this.props.data,
        posterIMG = 'https://image.tmdb.org/t/p/w500' + data.poster,
        production = data.production,
        productionCountries = data.production_countries,
        genres = data.genre,
        totalRevenue = data.revenue,
        productionList = production,
        productionCountriesList = productionCountries,
        noData = '-',
        genresList = genres,
        backdropIMG = 'https://image.tmdb.org/t/p/original' + data.backdrop;
        
    return (
      <div>
        <p>{posterIMG}</p>
        <p>{production}</p>
        <p>{productionCountries}</p>
        <p>{genres}</p>
        <p>{totalRevenue}</p>
        <p>{backdropIMG}</p>                
      </div>
    )
  }
}

export default Card;