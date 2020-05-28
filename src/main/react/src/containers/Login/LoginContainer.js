import React from 'react';
import Spinner from '../../components/ui/Spinner';
import { browserHistory, Link } from 'react-router';
import style from 'containers/Login/style.css';
import { login } from '../../api';
import { isUserLoggedIn } from '../../auth';
import Layout from '../../components/Layout/Layout';

class LoginContainer extends React.Component {
    constructor() {
        super();
        if (isUserLoggedIn()) {
            browserHistory.push('/test-runs');
        }
        this.state = {
            isDataLoading: false,
            errorResponse: null,
            username: '',
            password: '',
            showingAlert: false
        }

        this.changeUsername = this.changeUsername.bind(this);
        this.changePassword = this.changePassword.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.backToLogin = this.backToLogin.bind(this);
    }

    componentDidMount() {
        this.setState({ isDataLoading: false });
    }

    changeUsername(event) {
        this.setState({ username: event.target.value });
    }
    changePassword(event) {
        this.setState({ password: event.target.value });
    }
    handleSubmit(event) {
        if (this.state.username.length > 0 && this.state.password.length > 7) {
            this.setState({
                errorResponse: null,
                showingAlert: false,
                isDataLoading: true
            });
            login(this.state.username, this.state.password)
                .then(user => {
                    this.setState({ isDataLoading: false, showingAlert: false });

                    if (user.token) {
                        sessionStorage.setItem('token', user.token);
                        sessionStorage.setItem('id', user.id);
                    }
                    browserHistory.push('/test-runs');
                })
                .catch(errorResponse => this.setState({
                    isDataLoading: false,
                    showingAlert: true,
                    errorResponse
                }));
        }
        else {
            this.setState({
                errorResponse: null,
                showingAlert: true
            });
        }
        event.preventDefault();
    }
    backToLogin() {
        this.setState({
            isDataLoading: false,
            errorResponse: null,
            username: '',
            password: '',
            showingAlert: false
        });
    }

    render() {
        return (
            <Layout>
                <Spinner isShown={this.state.isDataLoading} errorResponse={null} text="Logging in...">
                    <div className={style.center}>
                        <div className={"row " + style.header}>
                            <div className="col-md-12 form-group">
                                <h1>Welcome</h1>
                                <small>Please enter your credentials</small>
                            </div>
                        </div>
                        <form className={style.form} onSubmit={this.handleSubmit}>
                            <div className="row">
                                <div className="col-md-12 form-group">
                                    <input
                                        id="username"
                                        className={"form-control form-control-sm " + style.input}
                                        type="text"
                                        autoCorrect="off"
                                        autoCapitalize="off"
                                        autoComplete="off"
                                        placeholder="username"
                                        maxLength="100"
                                        value={this.state.username}
                                        onChange={this.changeUsername}
                                    />
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-md-12 form-group">
                                    <input
                                        type="password"
                                        id="password"
                                        className={"form-control form-control-sm " + style.input}
                                        autoCorrect="off"
                                        autoCapitalize="off"
                                        autoComplete="off"
                                        placeholder="password"
                                        maxLength="100"
                                        value={this.state.password}
                                        onChange={this.changePassword}
                                    />
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-md-12 col-12 text-center">
                                    <button type="submit" className={"btn btn-info " + style.submit} onClick={this.handleSubmit}>LOGIN</button>
                                </div>
                            </div>
                        </form>
                        <div className="row" style={{ display: this.state.showingAlert ? 'block' : 'none' }}>
                            <div className="col-md-12 form-group">
                                <div className="alert alert-info" role="alert">
                                    {this.state.errorResponse ?
                                        "Bad credentials! Use another username and password."
                                        :
                                        "Username or password are not valid! Password should be at least 8 characters long."
                                    }
                                </div>
                            </div>
                        </div>
                    </div>
                </Spinner>
            </Layout>
        );
    }
}

export default LoginContainer;
