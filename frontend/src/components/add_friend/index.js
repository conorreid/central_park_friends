import './styles.css'
import React, {Component} from 'react'
import AddFriendForm from './add_friend_form'

class AddFriend extends Component {

  constructor(props) {
    super(props);
    this.state = {value: '', friends: []};
  }


  render () {
    return (
      <div>
        <AddFriendForm />
        <a href="/">Results</a>
      </div>
    )
  }

}

export default AddFriend
