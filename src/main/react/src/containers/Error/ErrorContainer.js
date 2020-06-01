import React from 'react';
import { browserHistory, Link } from 'react-router';
import style from './styles.css';
import { isUserLoggedIn } from '../../auth';
import Layout from '../../components/Layout/Layout';
class ErrorContainer extends React.Component {
  static propTypes = {
    error: React.PropTypes.object
  };

  componentDidMount() {
    document.title = this.props.error && this.props.error.status === 404 ?
      'Page Not Found' : 'Error';
  }

  goBackToTestSuites = (event) => {
    event.preventDefault();
    browserHistory.push("/test-suites");
  };

  goBackToLogin = (event) => {
    event.preventDefault();
    browserHistory.push("/");
  };

  render() {
    if (this.props.error) console.error(this.props.error); // eslint-disable-line no-console

    const [code, title] = this.props.error && this.props.error.status === 404 ?
      ['404', 'Page not found'] :
      ['Error', 'Oups, something went wrong'];

    return (
      <Layout>
        <main className={style.content}>
          <h1 className={style.code}>{code}</h1>
          <p className={style.title}>{title}</p>
          {code === '404' &&
            <p className={style.text}>
              The page you&apos;re looking for does not exist or an another error occurred.
            </p>
          }
        </main>
        <div className="text-center">
          {isUserLoggedIn() ?
            <Link className="btn btn-secondary" onClick={this.goBackToTestSuites}> BACK TO TEST SUITES</Link>
            :
            <Link className="btn btn-secondary" onClick={this.goBackToLogin}> BACK TO LOGIN </Link>
          }
        </div>
      </Layout>
    );
  }
}

export default ErrorContainer;
