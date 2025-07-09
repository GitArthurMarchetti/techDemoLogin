import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { EventItemType } from "../interfaces/eventType";

const EventItem = ({
    name,
    date,
    location
}: EventItemType ) => {
    return (
        <View style={styles.container}>
            <Text style={styles.name}>{name}</Text>
            <Text style={styles.details}>Data: {date}</Text>
            <Text style={styles.details}>Local: {location}</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#ffffff',
        padding: 15,
        marginVertical: 8,
        marginHorizontal: 16,
        borderRadius: 10,

        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 3.84,

        elevation: 5,
    },
    name: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 5,
        color: '#333',
    },
    details: {
        fontSize: 16,
        color: '#666',
    },
});

export default EventItem;