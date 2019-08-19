using utg.twitter from '../db/data-model';

service TwitterService {

  entity Tweets @readonly as projection on twitter.Tweets;
  // entity Authors @readonly as projection on twitter.Authors;
  // entity Media @readonly as projection on twitter.Media;

}
