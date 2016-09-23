import _ from 'lodash';
import * as Faker from 'faker';
import Candidate from './graphql/models/candidate';
import Vote from './graphql/models/vote';

_.times(15, () => {
  const candidate = new Candidate();
  candidate.firstName = Faker.name.firstName();
  candidate.lastName = Faker.name.lastName();
  candidate.save();
});

_.times(100, () => {
  const vote = new Vote();
  vote.candidate = _.shuffle(Candidate.all())[0];
  vote.save();
});
