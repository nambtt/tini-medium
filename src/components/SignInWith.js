import React, { Component } from 'react';
import { connect } from 'react-redux'
import GoogleLogin from 'react-google-login'
import {
    SignInUser,
    toggleClose,
    toggleOpen
} from './../redux/actions/actions'
import Config from '../config'

class SignInWith extends Component {

    render() {
        const responseGoogle = (res) => {
            console.log(res);
            var profile = res.profileObj;
            let postData = {
                name: profile.name,
                provider: 'google',
                email: profile.email,
                provider_id: profile.googleId,
                token: res.tokenId,
                provider_pic: profile.imageUrl
            }
            console.log(postData)
            // build our user data
            this.props.SignInUser(postData)
            this.props.toggleClose()
        }

        return (
            <div>
                <div data-behavior="overlay" className={this.props.modalMode === true ? 'overlay overlay-hugeinc open' : 'overlay overlay-hugeinc'}>
                    <button onClick={this.props.toggleClose} data-behavior="close-overlay" type="button" className="overlay-close"><span className="glyphicon glyphicon-remove"></span></button>
                    <nav>
                        <h2 className="grayed-heading center">Sign In</h2>
                        <ul className="omniauth-button-group">

                            <li className="omniauth-button google">
                                <GoogleLogin className="button google"
                                    clientId={Config.GOOGLE_LOGIN_CLIENT_ID}
                                    onSuccess={responseGoogle}
                                    onFailure={responseGoogle} >
                                    <i className="fa fa-google"></i><span> SignIn with Google</span>
                                </GoogleLogin>
                            </li>

                        </ul>
                    </nav>
                </div>
            </div>
        );
    }
}
const mapStateToProps = state => {
    return {
        modalMode: state.common.modalMode
    }
}

export default connect(mapStateToProps, {
    toggleClose,
    toggleOpen,
    SignInUser
})(SignInWith);
