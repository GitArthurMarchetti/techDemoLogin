import React, { useState, useEffect } from 'react'; 
import { View, Text, StyleSheet, TouchableOpacity, PermissionsAndroid, Alert } from 'react-native'; 
// import { RNCamera } from 'react-native-camera';

import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RouteProp } from '@react-navigation/native';
import { RootStackParamList } from '../../interfaces/navigation';
import { colors } from '../../theme/colors';
import { typography } from '../../theme/typography';

type ScannerScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'Scanner'>;
type ScannerScreenRouteProp = RouteProp<RootStackParamList, 'Scanner'>;

interface ScannerScreenProps {
    navigation: ScannerScreenNavigationProp;
    route: ScannerScreenRouteProp;
}

const ScannerScreen: React.FC<ScannerScreenProps> = ({ navigation, route }) => {
    const [flashOn, setFlashOn] = useState(false);
    const [showSuccessMessage, setShowSuccessMessage] = useState(false);
    const [hasPermission, setHasPermission] = useState(false); 
    const { scanType, eventId } = route.params;

    const requestCameraPermission = async () => {
        try {
            const granted = await PermissionsAndroid.request(
                PermissionsAndroid.PERMISSIONS.CAMERA,
                {
                    title: "Camera Permissions",
                    message: "This app needs access to your camera to scan.",
                    buttonNeutral: "Ask Later",
                    buttonNegative: "Cancel",
                    buttonPositive: "OK"
                }
            );
            if (granted === 'granted') {
                setHasPermission(true);
            } else {
                setHasPermission(false);
                Alert.alert("Permisson necessary", "Camera permission is essential to use the scanner.");
                navigation.goBack(); 
            }
        } catch (err) {
            console.warn(err);
            setHasPermission(false);
            Alert.alert("Permission Error", "An error occurred while requesting camera permission.");
            navigation.goBack();
        }
    };

    useEffect(() => {
        requestCameraPermission();
    }, []);

    const onBarCodeRead = (event: any) => {
        if (showSuccessMessage) {
            return;
        }

        console.log(`Scanned code for ${scanType} of event ${eventId}:`, event.data);
        setShowSuccessMessage(true);
        setTimeout(() => {
            setShowSuccessMessage(false);
        }, 2000);
    };

    const toggleFlash = () => {
        setFlashOn(prev => !prev);
    };

    const handleGoBack = () => {
        navigation.goBack();
    };

    if (!hasPermission) {
        return (
            <View style={styles.permissionContainer}>
                <Text style={styles.permissionText}>Waiting camera permission...</Text>
            </View>
        );
    }

    return (
        <View style={styles.container}>
         
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.bgDark,
    },
    permissionContainer: { 
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: colors.bgSecondary,
    },
    permissionText: { 
        fontSize: typography.fontSizes.medium,
        color: colors.textPrimary,
        textAlign: 'center',
    },
    camera: {
        flex: 1,
        justifyContent: 'flex-end',
        alignItems: 'center',
    },
    overlay: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: 50,
        paddingHorizontal: 20,
        backgroundColor: 'rgba(0,0,0,0.4)',
    },
    scanTypeText: {
        fontSize: typography.fontSizes.large,
        fontWeight: typography.fontWeights.bold,
        color: colors.bgPrimary,
        textAlign: 'center',
    },
    eventDetails: {
        fontSize: typography.fontSizes.normal,
        color: colors.bgPrimary,
        marginTop: 10,
        textAlign: 'center',
    },
    controlsContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        width: '100%',
        marginBottom: 20,
    },
    flashButton: {
        backgroundColor: colors.primary,
        padding: 10,
        borderRadius: 5,
    },
    flashButtonText: {
        color: colors.textPrimary,
        fontSize: typography.fontSizes.normal,
        fontWeight: typography.fontWeights.semiBold,
    },
    backButton: {
        backgroundColor: colors.danger,
        padding: 10,
        borderRadius: 5,
    },
    backButtonText: {
        color: colors.bgPrimary,
        fontSize: typography.fontSizes.normal,
        fontWeight: typography.fontWeights.semiBold,
    },
    successMessageOverlay: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(0, 128, 0, 0.8)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    successCheckmark: {
        fontSize: 120,
        color: colors.bgPrimary,
        fontWeight: typography.fontWeights.bold,
    },
    successText: {
        fontSize: typography.fontSizes.large,
        fontWeight: typography.fontWeights.semiBold,
        color: colors.bgPrimary,
        marginTop: 20,
    },
});

export default ScannerScreen;