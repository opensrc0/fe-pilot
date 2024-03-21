import React from 'react';
import PropTypes from 'prop-types';
import Wrapper from '../Wrapper/Wrapper';
import { handleSuccess, handleError } from '../services/handlerService';
import dependentJsService from '../services/dependentJsService';

const checkPermitByBrowser = async (disbaleToast, failureMsg, failureCb) => {
  try {
    const permissions = await navigator.permissions.query({ name: 'geolocation' });
    if (permissions.state === 'denied') {
      return handleError({ disbaleToast, msgType: 'PERMISSION_DENIED', msg: failureMsg.permissionDenied || 'Permission Denied', failureCb });
    }
  } catch (error) {
    return handleError({ disbaleToast, msgType: 'BROWSER_PERMISION_API_FAILED', msg: failureMsg.browserPermissionAPIFailed || 'Unable to check browser permission', failureCb });
  }

  return true;
};
const checkScriptInBrowser = async (disbaleToast, failureMsg, failureCb, isProdKey, googleKey) => {
  if (!googleKey) {
    return handleError({ disbaleToast, msgType: 'GOOGLE_API_KEY_MISSING', msg: failureMsg.googleAPIKeyMissing || 'Google Key is missing', failureCb });
  }
  const googleApiUrl = `https://maps.googleapis.com/maps/api/js?${isProdKey ? 'client' : 'key'}=${googleKey}&libraries=places&loading=async`;

  try {
    await dependentJsService(googleApiUrl, 'googleMapLocationAPI', true);
    return true;
  } catch (error) {
    return handleError({ disbaleToast, msgType: 'UNABLE_TO_LOAD_GOOGLE_APIS', msg: failureMsg.unableToLoadGoogleAPI || 'Unable to load google api script', failureCb });
  }
};

const getPincode = async (
  latitude,
  longitude,
  disbaleToast,
  failureCb,
  failureMsg,
) => {
  try {
    const geocoder = new google.maps.Geocoder();
    const latlng = new google.maps.LatLng(latitude, longitude);
    const { results } = await geocoder.geocode({ latLng: latlng });
    if (results[0]) {
      const address = results[0].address_components;
      let zipcode = '';
      // eslint-disable-next-line no-plusplus
      for (let i = 0; i < address.length; i++) {
        if (address[i].types.includes('postal_code')) { zipcode = address[i].short_name; }
      }
      return zipcode;
    }
  } catch (err) {
    return handleError({ disbaleToast, msgType: 'ERROR', msg: failureMsg.invalidLatLng || 'Invalid Lat lng', failureCb });
  }

  return '';
};

const onSuccss = async (
  disbaleToast,
  successCb,
  failureCb,
  successMsg,
  failureMsg,
  position,
) => {
  const zipcode = await getPincode(
    position.coords.latitude,
    position.coords.longitude,
    disbaleToast,
    failureCb,
    failureMsg,
  );

  handleSuccess({ disbaleToast, msgType: 'SUCCESS', msg: successMsg, successCb, data: zipcode });
};

const onFailure = async (failureCb, error, disbaleToast, failureMsg) => {
  failureCb(error);
  return handleError({ disbaleToast, msgType: 'ERROR', msg: failureMsg.error || error, failureCb });
};

function LocateMe({
  disbaleToast,
  successCb,
  failureCb,
  successMsg,
  failureMsg,
  children,
  isProdKey,
  googleKey,
}) {
  const onClick = async () => {
    if (LocateMe.isBrowserSupport()) {
      const isPermitByBrowser = await checkPermitByBrowser(disbaleToast, failureMsg, failureCb);
      const isScriptInBrowser = await checkScriptInBrowser(
        disbaleToast,
        failureMsg,
        failureCb,
        isProdKey,
        googleKey,
      );
      if (isPermitByBrowser && isScriptInBrowser) {
        navigator.geolocation.getCurrentPosition((position) => {
          onSuccss(
            disbaleToast,
            successCb,
            failureCb,
            successMsg,
            failureMsg,
            position,
          );
        }, (error) => {
          onFailure(failureCb, error, disbaleToast, failureMsg);
        });
      }
    } else {
      return handleError({ disbaleToast, msgType: 'UN_SUPPORTED_FEATURE', msg: failureMsg.unSupported, failureCb });
    }
    return true;
  };

  return (
    React.Children.map(children || 'Use my current location', (child) => React.cloneElement(typeof child === 'string' ? <span>{child}</span> : child, {
      onClick,
    }))
  );
}

LocateMe.isBrowserSupport = () => navigator.geolocation
  && navigator?.permissions?.query
  && navigator?.geolocation?.getCurrentPosition
  && true;

LocateMe.propTypes = {
  disbaleToast: PropTypes.bool,
  successCb: PropTypes.func,
  failureCb: PropTypes.func,
  successMsg: PropTypes.string,
  failureMsg: PropTypes.object,
  isProdKey: PropTypes.bool,
  googleKey: PropTypes.string.isRequired,
};

LocateMe.defaultProps = {
  disbaleToast: false,
  successCb: () => {},
  failureCb: () => {},
  successMsg: '',
  failureMsg: {
    unSupported: '',
    permissionDenied: '',
    browserPermissionAPIFailed: '',
    googleAPIKeyMissing: '',
    unableToLoadGoogleAPI: '',
    invalidLatLng: '',
    error: '',
  },
  isProdKey: true,
  googleKey: '',
};

export default Wrapper(LocateMe);
