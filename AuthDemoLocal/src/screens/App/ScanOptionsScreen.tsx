import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import CustomButton from '../../components/CustomButton';
import { colors } from '../../theme/colors';
import { typography } from '../../theme/typography';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RouteProp } from '@react-navigation/native'; 
import { RootStackParamList } from '../../interfaces/navigation';


type ScanOptionsScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'ScanOptions'>;
type ScanOptionsScreenRouteProp = RouteProp<RootStackParamList, 'ScanOptions'>; 

interface ScanOptionsScreenProps {
    navigation: ScanOptionsScreenNavigationProp;
    route: ScanOptionsScreenRouteProp; 
}

const ScanOptionsScreen: React.FC<ScanOptionsScreenProps> = ({ navigation, route }) => {
    const { eventName, eventLocation } = route.params;

    const handleCheckIn = () => {
        console.log('Check-in');
    };

    const handleCheckOut = () => {
        console.log('Check-out');
    };

    const handleGoBack = () => {
        navigation.goBack();
    };

    return (
        <View style={styles.container}>
            <View style={styles.content}>
                <Text style={styles.eventName}>{eventName}</Text>
                <Text style={styles.eventLocation}>{eventLocation}</Text> 

                <CustomButton
                    title="Scan Check-in"
                    onPress={handleCheckIn}
                    type="primary"
                    style={styles.button}
                />
                <CustomButton
                    title="Scan Check-out"
                    onPress={handleCheckOut}
                    type="outlinePrimary"
                    style={styles.button}
                />
            </View>

            <View style={styles.bottomButtonContainer}>
                <CustomButton
                    title="Back"
                    onPress={handleGoBack}
                    type="outlineDanger"
                    style={styles.fullWidthButton}
                />
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.bgSecondary, 
        padding: 20,
        justifyContent: 'space-between',
    },
    content: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingBottom: 20, 
    },
    eventName: { 
        fontSize: typography.fontSizes.extraLarge, 
        fontWeight: typography.fontWeights.bold,
        color: colors.textPrimary,
        marginBottom: 10,
        textAlign: 'center',
    },
    eventLocation: { 
        fontSize: typography.fontSizes.medium,
        color: colors.textSecondary,
        marginBottom: 30, 
        textAlign: 'center',
    },
    button: {
        width: '80%',
        maxWidth: 250,
        marginBottom: 15,
    },
    bottomButtonContainer: {
        width: '100%',
        alignItems: 'center',
        paddingHorizontal: 20,
        marginBottom: 20,
    },
    fullWidthButton: {
        width: '100%',
        maxWidth: '100%',
        marginBottom: 0,
    },
});

export default ScanOptionsScreen;