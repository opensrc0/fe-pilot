import React, { useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import dependentService from '../services/dependentJsService';

function LiveLocationTracking({
  googleKey,
  isProdKey,
  zoom,
  mapTypeControl,
  originLatLng,
  destinationLatLng,
}) {
  const directionMapRef = useRef();
  let directionsService;
  let directionsRenderer;
  let watchID = null;

  const createMap = (userCurrenrLocation) => {
    const googleMap = new google.maps.Map(directionMapRef.current, {
      mapTypeControl,
      center: userCurrenrLocation,
      zoom,
    });
    directionsRenderer.setMap(googleMap);
  };

  const plotDirection = (currentLocations) => {
    if (directionsService && directionsService.route && directionsService.route.length) {
      directionsService
        .route({
          origin: currentLocations,
          destination: destinationLatLng,
          travelMode: google.maps.TravelMode.TWO_WHEELER,
        })
        .then((response) => {
          directionsRenderer.setDirections(response);
        }).catch((e) => console.warn(`Directions request failed due to ${e}`));
    }
  };
  // WALKING - bike
  // TWO_WHEELER - Walking
  // DRIVING - Car
  const locationError = (error) => {
    if (error) {
      if (error.code === 1 && error.message === 'User denied Geolocation') {
        console.warn('User denied Geolocation');
      } else {
        console.warn('Location loading failed');
      }
    }
  };

  useEffect(() => {
    const googleMapUrl = `https://maps.googleapis.com/maps/api/js?${isProdKey ? 'client' : 'key'}=${googleKey}`;
    dependentService(googleMapUrl, 'googleMapLocationAPI')
      .then(async () => {
        directionsService = new google.maps.DirectionsService();
        directionsRenderer = new google.maps.DirectionsRenderer();
        createMap(originLatLng);

        // Adding a watch when user cordinates changes to replot the direction
        watchID = navigator.geolocation.watchPosition(
          (newPosition) => {
            const lat = newPosition.coords.latitude;
            const lng = newPosition.coords.longitude;
            console.log(lat, lng);
            plotDirection({ lat, lng });
          },
          locationError(),
          { enableHighAccuracy: true, timeout: 30000, maximumAge: 2000, distanceFilter: 100 },
        );
      })
      .catch((error) => {
        console.warn(error);
      });
    return () => {
      if (watchID) {
        navigator.geolocation.clearWatch(watchID);
      }
    };
  }, []);

  return (
    <div ref={directionMapRef} style={{ height: '50vh' }} />
  );
}

LiveLocationTracking.propTypes = {
  destinationLatLng: PropTypes.object.isRequired,
  zoom: PropTypes.number,
  mapTypeControl: PropTypes.bool,
  googleKey: PropTypes.string.isRequired,
  isProdKey: PropTypes.bool.isRequired,
};

LiveLocationTracking.defaultProps = {
  zoom: 13,
  mapTypeControl: false,
};

export default LiveLocationTracking;
