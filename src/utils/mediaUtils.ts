import * as ImagePicker from 'expo-image-picker';

async function launchLibraryImage(): Promise<string | null> {
  let image = null;
  try {
    ImagePicker.requestMediaLibraryPermissionsAsync;
    const photoSelected = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      quality: 1,
      base64: false,
      aspect: [4, 4],
    });
    if (!photoSelected.canceled) {
      image = photoSelected.assets[0].uri;
    }
  } catch (error) {
    console.log(error);
  } finally {
    return image;
  }
}

async function launchLibraryVideo(): Promise<string | null> {
  let image = null;
  try {
    ImagePicker.requestMediaLibraryPermissionsAsync;
    const photoSelected = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Videos,
      allowsEditing: true,
      quality: 1,
      base64: false,
      videoMaxDuration: 10,
    });
    if (!photoSelected.canceled) {
      console.log(photoSelected);
      image = photoSelected.assets[0].uri;
    }
  } catch (error) {
    console.log(error);
  } finally {
    return image;
  }
}

async function launchCameraImage(): Promise<string | null> {
  let image = null;
  try {
    ImagePicker.requestCameraPermissionsAsync();
    const photoSelected = await ImagePicker.launchCameraAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      quality: 1,
      base64: false,
      aspect: [4, 4],
      cameraType: ImagePicker.CameraType.front,
    });
    if (!photoSelected.canceled) {
      image = photoSelected.assets[0].uri;
    }
  } catch (error) {
    console.log(error);
  } finally {
    return image;
  }
}

async function launchVideo(): Promise<string | null> {
  let image = null;
  try {
    ImagePicker.requestCameraPermissionsAsync();
    const photoSelected = await ImagePicker.launchCameraAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Videos,
      quality: 1,
      videoQuality: ImagePicker.UIImagePickerControllerQualityType.High,
      cameraType: ImagePicker.CameraType.back,
      videoMaxDuration: 10,

      allowsEditing: true,
    });
    if (!photoSelected.canceled) {
      console.log(photoSelected);
      image = photoSelected.assets[0].uri;
    }
  } catch (error) {
    console.log(error);
  } finally {
    return image;
  }
}

async function getMimeType(extension: string) {
  let contentType = 'image/jpeg';
  if (extension === 'mp4') {
    contentType = 'video/mp4';
  }
  if (extension === 'mov') {
    contentType = 'video/quicktime';
  }
  if (extension === '3gp') {
    contentType = 'audio/3gpp';
  }
  if (extension === 'caf') {
    contentType = 'audio/x-caf';
  }
  if (extension === 'm4a') {
    contentType = 'audio/mp4';
  }
  if (extension === 'wav') {
    contentType = 'audio/wav';
  }
  if (extension === 'aac') {
    contentType = 'audio/aac';
  }
  if (extension === 'webm') {
    contentType = 'audio/webm';
  }
  return contentType;
}

export const mediaUtils = {
  launchLibraryImage,
  launchCameraImage,
  launchVideo,
  launchLibraryVideo,
  getMimeType,
};
