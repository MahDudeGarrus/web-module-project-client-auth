import React from 'react';
import { axiosWithAuth } from '../utils/axiosWithAuth';

class Friends extends React.Component {
    state = {
        friends: []
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

    render() {
        return (
            <div>
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