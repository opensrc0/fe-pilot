import React, { useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import dependentJsService from '../services/dependentJsService';
import { handleError, handleSuccess, handleLoading } from '../services/handlerService';
import Wrapper from '../Wrapper/Wrapper';

const checkPermitByBrowser = async (failureMsg, failureCb) => {
  try {
    const permissions = await navigator.permissions.query({ name: 'geolocation' });
    if (permissions.state === 'denied') {
      return handleError({ msgType: 'PERMISSION_DENIED', msg: failureMsg.permissionDenied, failureCb });
    }
  } catch (error) {
    return handleError({ msgType: 'BROWSER_PERMISION_API_FAILED', msg: failureMsg.browserPermissionAPIFailed, failureCb });
  }

  return true;
};
const checkScriptInBrowser = async (failureMsg, failureCb, isProdKey, googleKey) => {
  if (!googleKey) {
    return handleError({ msgType: 'GOOGLE_API_KEY_MISSING', msg: failureMsg.googleAPIKeyMissing, failureCb });
  }
  const googleApiUrl = `https://maps.googleapis.com/maps/api/js?${isProdKey ? 'client' : 'key'}=${googleKey}&libraries=places&loading=async`;

  try {
    await dependentJsService(googleApiUrl, 'googleMapLocationAPI', true);
    return true;
  } catch (error) {
    return handleError({ msgType: 'UNABLE_TO_LOAD_GOOGLE_APIS', msg: failureMsg.unableToLoadGoogleAPI, failureCb });
  }
};

function LiveLocationTracking({
  successCb,
  failureCb,
  successMsg,
  failureMsg,
  loadingCb,
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
    try {
      const googleMap = new google.maps.Map(directionMapRef.current, {
        mapTypeControl,
        center: userCurrenrLocation,
        zoom,
      });
      directionsRenderer.setMap(googleMap);
    } catch (error) {
      return handleError({ msgType: 'UNABLE_TO_CREATE_MAP', msg: failureMsg.unableToCreateMap, failureCb });
    }

    return true;
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
          handleSuccess({ msgType: 'SUCCESSFUL', msg: successMsg, successCb, data: currentLocations });
        }).catch(() => handleError({ msgType: 'UNABLE_TO_LOCATE_DIRECTION', msg: failureMsg.unableToLocateDirection, failureCb }));
    }
  };

  const locationError = (error) => {
    if (error) {
      if (error.code === 1 && error.message === 'User denied Geolocation') {
        handleError({ msgType: 'PERMISSION_DENIED', msg: failureMsg.permissionDenied || 'Permission Denied', failureCb });
      }
      handleError({ msgType: 'LOCATION_NOT_FOUND', msg: failureMsg.locationNotFound, failureCb });
    }
  };

  const init = async () => {
    if (LiveLocationTracking.isBrowserSupport()) {
      handleLoading({ loadingCb });
      const isPermitByBrowser = await checkPermitByBrowser(failureMsg, failureCb);
      const isScriptInBrowser = await checkScriptInBrowser(

        failureMsg,
        failureCb,
        isProdKey,
        googleKey,
      );
      if (isPermitByBrowser && isScriptInBrowser) {
        setTimeout(() => {
          directionsService = new google.maps.DirectionsService();
          directionsRenderer = new google.maps.DirectionsRenderer();
          createMap(originLatLng);

          watchID = navigator.geolocation.watchPosition(
            (newPosition) => {
              const lat = newPosition.coords.latitude;
              const lng = newPosition.coords.longitude;
              plotDirection({ lat, lng });
            },
            locationError(),
            { enableHighAccuracy: true, timeout: 30000, maximumAge: 2000, distanceFilter: 100 },
          );
        }, 200);
      }
    } else {
      return handleError({ msgType: 'UN_SUPPORTED_FEATURE', msg: failureMsg.unSupported, failureCb });
    }
    return true;
  };

  useEffect(() => {
    init();

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
  successCb: PropTypes.func,
  failureCb: PropTypes.func,
  loadingCb: PropTypes.func,
  successMsg: PropTypes.string,
  failureMsg: PropTypes.object,
  isProdKey: PropTypes.bool,
  googleKey: PropTypes.string,
  destinationLatLng: PropTypes.object,
  zoom: PropTypes.number,
  mapTypeControl: PropTypes.bool,
};

LiveLocationTracking.defaultProps = {
  successCb: () => {},
  failureCb: () => {},
  loadingCb: () => {},
  successMsg: '',
  failureMsg: {
    unSupported: 'LiveLocationTracking is not supporting in your device',
    permissionDenied: 'Permission Denied',
    unableToLocateDirection: 'Unable To get Updated Location',
    browserPermissionAPIFailed: 'Unable to check browser permission',
    unableToLoadGoogleAPI: 'Unable to load google api script',
    locationNotFound: 'Unable To get Updated Location',
    // invalidLatLng: '',
    googleAPIKeyMissing: 'Unable to check browser permission',
    error: '',
  },
  destinationLatLng: { lat: 12.9541033, lng: 77.7091133 },
  isProdKey: true,
  googleKey: '',
  zoom: 13,
  mapTypeControl: false,
};

export default Wrapper(LiveLocationTracking);

// WALKING - bike
// TWO_WHEELER - Walking
// DRIVING - Car
