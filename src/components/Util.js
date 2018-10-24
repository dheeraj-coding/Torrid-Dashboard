import axios from 'axios';
import { apiKey } from '../constant';
export function getPostcode(lat, lon, callback) {
    axios({
        url: 'https://eu1.locationiq.com/v1/reverse.php?key=' + apiKey + '&lat=' + lat + '&lon=' + lon + '&format=json',
        method: "GET",
    }).then((res) => {
        callback(res['data']['address']['postcode']);
    })
}