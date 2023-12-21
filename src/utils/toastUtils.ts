import Toast from 'react-native-toast-message';

function showToast(
  message: string,
  type: 'success' | 'error' | 'info' | 'any' = 'any',
) {
  Toast.show({
    text1: message,
    type,
    position: 'bottom',
    visibilityTime: 4000,
    autoHide: true,
    topOffset: 30,
    bottomOffset: 40,
  });
}

export const toastUtils = {
  showToast,
};
