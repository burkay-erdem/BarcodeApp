import React, { useEffect } from 'react';
import { Alert, Image, StyleSheet, TouchableWithoutFeedback, View } from "react-native";


import { useCamera } from './useCamera';
import { usePhotos } from './usePhoto';
import { Icon } from 'react-native-paper';
import { IconTypes } from '../../../icon-list';
export type PickerType = 'camera' | 'photos'  | 'both'
interface IImageInput {
  imageUri?: string;
  onChangeImage: (e?: string) => void;
  onCancel: () => void;
  mode: PickerType;
}
export const ImageInput: React.FC<IImageInput> = ({ imageUri, onChangeImage, onCancel , mode  }) => {

  const camera = useCamera();
  const photos = usePhotos();

  const handlePress = async () => {
    if (!imageUri) {
      switch (mode) {
        case 'camera':
          selectImage('camera')
          break;
        case 'photos':
          selectImage('photos');
          break;
        case 'both':
        default:
          Alert.alert(
            'Please choose',
            undefined,
            [
              { text: 'Photos', onPress: () => selectImage('photos') },
              { text: 'Camera', onPress: () => selectImage('camera') },
              { text: 'Cancel', style: 'cancel' }
            ]
          );
      }

    } else {
      Alert.alert('Remove', 'are you sure you want to remove this image?', [
        { text: 'Yes', onPress: () => onChangeImage() },
        { text: 'No' },
      ]);
    }
  };

  const selectImage = async (pickerType: PickerType) => {
    try {
      if (pickerType === 'camera') {
        const result = await camera.takePhoto({
          allowsEditing: false,
          quality: 1
        })
        console.log('result: ', result);
        result.canceled ? onCancel() : onChangeImage(result.assets[0].uri);

      } else {
        const result = await photos.selectImage({
          quality: 1
        });
        result.canceled ? onCancel() : onChangeImage(result.assets[0].uri);
      }

    } catch (error) {
      Alert.alert('Image error', 'Error reading image');
      console.log(error);
    }
  };

  return (
    <TouchableWithoutFeedback onPress={handlePress}>
      <View style={styles.container}>
        {!imageUri ? (
          <Icon source={IconTypes['camera-image']} size={75} />
        ) : (
          <Image source={{ uri: imageUri }} style={styles.image} />
        )}
      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    borderRadius: 15,
    justifyContent: 'center',
    height: 100,
    width: 100,
    overflow: 'hidden'
  },
  image: {
    width: '100%',
    height: '100%',
  }
})

export default ImageInput;
