import React from 'react';
import Relay from 'react-relay';
import ReactDOM from 'react-dom';
import CandidatesContainer from './containers/Candidates';
import RootRoute from './relay-routes/root';

ReactDOM.render(
  <Relay.RootContainer
    Component={CandidatesContainer}
    route={new RootRoute()}
  />,
  document.getElementById('root')
);
