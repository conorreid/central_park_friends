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
      <div 
        style={{
          position: 'absolute', left: '50%', top: '50%',
          transform: 'translate(-50%, -50%)',
          color: 'white',
        }}
        className="vote-summary">
      <h2>Who should get a lovely tour of Central Park?</h2>
      <h4>It's supposed to be beautiful in November, lots of red leaves.</h4>
        <ol type="1">
          {
            friends.map((friend) => <li>
              {friend.first_name} {friend.last_name} - {friend.count} votes
            </li>)
          }
        </ol>
        <p><a href="/vote" style={{color:"yellow"}}>Vote</a></p>
        <a href="/add-friend" style={{color:"yellow"}}>Add New Friend</a>
      </div>
    )
  }

}



export default Home
