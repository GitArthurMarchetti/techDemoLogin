import React from "react";
import { FlatList, StyleSheet, Text, View } from "react-native";
import eventsData from '../../data/events.json';
import EventItem from "../../components/EventItem";
import { useAuth } from "../../context/AuthContext";
import CustomButton from "../../components/CustomButton"; 

import { colors } from '../../theme/colors';
import { typography } from "../../theme/typograpy";


const EventsScreen = () => {

    const { logout, currentUser } = useAuth();

    const handleLogout = () => {
        logout();
    }


    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.title}>Available Events</Text>
                {currentUser && (
                    <Text style={styles.loggedInAs}>Logged in as: {currentUser.email}</Text>
                )}
                <CustomButton
                    title="Log out"
                    onPress={handleLogout}
                    type="danger" 
                    style={styles.logoutButton}
                    textStyle={styles.logoutButtonText}
                />
            </View>

            <FlatList
                data={eventsData}
                keyExtractor={(item, index) => index.toString()}
                renderItem={({ item }) => (
                    <EventItem
                        name={item.name}
                        date={item.date}
                        location={item.location}
                    />
                )}
                contentContainerStyle={styles.listContent}
            />
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
        backgroundColor: colors.primary,
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
        color: colors.textPrimary,
        marginBottom: 10,
    },
    loggedInAs: {
        fontSize: typography.fontSizes.small,
        color: colors.textPrimary,
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
});

export default EventsScreen;