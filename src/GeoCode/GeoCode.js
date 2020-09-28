import Geocode from "react-geocode"

Geocode.setApiKey("AIzaSyAhDc0tbe9Kbv3iH6n8mUs9hAD4fpzQNp4")

Geocode.enableDebug()

Geocode.fromLatLng("12.916150555555555", "77.63216166666666").then(
    response => {
      const address = response.results[0].formatted_address;
      console.log(address);
    },
    error => {
      console.error(error);
    }
);