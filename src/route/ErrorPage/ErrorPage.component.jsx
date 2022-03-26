import { PureComponent } from 'react';
import './ErrorPage.style.scss';

class ErrorPage extends PureComponent {
  render() {
    return (
      <div className="ErrorPageContainer">
        <h2>ERROR 404</h2>
        <p>
          Page was not found.
        </p>
      </div>
    );
  }
}

export default ErrorPage;
