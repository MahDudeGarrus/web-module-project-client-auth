import React from 'react';
import { axiosWithAuth } from '../utils/axiosWithAuth';

class Friends extends React.Component {
    state = {
        friends: [{
            id: '',
            name: '',
            age: '',
            email: ''
        }]
    };

    componentDidMount() {
        this.getFriends();
    }

    getFriends = () => {
        axiosWithAuth()
        .get("/friends", {
        })
        .then(response => {
            console.log(response.data);
            this.setState({friends: response.data})
        })
        .catch(error => {
            console.log("Error fetching friends: ", error.response.data.error)
        })
    };

    getNewFriends = event => {
        event.preventDefault();
        axiosWithAuth()
        .get("/friends/123", this.state.friends)
        .then(response => {
            console.log("Hey a new friend! ", response)
        })
        .catch(error => {
            console.log("Error adding new friend ", error)
        })
    }

    friendChange = event => {
        this.setState({
            friends: [{
                ...this.state.friends,
                [event.target.name]: event.target.value
            }]
        })
    }

    render() {
        return (
            <div className='friends-container'>
                <div className='new-friends-form'>
                    <form onSubmit={this.getNewFriends}>
                        <input type ="text" name="name" value={this.state.friends.name} onChange={this.friendChange} />
                        <input type ="text" name="age" value={this.state.friends.age} onChange={this.friendChange} />
                        <input type ="email" name="email" value={this.state.friends.email} onChange={this.friendChange} />
                        <button>Add Friend!</button>
                    </form>

                </div>
                {this.state.friends.map(friend => (
                    <div key={friend.id} className='friend-info'>
                        <h3>Name : {friend.name}</h3>
                        <p>Age : {friend.age}</p>
                        <p>Email : {friend.email}</p>
                    </div>
                ))}
            </div>
        )
    }
}

export default Friends