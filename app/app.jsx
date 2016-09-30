import React from 'react';
import Relay from 'react-relay';
import ReactDOM from 'react-dom';
import CandidatesContainer from './containers/Candidates';
import TopCandidatesContainer from './containers/TopCandidates';
import RootRoute from './relay-routes/root';

const App = () => (
  <div>
    <div style={{ float: 'left' }}>
      <Relay.RootContainer
        Component={CandidatesContainer}
        route={new RootRoute()}
      />
    </div>
    <div style={{ float: 'left' }}>
      <Relay.RootContainer
        Component={TopCandidatesContainer}
        route={new RootRoute()}
      />
    </div>
    <div style={{ clear: 'both' }} />
  </div>
);

ReactDOM.render(
  <App />,
  document.getElementById('root')
);
