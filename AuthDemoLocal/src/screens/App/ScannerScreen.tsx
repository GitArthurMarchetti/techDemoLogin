import React from 'react'; // REMOVIDO: useEffect, useState, PermissionsAndroid, Platform
import { StyleSheet, Text, View, ActivityIndicator } from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RouteProp } from '@react-navigation/native';
import { AppStackParamList } from '../../interfaces/navigation';
import { colors } from '../../theme/colors';
import { typography } from '../../theme/typography';
import { Camera, CameraType } from 'react-native-camera-kit';
import CustomButton from '../../components/CustomButton';
import { Animated } from 'react-native'; 

// Importar os hooks personalizados
import { useCameraPermissions } from '../../hooks/useCameraPermissions';
import { useBarcodeScanner } from '../../hooks/useBarcodeScanner'; 


type ScannerScreenNavigationProp = NativeStackNavigationProp<AppStackParamList, 'Scanner'>;
type ScannerScreenRouteProp = RouteProp<AppStackParamList, 'Scanner'>;

interface ScannerScreenProps {
    navigation: ScannerScreenNavigationProp;
    route: ScannerScreenRouteProp;
}

const ScannerScreen: React.FC<ScannerScreenProps> = ({ navigation, route }) => {
    const { eventId } = route.params;

    const { hasPermission, isLoading } = useCameraPermissions();
    const { handleBarcodeRead, popupState } = useBarcodeScanner(eventId);
    const { showPopup, popupMessage, popupColor, fadeAnim } = popupState;


    if (isLoading) {
        return (
            <View style={styles.permissionContainer}>
                <ActivityIndicator size="large" color={colors.primary} />
                <Text style={styles.permissionText}>Requesting camera permission...</Text>
            </View>
        );
    }

    if (hasPermission === false) {
        return (
            <View style={styles.permissionContainer}>
                <Text style={styles.permissionText}>No access to camera. Please enable camera permissions in settings.</Text>
            </View>
        );
    }

    if (hasPermission === null) {
        return (
            <View style={styles.permissionContainer}>
                <Text style={styles.permissionText}>Waiting for camera permission status...</Text>
            </View>
        );
    }

    return (
        <View style={styles.container}>
            <Camera
                style={StyleSheet.absoluteFillObject}
                cameraType={CameraType.Back}
                scanBarcode={true}
                showFrame={true}
                laserColor='red'
                frameColor='white'
                onReadCode={handleBarcodeRead} 
            />
            <View style={styles.overlay}>
                <Text style={styles.scanTypeText}>Scan Ticket</Text>
                <CustomButton
                    title="Back"
                    onPress={() => navigation.goBack()}
                    type="outlineDanger"
                    style={styles.backButton}
                    textStyle={styles.backButtonText}
                />
            </View>

            {showPopup && (
                <Animated.View style={[styles.popupOverlay, { opacity: fadeAnim }]}>
                    <View style={[styles.popupContent, { backgroundColor: popupColor }]}>
                        <Text style={styles.popupMessage}>{popupMessage}</Text>
                    </View>
                </Animated.View>
            )}
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
        marginTop: 20,
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
        width: '80%',
        maxWidth: 150,
        alignItems: 'center',
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
    popupOverlay: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0,0,0,0.5)',
    },
    popupContent: {
        padding: 20,
        borderRadius: 10,
        alignItems: 'center',
        maxWidth: '80%',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },
    popupMessage: {
        fontSize: typography.fontSizes.large,
        color: colors.bgPrimary,
        textAlign: 'center',
        fontWeight: typography.fontWeights.bold,
    },
});

export default ScannerScreen;
