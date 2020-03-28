import './styles.css'
import React, {Component} from 'react'
import VoteForm from './vote_form'


class Vote extends Component {

  constructor(props) {
    super(props);
    this.state = {value: '', friends: []};
  }

  render () {
    return (
      <div
        style={{
          position: 'absolute', left: '50%', top: '50%',
          transform: 'translate(-50%, -50%)',
          color: 'white',
        }}>
        <VoteForm />
        <a href="/" style={{color:"yellow"}}>Results</a>
      </div>
    )
  }

}

export default Vote
