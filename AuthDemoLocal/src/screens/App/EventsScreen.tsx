import React from "react";
import { Button, FlatList, StyleSheet, Text, View } from "react-native";
import eventsData from '../../data/events.json';
import EventItem from "../../components/EventItem";
import { useAuth } from "../../context/AuthContext";

const EventsScreen = () => {

    const { logout, currentUser } = useAuth();

    const handleLogout = () => {
        logout();
    }


    return (
        <View style={styles.container}>


            <View style={styles.header}>

                <Text style={styles.title}>Avaiable Events</Text>

                {currentUser && (
                    <Text style={styles.loggedInAs}>Logged in as: {currentUser.email}</Text>
                )}
                <Button title="Sair" onPress={handleLogout} color="#dc3545" />

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
        backgroundColor: '#e9ecef', 
    },
    header: {
        padding: 20, 
        paddingTop: 50, 
        backgroundColor: '#007bff', 
        alignItems: 'center', 
        borderBottomLeftRadius: 20, 
        borderBottomRightRadius: 20,
        marginBottom: 10, 
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5, 
    },
    title: {
        fontSize: 26,
        fontWeight: 'bold',
        color: '#ffffff', 
        marginBottom: 10,
    },
    loggedInAs: {
        fontSize: 14,
        color: '#ffffff',
        marginBottom: 15,
    },
    listContent: {
        paddingBottom: 20, 
    },
});

export default EventsScreen;
