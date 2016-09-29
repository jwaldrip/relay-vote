import Model from './Model';

export default class Vote extends Model {
  get candidate() {
    const { default: Candidate } = require('./Candidate');
    return Candidate.all().find(
      candidate => candidate.id === this.candidateId
    );
  }

  set candidate(candidate) {
    this.candidateId = candidate.id;
    return candidate;
  }
}

Vote.attrAccessor('candidateId');
