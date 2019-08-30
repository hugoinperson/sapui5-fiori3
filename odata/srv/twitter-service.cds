using utg.twitter from '../db/data-model';

service TwitterService {

  entity Tweets @readonly as projection on twitter.Tweets;

}
