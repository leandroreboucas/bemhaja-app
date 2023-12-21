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
      videoQuality: ImagePicker.UIImagePickerControllerQualityType.Medium,
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

export const mediaUtils = {
  launchLibraryImage,
  launchCameraImage,
  launchVideo,
  launchLibraryVideo,
};
