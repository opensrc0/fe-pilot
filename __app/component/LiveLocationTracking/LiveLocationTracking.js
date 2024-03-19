import React, { useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import dependentService from '../services/dependentJsService';
import { handleError, handleSuccess } from '../services/handlerService';

function LiveLocationTracking({
  disbaleToast,
  successCb,
  failureCb,
  successMsg,
  failureMsg,
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
          travelMode: google.maps.TravelMode.DRIVING,
        })
        .then((response) => {
          directionsRenderer.setDirections(response);
          handleSuccess({ disbaleToast, msgType: 'SUCCESS', msg: successMsg, successCb, data: currentLocations });
        }).catch(() => handleError({ disbaleToast, msgType: 'UNABLE_TO_LOCATE_DIRECTION', msg: failureMsg.unableToLocateDirection || 'Unable To get Updated Location', failureCb }));
    }
  };

  const locationError = (error) => {
    if (error) {
      if (error.code === 1 && error.message === 'User denied Geolocation') {
        handleError({ disbaleToast, msgType: 'PERMISSION_DENIED', msg: failureMsg.permissionDenied || 'Permission Denied', failureCb });
      }
      handleError({ disbaleToast, msgType: 'LOCATION_NOT_FOUND', msg: failureMsg.locationNotFound || 'Unable To get Updated Location', failureCb });
    }
  };

  useEffect(() => {
    if (LiveLocationTracking.isBrowserSupport()) {
      const googleMapUrl = `https://maps.googleapis.com/maps/api/js?${isProdKey ? 'client' : 'key'}=${googleKey}`;
      dependentService(googleMapUrl, 'googleMapLocationAPI')
        .then(async () => {
          try {
            directionsService = new google.maps.DirectionsService();
            directionsRenderer = new google.maps.DirectionsRenderer();
            createMap(originLatLng);

            // Adding a watch when user cordinates changes to replot the direction
            watchID = navigator.geolocation.watchPosition(
              (newPosition) => {
                const lat = newPosition.coords.latitude;
                const lng = newPosition.coords.longitude;
                plotDirection({ lat, lng });
              },
              locationError(),
              { enableHighAccuracy: true, timeout: 30000, maximumAge: 2000, distanceFilter: 100 },
            );
          } catch (error) {
            console.log(error);
          }
        })
        .catch(() => handleError({ disbaleToast, msgType: 'SCRIPT_NOT_LOADED', msg: failureMsg.scriptNotLoaded || 'Unable to load script properly', failureCb }));
    } else {
      return handleError({ disbaleToast, msgType: 'UN_SUPPORTED_FEATURE', msg: failureMsg.unSupported, failureCb });
    }

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

LiveLocationTracking.isBrowserSupport = () => navigator?.geolocation?.watchPosition;

LiveLocationTracking.propTypes = {
  disbaleToast: PropTypes.bool,
  successCb: PropTypes.func,
  failureCb: PropTypes.func,
  successMsg: PropTypes.string,
  failureMsg: PropTypes.object,
  isProdKey: PropTypes.bool,
  googleKey: PropTypes.string.isRequired,
  destinationLatLng: PropTypes.object.isRequired,
  zoom: PropTypes.number,
  mapTypeControl: PropTypes.bool,
};

LiveLocationTracking.defaultProps = {
  disbaleToast: false,
  successCb: () => {},
  failureCb: () => {},
  successMsg: '',
  failureMsg: {
    unSupported: '',
    permissionDenied: '',
    unableToLocateDirection: '',
    browserPermissionCheckFailed: '',
    unableToLoadGoogleAPI: '',
    locationNotFound: '',
    scriptNotLoaded: '',
    invalidLatLng: '',
    googleAPIKeyMissing: '',
    error: '',
  },
  isProdKey: true,
  zoom: 13,
  mapTypeControl: false,
};

export default LiveLocationTracking;

// WALKING - bike
// TWO_WHEELER - Walking
// DRIVING - Car
