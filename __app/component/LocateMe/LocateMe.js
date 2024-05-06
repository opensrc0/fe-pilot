import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { handleSuccess, handleError, handleLoading } from '../services/handlerService';
import Wrapper from '../Wrapper/Wrapper';
import dependentJsService from '../services/dependentJsService';

const failureMsgDefault = {
  unSupported: 'LocationMe is not supporting in your device',
  permissionDenied: 'Permission Denied',
  googleAPIKeyMissing: 'Google Key is missing',
  unableToLoadGoogleAPI: 'Unable to load google api script',
  browserPermissionAPIFailed: 'Unable to check browser permission',
  invalidLatLng: 'Invalid Lat lng',
  error: '',
};

const isBrowserSupport = () => globalThis.navigator?.geolocation
  && globalThis.navigator?.permissions?.query
  && globalThis.navigator?.geolocation?.getCurrentPosition;

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

const getPincode = async (
  latitude,
  longitude,
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
    return handleError({ msgType: 'INVALID_LAT_LNG', msg: failureMsg.invalidLatLng, failureCb });
  }

  return '';
};

const onSuccss = async (
  successCb,
  failureCb,
  successMsg,
  failureMsg,
  position,
) => {
  const zipcode = await getPincode(
    position.coords.latitude,
    position.coords.longitude,
    failureCb,
    failureMsg,
  );

  handleSuccess({ msgType: 'SUCCESSFUL', msg: successMsg, successCb, data: zipcode });
};

const onFailure = async (failureCb, error, failureMsg) => handleError({ msgType: 'ERROR', msg: failureMsg.error || error, failureCb });

const locateMe = ({
  successCb = () => {},
  failureCb = () => {},
  loadingCb = () => {},
  successMsg = 'Located Successfully!!',
  failureMsg: failureMsgProps = { ...failureMsgDefault },
  isProdKey = true,
  googleKey = '',
} = {}) => {
  const failureMsg = { ...failureMsgDefault, ...failureMsgProps };

  const init = async () => {
    if (isBrowserSupport()) {
      handleLoading({ loadingCb });

      // Your Code will start from here
      const isPermitByBrowser = await checkPermitByBrowser(failureMsg, failureCb);
      const isScriptInBrowser = await checkScriptInBrowser(
        failureMsg,
        failureCb,
        isProdKey,
        googleKey,
      );
      if (isPermitByBrowser && isScriptInBrowser) {
        navigator.geolocation.getCurrentPosition((position) => {
          onSuccss(
            successCb,
            failureCb,
            successMsg,
            failureMsg,
            position,
          );
        }, (error) => {
          onFailure(failureCb, error, failureMsg);
        });
      }
      // Your Code will end here
    } else {
      return handleError({ msgType: 'UN_SUPPORTED_FEATURE', msg: failureMsg.unSupported, failureCb });
    }
    return true;
  };

  init();
};

function LocateMe({
  children,
  successCb,
  failureCb,
  loadingCb,
  successMsg,
  failureMsg,
  ...props
}) {
  useEffect(() => {
    globalThis.console.error = (...arg) => {
      if (arg[0] && arg[0]?.indexOf('https://developers.google.com/maps/documentation/javascript/error-messages') !== -1) {
        const errMsg = arg[0].split('\nhttps://developers.google.com/maps/documentation/javascript/error-messages')[0];

        return handleError({ msgType: 'ERROR', msg: errMsg, failureCb });
      }

      return true;
    };
  }, []);

  return React.Children.map(children || 'LocateMe', (child) => React.cloneElement(typeof child === 'string' ? <span>{child}</span> : child, {
    onClick: () => locateMe({
      successCb,
      failureCb,
      loadingCb,
      successMsg,
      failureMsg,
      ...props,
    }),
  }));
}

LocateMe.propTypes = {
  showForever: PropTypes.bool,
  successCb: PropTypes.func,
  failureCb: PropTypes.func,
  loadingCb: PropTypes.func,
  successMsg: PropTypes.string,
  failureMsg: PropTypes.object,
  isProdKey: PropTypes.bool,
  googleKey: PropTypes.string,
};

const WLocateMe = Wrapper(LocateMe, isBrowserSupport);

export { locateMe, WLocateMe as LocateMe };

export default WLocateMe;
