import { useEffect, useState } from 'react';
import { PermissionsAndroid, Platform } from 'react-native';

interface CameraPermissionState {
  hasPermission: boolean | null;
  isLoading: boolean;
}

export const useCameraPermissions = (): CameraPermissionState => {
  const [hasPermission, setHasPermission] = useState<boolean | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    const requestCameraPermission = async () => {
      if (Platform.OS === 'android') {
        try {
          const granted = await PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.CAMERA,
            {
              title: "Camera Permission",
              message: "App needs camera access for scanning barcodes.",
              buttonNeutral: "Ask Me Later",
              buttonNegative: "Cancel",
              buttonPositive: "OK"
            }
          );
          if (granted === PermissionsAndroid.RESULTS.GRANTED) {
            console.log("Camera permission granted");
            setHasPermission(true);
          } else {
            console.log("Camera permission denied");
            setHasPermission(false);
          }
        } catch (err) {
          console.warn(err);
          setHasPermission(false);
        } finally {
          setIsLoading(false);
        }
      } else {
        setHasPermission(true);
        setIsLoading(false);
      }
    };

    requestCameraPermission();
  }, []); 

  return { hasPermission, isLoading };
};
