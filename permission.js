import {
  PERMISSIONS,
  RESULTS,
  request,
  openSettings,
} from 'react-native-permissions';
import {Platform} from 'react-native';

export const askForLocation = () =>
  new Promise(async (resolve, reject) => {
    const openAppSettings = () => {
      openSettings()
        .then(() => {})
        .catch(() => {});
    };

    let permissionCode;
    try {
      if (Platform.OS === 'ios') {
        permissionCode = PERMISSIONS.IOS.LOCATION_WHEN_IN_USE;
      } else {
        permissionCode = PERMISSIONS.ANDROID.LOCATION_WHEN_IN_USE;
      }
      request(permissionCode)
        .then(result => {
          if (result === RESULTS.GRANTED) {
            resolve(RESULTS);
          } else {
            openAppSettings();
          }
        })
        .catch(() => openAppSettings());
    } catch (e) {
      reject(e);
    }
  });
