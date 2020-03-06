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
    this.state = {value: '', first_name: '', last_name: ''};

    this.handleFirstNameChange = this.handleFirstNameChange.bind(this);
    this.handleLastNameChange = this.handleLastNameChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleFirstNameChange(event) {
    this.setState({first_name: event.target.value});
  }

  handleLastNameChange(event) {
    this.setState({last_name: event.target.value});
  }

  handleSubmit(event)  {
    event.preventDefault();
    const first_name_value = this.state.first_name
    const last_name_value = this.state.last_name
    const url = `${constants.API_ROOT}/friend`
    const data = {
      first_name: first_name_value,
      last_name: last_name_value
    }
    const headers = {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*'
    }
    axios.post(url, data, {headers: headers}).then((res) => {
     console.log(res)
     history.push('/')
    })
    this.props.callbackFromParent()
  }

  render () {
    return (
      <form onSubmit={this.handleSubmit} >
          <label>First name:<br /></label>
          <input type="text" name="first_name" onChange={this.handleFirstNameChange} /><br />
          <label>Last name:<br /></label>
          <input type="text" name="last_name" onChange={this.handleLastNameChange} /><br />
          <label><input type="submit" value="Add Friend" /></label><br />
      </form>
    )
  }

}

export default VoteForm
