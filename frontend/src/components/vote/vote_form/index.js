import './styles.css'
import * as constants from '../../../constants.js'
import React, {Component} from 'react'
import axios from 'axios'
import { createBrowserHistory } from 'history'


const history = createBrowserHistory({
    forceRefresh: true
  })


class VoteForm extends Component {

  constructor(props) {
    super(props);
    this.state = {value: '', friends: []};

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount () {
    const url = `${constants.API_ROOT}/friend-list`
    axios.get(url).then((res) => {
      this.setState({friends: res.data.data})
    })
  }

  handleChange(event) {
    this.setState({value: event.target.value});
  }

  handleSubmit(event)  {
    event.preventDefault();
    const friend_id_value = this.state.value
    const url = `${constants.API_ROOT}/vote`
    const data = {
      friend_id: friend_id_value
    }
    const headers = {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*'
    }
    axios.post(url, data, {headers: headers}).then((res) => {
     console.log(res)
     history.push('/')
    })
  }

  render () {
    const {friends} = this.state
    return (
      <form onSubmit={this.handleSubmit} onChange={this.handleChange} >
         {
            friends.map((friend) => <label><input type="radio" value={friend.id} name="friend" />
              {friend.first_name} {friend.last_name} <br /></label>)
          }
          <label><input type="submit" value="Vote" /></label><br />
      </form>
    )
  }

}

export default VoteForm
