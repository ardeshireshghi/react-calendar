const DISCOVERY_DOCS = [
  'https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest'
];

const SCOPES = 'https://www.googleapis.com/auth/calendar.readonly';
const GOOGLE_CLIENT_ID =
  '271248151045-nt0e54lbgk5cp67tpklgubodno5u8bjt.apps.googleusercontent.com';
const GOOGLE_API_KEY = 'AIzaSyBoqYrbsDPZrXXok-Rm19ktIwObO-X4Izs';

export default {
  clientId: GOOGLE_CLIENT_ID,
  apiKey: GOOGLE_API_KEY,
  discoveryDocs: DISCOVERY_DOCS,
  scopes: SCOPES
};
