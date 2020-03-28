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
      <div
        style={{
          position: 'absolute', left: '50%', top: '50%',
          transform: 'translate(-50%, -50%)',
          color: 'white',
        }}>
        <AddFriendForm />
        <a href="/" style={{color:"yellow"}}>Results</a>
      </div>
    )
  }

}

export default AddFriend
