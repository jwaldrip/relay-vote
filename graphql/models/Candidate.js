import Model from './Model';

export default class Candidate extends Model {

  get votes() {
    const { default: Vote } = require('./Vote');
    return Vote.all().filter(v => this.id === v.candidateId);
  }

  get voteCount() {
    return this.votes.length;
  }

  get fullName() {
    return `${this.firstName} ${this.lastName}`;
  }
}

Candidate.field('firstName');
Candidate.field('lastName');
