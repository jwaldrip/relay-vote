import Person from './graphql/models/Person';

const data = [
  { firstName: 'Adam', lastName: 'Smith', emailAddress: 'asmith@commercialtribe.com' },
  { firstName: 'Alejandro', lastName: 'Cotroneo', emailAddress: 'acotroneo@commercialtribe.com' },
  { firstName: 'Bob', lastName: 'Hemphill', emailAddress: 'bhemphill@commercialtribe.com' },
  { firstName: 'Chris', lastName: 'Driscol', emailAddress: 'cdriscol@commercialtribe.com' },
  { firstName: 'Rob', lastName: 'Allsop', emailAddress: 'rallsop@commercialtribe.com' },
  { firstName: 'Elliot', lastName: 'Brun', emailAddress: 'ebrun@commercialtribe.com' },
  { firstName: 'Eric', lastName: 'Irwin', emailAddress: 'eirwin@commercialtribe.com' },
  { firstName: 'Facundo', lastName: 'Pedrazzini', emailAddress: 'fpedrazzini@commercialtribe.com' },
  { firstName: 'Federico', lastName: 'Bohn', emailAddress: 'fbohn@commercialtribe.com' },
  { firstName: 'Jacob', lastName: 'Caban-Tomski', emailAddress: 'jcabantomski@commercialtribe.com' },
  { firstName: 'Patrick', lastName: 'Ortel', emailAddress: 'portel@commercialtribe.com' },
  { firstName: 'Sebastian', lastName: 'Marconi', emailAddress: 'smarconi@commercialtribe.com' },
  { firstName: 'Siaka', lastName: 'Gassama', emailAddress: 'sgassama@commercialtribe.com' },
  { firstName: 'Steve', lastName: 'Tyree', emailAddress: 'styree@commercialtribe.com' },
  { firstName: 'Tyler', lastName: 'Drake', emailAddress: 'tdrake@commercialtribe.com' },
];
data.forEach(attrs => Person.create(attrs));
