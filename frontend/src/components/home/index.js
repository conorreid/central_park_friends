import './styles.css'
import * as constants from '../../constants.js'
import React, {Component} from 'react'
import axios from 'axios'


class Home extends Component {

  state = {
    friends: []
  }

  componentDidMount () {
    const url = `${constants.API_ROOT}/vote-count`
    axios.get(url).then((res) => {
      this.setState({friends: res.data.data})
    })

  }

  render () {
    const {friends} = this.state
    return (
      <div className="vote-summary">
      <h1>Who should get a lovely tour of Central Park?</h1>
      <h2>It's supposed to be beautiful in November, lots of red leaves.</h2>
        <ol type="1">
          {
            friends.map((friend) => <li>
              {friend.first_name} {friend.last_name} - {friend.count} votes
            </li>)
          }
        </ol>
        <p><a href="/vote">Vote</a></p><br />
        <a href="/add-friend">Add New Friend</a>
      </div>
    )
  }

}



export default Home
