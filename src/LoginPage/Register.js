
import { BrowserRouter as Router, Route, Link, BrowserRouter, Routes } from 'react-router-dom';
import React, { Component } from "react";
import contactLists from '../ChatPage/contactLists';
import users from './usersList';
import './Login.css';
import logo from "../images/ChatApp-logos.jpeg";
import default_img from "../images/default_friend_img.jpg"
import axios from 'axios';
class Register extends Component {
    constructor(props) {
        super(props);
        this.state = {
            img: '',
            errors: ''
        }
        this.username = React.createRef();
        this.password = React.createRef();
        this.cpassword = React.createRef();
        this.nickname = React.createRef();
        this.onSubmit = this.onSubmit.bind(this);
        this.handleImageChange = this.handleImageChange.bind(this)
    }
    handleImageChange(event) {
        this.setState({ img: URL.createObjectURL(event.target.files[0]) });
    }
    usernameIsValid(username) {
        return /^[0-9\-]+$/.test(username);
    }
    passwordIsValid(password) {
        return /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(password);
    }

    async onSubmit(event) {
        var screenMessage = '';
        if (this.cpassword.current.value !== this.password.current.value) {
            screenMessage += '*Password and confirmation dont match.\n'
        }
        axios.post(`https://localhost:7243/api/users/Register`, { username:this.username.current.value ,
        password:this.password.current.value , nickname: this.nickname.current.value })
        .then(res => {
                console.log(res.data)
                if(res.data === 'yes'){
                    this.props.setName('GO_TO_LOGIN');
                }
                else{
                    // this.setState({
                    //     errors: screenMessage
                    // });
                    alert("there is problem")
                    event.preventDefault();
                }
        })
    }
    render() {
        return (
            <div className="everything">
                <form className="login-form register-form" onSubmit={this.onSubmit}>
                    <div className="row mb form">
                        <label className="col-sm col-form-label">Username</label>
                        <div className="col-sm">
                            <input id='username' className="form-control" ref={this.username}></input>
                        </div>
                    </div>
                    <div className="row mb form">
                        <label for="inputPassword3" className="col-sm col-form-label">Password</label>
                        <div className="col-sm">
                            <input type="password" className="form-control" id="inputPassword3" ref={this.password}></input>
                        </div>
                    </div>
                    <div className="row mb form">
                        <label for="inputPassword3" className="col-sm col-form-label">Confirm password</label>
                        <div className="col-sm">
                            <input type="password" className="form-control" id="inputPassword3" ref={this.cpassword}></input>
                        </div>
                    </div>
                    <div className="row mb form">
                        <label className="col-sm col-form-label">Display name</label>
                        <div className="col-sm">
                            <input id='username' className="form-control" ref={this.nickname}></input>
                        </div>
                    </div>
                    <div className="row mb form">
                        
                        <label className="col-sm col-form-label">Profile image</label>
                        
                        <div className="col-sm">
                            <input type="file" name="myImage" onChange={this.handleImageChange} />
                        </div>
                    </div>
                    <div className='regButton'>
                        <button type="submit" className="btn btn-primary modal__btn">Register</button>
                        <span className='register'>Already registered? </span>
                        <Link to='../'>Click here</Link>
                        <span> to login.</span>
                    </div>
                    <div className="alert-message">
                        {this.state.errors}
                    </div>
                </form>
                <img src={logo} className="logo-div"></img>
            </div>
        )
    }
}
export default Register;
