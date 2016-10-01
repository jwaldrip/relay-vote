import crypto from 'crypto';
import Model from './';
import Vote from './Vote';

export default class Person extends Model {

  get voted() {
    return !!Vote.all().filter(v => this.id === v.voterId).length;
  }

  get voteCount() {
    return this.votes.length;
  }

  get fullName() {
    return `${this.firstName} ${this.lastName}`;
  }

  set emailAddress(value) {
    const v = `${value}`.toLowerCase().trim();
    this.attributes.emailAddress = value;
    return v;
  }

  get gravatar() {
    if (this.emailAddress) {
      const hash = crypto.createHash('md5').update(this.emailAddress).digest('hex');
      return `https://s.gravatar.com/avatar/${hash}`;
    }
    return null;
  }
}

Person.hasMany(Vote, { foreignKey: 'candidateId' });
Person.attrGetter('emailAddress');
Person.attrAccessor('firstName');
Person.attrAccessor('lastName');
