import firebase from 'firebase';
import { config } from './constant';
const fireb = firebase.initializeApp(config);
export default fireb;