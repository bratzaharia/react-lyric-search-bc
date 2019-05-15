import React, { Component } from 'react'
import axios from 'axios'
import { Consumer } from '../../context.js'

class Search extends Component {
  state = {
    trackTitle: '',

  }
  //modifica continutul oricarui input
  modificaInput = e => {
    this.setState({ [e.target.name]: e.target.value })
  }

  //on submit form -- gaseste versuri 
  prelucreazaForma = (dispatch, e) => {
    e.preventDefault();

    axios
      .get(
        `https://cors-anywhere.herokuapp.com/https://api.musixmatch.com/ws/1.1/track.search?q_track=${this.state.trackTitle}&page_size=10&page=1&s_track_rating=desc&apikey=${
          process.env.REACT_APP_MM_KEY
        }`
      )
      .then(res => {
        //console.log(res.data)
        dispatch({
          type: 'SEARCH_TRACKS',
          payload: res.data.message.body.track_list
        });

        this.setState({ trackTitle: '' });
      })
      .catch(err => console.log(err));

  }
  render() {
    return (
      <Consumer>
        { value => {
          //console.log(value)
          const { dispatch } = value;
          return (
            <div className="card card-body mb-4 p-4">
              <h1 className="display-4 text-center">
                <i className="fas fa-music"></i> Search for a song
              </h1>
              <p className="lead text-center">Get the lyrics for a song</p>
              
              <form onSubmit={this.prelucreazaForma.bind(this, dispatch)}>
                <div className="form-group">
                  <input 
                    type="text"
                    className="form-control form-control-lg"
                    placeholder="Song title..."
                    name="trackTitle" //same name like in state
                    value={this.state.trackTitle} //into state
                    onChange={this.modificaInput}
                  />
                </div>
                <button className="btb btn-primary btn-lg btn-block btn-block mb-5"
                type="submit">Get track lyrics</button>
              </form>
            </div>
          );
        }}
      </Consumer>
    )
  }
}
export default Search