import crypto from 'crypto';
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

  get emailAddress() {
    return this.attributes.emailAddress;
  }

  set emailAddress(value) {
    const v = `${value}`.toLowerCase().trim();
    this.attributes.emailAddress = value;
    return v;
  }

  get gravatar() {
    const hash = crypto.createHash('md5').update(this.emailAddress).digest('hex');
    return `https://s.gravatar.com/avatar/${hash}`;
  }
}

Candidate.attrAccessor('firstName');
Candidate.attrAccessor('lastName');
