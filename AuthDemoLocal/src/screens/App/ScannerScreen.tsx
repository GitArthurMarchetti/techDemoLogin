import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RouteProp } from '@react-navigation/native';
import { RootStackParamList } from '../../interfaces/navigation';
import { colors } from '../../theme/colors';
import { typography } from '../../theme/typography';
import { StyleSheet, View } from 'react-native';
// import { Camera } from 'react-native-camera-kit';

type ScannerScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'Scanner'>;
type ScannerScreenRouteProp = RouteProp<RootStackParamList, 'Scanner'>;

interface ScannerScreenProps {
    navigation: ScannerScreenNavigationProp;
    route: ScannerScreenRouteProp;
}

const ScannerScreen: React.FC<ScannerScreenProps> = ({ navigation, route }) => {

    return (
        <View style={styles.container}>

            {/* <Camera
            scanBarcode={true}
            showFrame={true} 
            laserColor='red' 
            frameColor='white' 
/> */}

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