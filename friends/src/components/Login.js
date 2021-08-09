import React from 'react';
import { axiosWithAuth } from '../utils/axiosWithAuth';

class Login extends React.Component {
    state = {
        credentials: {
            username: "",
            password: ""
        }
    }

    handleChange = event => {
        // updating state using setState
        this.setState({
            //updating credentials spreading state of credentials with target inputs
            credentials:  {
                ...this.state.credentials,
                [event.target.name]: event.target.value
            }
        })
    }

    loginSubmit = event => {
        //stops the form from resetting with out input data
        event.preventDefault();
        axiosWithAuth()
        .post("/login", this.state.credentials)
        .then(response => {
            console.log(response);
            localStorage.setItem("token", response.data.payload);
            this.props.history.push("/protected");
        })
        .catch(error => {
            console.log("Error: ", error)
        })
    }


    render() {
        return (
            <div className="login-form">
                <form onSubmit={this.loginSubmit}>
                    <input type="text" name="username" value={this.state.credentials.username} onChange={this.handleChange} />
                    <input type="password" name="password" value={this.state.credentials.password} onChange={this.handleChange} />
                    <button>Log in!</button>
                </form>
            </div>
        )
    }

};
export default Login;