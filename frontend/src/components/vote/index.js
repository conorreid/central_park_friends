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
      <div>
        <VoteForm />
        <a href="/">Results</a>
      </div>
    )
  }

}

export default Vote
