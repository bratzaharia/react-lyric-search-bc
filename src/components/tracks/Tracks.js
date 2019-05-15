import React, { Component } from 'react';
import { Consumer } from '../../context';
import Track from './Track'
import Spinner from '../layout/Spinner';

export class Tracks extends Component {
  render() {
    return (
      <Consumer>
        {value => {
          console.log(value);
          
          //destructuring
          const { track_list, heading } = value;
//conditional layout

          if(track_list === undefined || track_list === 0) {
            return <Spinner />
          } else {
            return (
              <React.Fragment>
                <h3 className="text-center">{ heading }</h3>
                <div className="row">
                  {/* map through our state */}
                  { track_list.map(item => (
                    <Track key={item.track.track_id} track={item.track}/>
                  ))}
                </div>
              </React.Fragment>
            );
          }
        }}
      </Consumer>
    )
  }
}

export default Tracks
