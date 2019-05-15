import React, { Component } from 'react';
import axios from 'axios';
const Context = React.createContext();

//like redux
const reducer = (state, action) => {
  switch(action.type){
    case 'SEARCH_TRACKS':
      return {
        ...state,
        track_list: action.payload,
        heading: 'Search results'
      };
      default:
        return state;
  }
}

export class Provider extends Component {
  state = {
    track_list: [],
    heading: 'Top ten tracks!',
    //info din search.js ajunge aici
    dispatch: action => this.setState(state => reducer(state, action))
  };

  //API my key f87e1456d4daf414811640b24fffe4f7
  componentDidMount() {
    axios
      .get(
        `https://cors-anywhere.herokuapp.com/https://api.musixmatch.com/ws/1.1/chart.tracks.get?chart_name=top&page=10&page_size=10&country=ro&f_has_lyrics=1&apikey=${process.env.REACT_APP_MM_KEY}`)
      .then(res => {
        //console.log(res.data)
        this.setState({ track_list: res.data.message.body.track_list })
      })
      .catch(err => console.log(err));
  }

  render() {
    return (
      <Context.Provider
        value={this.state}
      >
        { this.props.children }
      </Context.Provider>
    )
  }
}


export const Consumer = Context.Consumer;