import React from "react";
import { ActivityIndicator, FlatList, StyleSheet, Text, View } from "react-native";
import { useAuthenticator } from "@aws-amplify/ui-react-native";
import CustomButton from "../../components/CustomButton";

import { colors } from '../../theme/colors';
import { typography } from '../../theme/typography';
import { AppStackParamList } from "../../interfaces/navigation";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";

import EventItem from "../../components/EventItem";
import { useUserEvents } from "../../hooks/useUserEvents";


type EventsScreenNavigationProp = NativeStackNavigationProp<AppStackParamList, 'Events'>;

interface EventsScreenProps {
    navigation: EventsScreenNavigationProp;
}

const EventsScreen: React.FC<EventsScreenProps> = ({ navigation }) => {
    const { signOut, user } = useAuthenticator();

    const { userEvents, isLoadingEvents, errorLoadingEvents } = useUserEvents();


    const handleLogout = () => {
        signOut();
    }

    const handleEventPress = (eventId: string, eventName: string, eventLocation: string) => {
        navigation.navigate('ScanOptions', { eventId, eventName, eventLocation });
    };

    if (isLoadingEvents) {
        return (
            <View style={styles.loadingContainer}>
                <ActivityIndicator size="large" color={colors.primary} />
                <Text style={styles.loadingText}>Loading events...</Text>
            </View>
        );
    }

    if (errorLoadingEvents) {
        return (
            <View style={styles.errorContainer}>
                <Text style={styles.errorText}>Failed to load events. Please try again later.</Text>
            </View>
        );
    }

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.title}>Available Events</Text>
                {user && (
                    <Text style={styles.loggedInAs}>Logged in as: {user.username}</Text>
                )}
                <CustomButton
                    title="Log out"
                    onPress={handleLogout}
                    type="danger"
                    style={styles.logoutButton}
                    textStyle={styles.logoutButtonText}
                />
            </View>

            {userEvents.length > 0 ? (
                <FlatList
                    data={userEvents}
                    keyExtractor={(item) => item.event_id}
                    renderItem={({ item }) => (
                        <EventItem
                            event_id={item.event_id}
                            title={item.title}
                            location_id={item.location_id}
                            onPress={() => handleEventPress(item.event_id, item.title, item.location_id)}
                        />
                    )}
                    contentContainerStyle={styles.listContent}
                />
            ) : (
                <View style={styles.noEventsContainer}>
                    <Text style={styles.noEventsText}>No events found for this user.</Text>
                </View>
            )}
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.bgSecondary,
    },
    header: {
        padding: 20,
        paddingTop: 50,
        backgroundColor: colors.bgDark,
        alignItems: 'center',
        borderBottomLeftRadius: 20,
        borderBottomRightRadius: 20,
        marginBottom: 10,
        shadowColor: colors.shadow,
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },
    title: {
        fontSize: typography.fontSizes.large,
        fontWeight: typography.fontWeights.bold,
        color: colors.bgPrimary,
        marginBottom: 10,
    },
    loggedInAs: {
        fontSize: typography.fontSizes.small,
        color: colors.bgPrimary,
        marginBottom: 15,
    },
    logoutButton: {
        maxWidth: 100,
        height: 35,
        borderRadius: 18,
    },
    logoutButtonText: {
        fontSize: typography.fontSizes.small,
    },
    listContent: {
        paddingBottom: 20,
    },
    noEventsContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    noEventsText: {
        fontSize: typography.fontSizes.medium,
        color: colors.textSecondary,
    },
    loadingText: { 
        fontSize: typography.fontSizes.medium,
        color: colors.textPrimary,
        marginTop: 10,
    },
    errorContainer: { 
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: colors.bgSecondary,
    },
    errorText: { 
        fontSize: typography.fontSizes.medium,
        color: colors.danger,
        textAlign: 'center',
    },
    loadingContainer: { 
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: colors.bgSecondary,
    },
});

export default EventsScreen;
