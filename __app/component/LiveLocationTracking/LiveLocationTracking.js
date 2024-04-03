/* eslint-disable no-new */
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
  const googleApiUrl = `https://maps.googleapis.com/maps/api/js?${isProdKey ? 'client' : 'key'}=${googleKey}&libraries=places&loading=async&callback=scriptCbLLT`;

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
  destinationLatLng,
  mapTypeControl,
  panControl,
  zoomControl,
  scaleControl,
  streetViewControl,
  overviewMapControl,
  rotateControl,
  fullscreenControl,
}) {
  const directionMapRef = useRef();
  let directionsService;
  let directionsRenderer;
  let watchID = null;

  const createMarker = async (googleMap, userCurrenrLocation, url) => {
    const { AdvancedMarkerElement } = await google.maps.importLibrary('marker');

    const beachFlagImg = document.createElement('img');
    beachFlagImg.src = url;
    beachFlagImg.style.transform = 'scaleX(-1)';

    new AdvancedMarkerElement({
      map: googleMap,
      position: { lat: parseFloat(userCurrenrLocation.lat) - 0.0001, lng: userCurrenrLocation.lng },
      content: beachFlagImg,
      title: 'A marker using a custom PNG Image',
    });
  };

  function createCenterControl(map, userCurrenrLocation) {
    const controlButton = document.createElement('button');

    // Set CSS for the control.
    controlButton.style.backgroundColor = '#709bd5';
    controlButton.style.border = '2px solid #fff';
    controlButton.style.borderRadius = '50px';
    controlButton.style.boxShadow = '0 2px 6px rgba(0,0,0,.3)';
    controlButton.style.color = '#fff';
    controlButton.style.cursor = 'pointer';
    controlButton.style.fontFamily = 'Roboto,Arial,sans-serif';
    controlButton.style.fontSize = '16px';
    controlButton.style.lineHeight = '38px';
    controlButton.style.margin = '8px';
    controlButton.style.padding = '0 16px';
    controlButton.style.textAlign = 'center';
    controlButton.textContent = 'Start';
    controlButton.title = 'Click to recenter the map';
    controlButton.type = 'button';
    // Setup the click event listeners: simply set the map to Chicago.
    controlButton.addEventListener('click', () => {
      map.setCenter(userCurrenrLocation);
      map.setZoom(19);
    });
    return controlButton;
  }

  const createMap = async (userCurrenrLocation) => {
    try {
      const googleMap = new google.maps.Map(directionMapRef.current, {
        mapId: 'DEMO_MAP_ID',
        center: userCurrenrLocation,
        mapTypeControl,
        panControl,
        zoomControl,
        scaleControl,
        streetViewControl,
        overviewMapControl,
        rotateControl,
        fullscreenControl,

      });
      // Crate Start Button
      const centerControlDiv = document.createElement('div');
      const centerControl = createCenterControl(googleMap, userCurrenrLocation);
      centerControlDiv.appendChild(centerControl);
      googleMap.controls[google.maps.ControlPosition.LEFT_BOTTOM].push(centerControlDiv);

      // Change Origin and Destination marker
      createMarker(googleMap, userCurrenrLocation, 'https://maps.gstatic.com/mapfiles/ms2/micons/motorcycling.png');
      createMarker(googleMap, destinationLatLng, 'https://maps.gstatic.com/mapfiles/ms2/micons/red-dot.png');

      // Render Map with origin
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
          travelMode: google.maps.TravelMode.WALKING,
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

      window.scriptCbLLT = () => {
        if (isPermitByBrowser && isScriptInBrowser) {
          // setTimeout(() => {
          directionsService = new google.maps.DirectionsService();
          directionsRenderer = new google.maps.DirectionsRenderer({
            suppressMarkers: true,
            preserveViewport: true,
          });
          navigator.geolocation.getCurrentPosition((position) => {
            const lat = position.coords.latitude;
            const lng = position.coords.longitude;
            createMap({ lat, lng });
          });

          watchID = navigator.geolocation.watchPosition(
            (newPosition) => {
              const lat = newPosition.coords.latitude;
              const lng = newPosition.coords.longitude;
              plotDirection({ lat, lng });
            },
            locationError(),
            { enableHighAccuracy: true, timeout: 30000, maximumAge: 2000, distanceFilter: 100 },
          );
          // }, 200);
        }
      };
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
  mapTypeControl: PropTypes.bool,
  panControl: PropTypes.bool,
  zoomControl: PropTypes.bool,
  scaleControl: PropTypes.bool,
  streetViewControl: PropTypes.bool,
  overviewMapControl: PropTypes.bool,
  rotateControl: PropTypes.bool,
  fullscreenControl: PropTypes.bool,
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
  destinationLatLng: { lat: 12.9387901, lng: 77.6407703 },
  isProdKey: true,
  googleKey: '',
  mapTypeControl: true,
  panControl: true,
  zoomControl: true,
  scaleControl: true,
  streetViewControl: true,
  overviewMapControl: true,
  rotateControl: true,
  fullscreenControl: true,
};

export default Wrapper(LiveLocationTracking);

// WALKING - bike
// TWO_WHEELER - Walking
// DRIVING - Car
