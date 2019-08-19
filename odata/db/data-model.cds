namespace utg.twitter;
using { Country, managed } from '@sap/cds/common';

entity Tweets {
  key ID : String;
  text  : String;
  // author : Association to Authors;
  time  : DateTime;
	userName: String;
	userPicUrl: String
}

// entity Authors {
//   key ID : String;
//   name   : String;
//   tweets  : Association to many Tweets on tweets.author = $self;
// }

// entity Media {
//   key ID : String;
// 	tweet: Association to Tweets;
//   url   : String;
// 	type: String;
// }
