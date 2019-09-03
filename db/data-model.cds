namespace utg.twitter;
using { Country, managed } from '@sap/cds/common';

entity Tweets {
  key ID : String;
  text  : String;
  time  : DateTime;
	userName: String;
	screenName: String;
	userPicUrl: String
}
