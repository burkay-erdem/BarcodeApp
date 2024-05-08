import { useEffect } from "react";
import { Camera } from 'expo-camera';
import * as ImagePicker from "expo-image-picker";
import { Alert } from "react-native";

export const useCamera = () => {
    const requestPermission = async () => {
        const { granted } = await Camera.requestCameraPermissionsAsync();

        if (!granted) {
            Alert.alert(
                'Device settings alert',
                'You need to allow camera permissions for this to work'
            );
        }
    }

    const takePhoto = async (options: ImagePicker.ImagePickerOptions) => {
        options = { mediaTypes: ImagePicker.MediaTypeOptions.Images, ...options };

        return await ImagePicker.launchCameraAsync(options);
    }

    useEffect(() => {
        requestPermission();
    }, []);

    return { takePhoto };
};