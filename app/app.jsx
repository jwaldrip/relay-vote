import React from 'react';
import Relay from 'react-relay';
import ReactDOM from 'react-dom';
import CandidatesContainer from './containers/Candidates';
import RootRoute from './relay-routes/root';

const App = () => (
  <table>
    <tbody>
      <tr>
        <td>
          <Relay.RootContainer
            Component={CandidatesContainer}
            route={new RootRoute()}
          />
        </td>
        {/* <td>
          <Relay.RootContainer
            Component={CandidatesContainer}
            route={new RootRoute()}
          />
        </td> */}
      </tr>
    </tbody>
  </table>
);

ReactDOM.render(
  <App />,
  document.getElementById('root')
);
