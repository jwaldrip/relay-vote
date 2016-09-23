import React from 'react';
import ReactDOM from 'react-dom';
import CandidatesContainer from './containers/Candidates';
import RootRoute from './relay-routes/candidates';
import Relay from 'react-relay';

ReactDOM.render(
  <Relay.RootContainer
    Component={CandidatesContainer}
    route={new RootRoute()}
  />,
  document.getElementById('root')
);
