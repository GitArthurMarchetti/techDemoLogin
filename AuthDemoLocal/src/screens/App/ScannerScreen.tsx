import React, { useState, useEffect } from 'react'; // Adicionado useEffect
import { View, Text, StyleSheet, TouchableOpacity, PermissionsAndroid, Alert } from 'react-native'; // Adicionado PermissionsAndroid e Alert
import { RNCamera } from 'react-native-camera';

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
    const [hasPermission, setHasPermission] = useState(false); // Novo estado para controle de permissão
    const { scanType, eventId } = route.params;

    // Função para solicitar permissões da câmera em tempo de execução
    const requestCameraPermission = async () => {
        try {
            const granted = await PermissionsAndroid.request(
                PermissionsAndroid.PERMISSIONS.CAMERA,
                {
                    title: "Permissão da Câmera",
                    message: "Este aplicativo precisa de acesso à sua câmera para escanear.",
                    buttonNeutral: "Perguntar Depois",
                    buttonNegative: "Cancelar",
                    buttonPositive: "OK"
                }
            );
            if (granted === 'granted') {
                console.log("Permissão da câmera concedida");
                setHasPermission(true);
            } else {
                console.log("Permissão da câmera negada");
                setHasPermission(false);
                Alert.alert("Permissão Necessária", "A permissão da câmera é essencial para usar o scanner.");
                navigation.goBack(); // Volta se a permissão for negada
            }
        } catch (err) {
            console.warn(err);
            setHasPermission(false);
            Alert.alert("Erro de Permissão", "Ocorreu um erro ao solicitar a permissão da câmera.");
            navigation.goBack();
        }
    };

    useEffect(() => {
        // Solicita a permissão quando o componente é montado
        requestCameraPermission();
    }, []);

    const onBarCodeRead = (event: any) => {
        if (showSuccessMessage) {
            return;
        }

        console.log(`Código escaneado para ${scanType} do evento ${eventId}:`, event.data);

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
        // Renderiza uma tela de carregamento ou mensagem enquanto espera pela permissão
        return (
            <View style={styles.permissionContainer}>
                <Text style={styles.permissionText}>Aguardando permissão da câmera...</Text>
            </View>
        );
    }

    return (
        <View style={styles.container}>
            <RNCamera
                style={styles.camera}
                type={RNCamera.Constants.Type.back}
                flashMode={flashOn ? RNCamera.Constants.FlashMode.torch : RNCamera.Constants.FlashMode.off}
                onBarCodeRead={onBarCodeRead}
                captureAudio={false}
            >
                <View style={styles.overlay}>
                    <Text style={styles.scanTypeText}>
                        Scan para {scanType === 'check-in' ? 'CHECK-IN' : 'CHECK-OUT'}
                    </Text>
                    <Text style={styles.eventDetails}>Evento ID: {eventId}</Text>

                    <View style={styles.controlsContainer}>
                        <TouchableOpacity style={styles.flashButton} onPress={toggleFlash}>
                            <Text style={styles.flashButtonText}>{flashOn ? 'Flash OFF' : 'Flash ON'}</Text>
                        </TouchableOpacity>

                        <TouchableOpacity style={styles.backButton} onPress={handleGoBack}>
                            <Text style={styles.backButtonText}>Voltar</Text>
                        </TouchableOpacity>
                    </View>
                </View>

                {showSuccessMessage && (
                    <View style={styles.successMessageOverlay}>
                        <Text style={styles.successCheckmark}>✓</Text>
                        <Text style={styles.successText}>Scan com Sucesso!</Text>
                    </View>
                )}
            </RNCamera>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.bgDark,
    },
    permissionContainer: { // Novo estilo para tela de permissão
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: colors.bgSecondary,
    },
    permissionText: { // Estilo para o texto de permissão
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