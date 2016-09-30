import React from 'react';

export default class CandidateFormComponent extends React.Component {
  static propTypes = {
    handleAdd: React.PropTypes.func.isRequired,
  }

  static initialState = {
    firstName: '',
    lastName: '',
    emailAddress: '',
  };

  constructor(...args) {
    super(...args);
    this.state = this.constructor.initialState;
  }

  onSubmit = (e) => {
    e.preventDefault();
    e.stopPropagation();
    this.props.handleAdd(this.state);
    this.setState(this.constructor.initialState);
  }

  buildHandleFieldChange = fieldName => (e) => {
    const stateObj = {};
    stateObj[fieldName] = e.target.value;
    this.setState(stateObj);
  };

  render() {
    return (
      <form onSubmit={this.onSubmit}>
        <input placeholder="First Name" onChange={this.buildHandleFieldChange('firstName')} value={this.state.firstName} />
        <input placeholder="Last Name" onChange={this.buildHandleFieldChange('lastName')} value={this.state.lastName} />
        <input placeholder="Email Address" onChange={this.buildHandleFieldChange('emailAddress')} value={this.state.emailAddress} />
        <input type="submit" value="Add Candidate" />
      </form>
    );
  }
}
