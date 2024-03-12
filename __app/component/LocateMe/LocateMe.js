import React from 'react';
import PropTypes from 'prop-types';
import Wrapper from '../Wrapper/Wrapper';
import { handleSuccess, handleError } from '../services/handlerService';
import dependentJsService from '../services/dependentJsService';

const checkBrowserPermit = async (disbaleToast, failureMsg, failureCb) => {
  try {
    const permissions = await navigator.permissions.query({ name: 'geolocation' });
    if (permissions.state === 'denied') {
      handleError({ disbaleToast, msgType: 'PERMISSION_DENIED', msg: failureMsg.permissionDenied || 'Permission Denied', failureCb });
      return false;
    }
  } catch (error) {
    handleError({ disbaleToast, msgType: 'BROWSER_PERMISION_CHECK_FAILED', msg: failureMsg.browserPermissionCheckFailed || 'Unable to check browser permission', failureCb });
    return false;
  }

  return true;
};
const checkScriptInBrowser = async (disbaleToast, failureMsg, failureCb, isProdKey, googleKey = 'gme-reliancecorporate1') => {
  const googleApiUrl = `https://maps.googleapis.com/maps/api/js?${isProdKey ? 'client' : 'key'}=${googleKey}&libraries=places&loading=async`;

  try {
    await dependentJsService(googleApiUrl, 'googleMapLocationAPI', true);
    return true;
  } catch (error) {
    handleError({ disbaleToast, msgType: 'UNABLE_TO_LOAD_GOOGLE_APIS', msg: failureMsg.unableToLoadGoogleAPI || 'Unable to load google api script', failureCb });

    return false;
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
    handleError({ disbaleToast, msgType: 'ERROR', msg: failureMsg.invalidLatLng || 'Invalid Lat lng', failureCb });
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

  handleError({ disbaleToast, msgType: 'ERROR', msg: failureMsg.error || error, failureCb });
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
    const isBrowserPermit = await checkBrowserPermit(disbaleToast, failureMsg, failureCb);
    const isScriptInBrowser = await checkScriptInBrowser(
      disbaleToast,
      failureMsg,
      failureCb,
      isProdKey,
      googleKey,
    );

    if (isBrowserPermit && isScriptInBrowser) {
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
  };

  return (
    React.Children.map(children || 'Use my current location', (child) => React.cloneElement(typeof child === 'string' ? <span>{child}</span> : child, {
      onClick,
    }))
  );
}

LocateMe.isBrowserSupport = () => navigator.geolocation
  && navigator?.permissions?.query
  && navigator?.geolocation?.getCurrentPosition;

LocateMe.propTypes = {
  disbaleToast: PropTypes.bool,
  successCb: PropTypes.func,
  failureCb: PropTypes.func,
  successMsg: PropTypes.string,
  failureMsg: PropTypes.object,
  isProdKey: PropTypes.bool,
};

LocateMe.defaultProps = {
  disbaleToast: false,
  successCb: () => {},
  failureCb: () => {},
  successMsg: '',
  failureMsg: {
    unSupported: '',
    permissionDenied: '',
    browserPermissionCheckFailed: '',
    unableToLoadGoogleAPI: '',
    invalidLatLng: '',
    error: '',
  },
  isProdKey: true,
};

export default Wrapper(LocateMe);
