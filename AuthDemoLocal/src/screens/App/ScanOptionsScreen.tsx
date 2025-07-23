import React, { useEffect, useState } from 'react'; 
import { View, Text, StyleSheet, FlatList, ActivityIndicator } from 'react-native'; 
import CustomButton from '../../components/CustomButton';
import { colors } from '../../theme/colors';
import { typography } from '../../theme/typography';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RouteProp } from '@react-navigation/native';
import { AppStackParamList } from '../../interfaces/navigation';
import { TicketFromJSON } from '../../interfaces/tickets';
import { getTicketsByEvent } from '../../utils/ticketsService';


type ScanOptionsScreenNavigationProp = NativeStackNavigationProp<AppStackParamList, 'ScanOptions'>;
type ScanOptionsScreenRouteProp = RouteProp<AppStackParamList, 'ScanOptions'>;

interface ScanOptionsScreenProps {
    navigation: ScanOptionsScreenNavigationProp;
    route: ScanOptionsScreenRouteProp;
}

const ScanOptionsScreen: React.FC<ScanOptionsScreenProps> = ({ navigation, route }) => {
    const { eventName, eventLocation, eventId } = route.params;
    const [tickets, setTickets] = useState<TicketFromJSON[]>([]);
    const [loadingTickets, setLoadingTickets] = useState<boolean>(true);
    const [errorTickets, setErrorTickets] = useState<boolean>(false);


    useEffect(() => {
        const fetchTickets = async () => {
            setLoadingTickets(true);
            setErrorTickets(false);
            try {
                const fetchedTickets = await getTicketsByEvent(eventId);
                setTickets(fetchedTickets);
            } catch (error) {
                console.error("Error fetching tickets in ScanOptionsScreen:", error);
                setErrorTickets(true);
                setTickets([]);
            } finally {
                setLoadingTickets(false);
            }
        };

        fetchTickets();
    }, [eventId]); 


    const handleCheckIn = (selectedEventId: string) => { 
        navigation.navigate('Scanner', { eventId: selectedEventId });
    };

    const handleGoBack = () => {
        navigation.goBack();
    };

    return (
        <View style={styles.container}>
            <View style={styles.content}>
                <Text style={styles.eventName}>{eventName}</Text>
                <Text style={styles.eventLocation}>{eventLocation}</Text>

                <Text style={styles.sectionTitle}>Tickets for this Event:</Text>
                {loadingTickets ? (
                    <ActivityIndicator size="large" color={colors.primary} />
                ) : errorTickets ? (
                    <Text style={styles.errorText}>Failed to load tickets. Please try again.</Text>
                ) : tickets.length > 0 ? (
                    <FlatList
                        data={tickets}
                        keyExtractor={(item) => item.TicketId}
                        renderItem={({ item }) => (
                            <View style={styles.ticketItem}>
                                <Text style={styles.ticketText}>ID: {item.TicketId}</Text>
                                <Text style={styles.ticketText}>Name: {item.Name}</Text>
                            </View>
                        )}
                        contentContainerStyle={styles.ticketsListContent}
                    />
                ) : (
                    <Text style={styles.noTicketsText}>No tickets found for this event.</Text>
                )}

                <CustomButton
                    title="Scan Check-in"
                    onPress={() => handleCheckIn(eventId)}
                    type="primary"
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
    sectionTitle: {
        fontSize: typography.fontSizes.large,
        fontWeight: typography.fontWeights.bold,
        color: colors.textPrimary,
        marginTop: 20,
        marginBottom: 10,
        textAlign: 'center',
    },
    ticketsListContent: {
        paddingBottom: 10,
    },
    ticketItem: {
        backgroundColor: colors.bgPrimary,
        padding: 10,
        marginVertical: 5,
        borderRadius: 8,
        width: '90%',
        alignSelf: 'center',
        shadowColor: colors.shadow,
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.1,
        shadowRadius: 2,
        elevation: 2,
    },
    ticketText: {
        fontSize: typography.fontSizes.normal,
        color: colors.textPrimary,
    },
    noTicketsText: {
        fontSize: typography.fontSizes.medium,
        color: colors.textSecondary,
        textAlign: 'center',
        marginTop: 20,
    },
    errorText: {
        fontSize: typography.fontSizes.medium,
        color: colors.danger,
        textAlign: 'center',
        marginTop: 20,
    },
    button: {
        width: '80%',
        maxWidth: 250,
        marginTop: 20,
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
