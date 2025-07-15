import React from "react";
import { Image, StyleSheet, Text, View, TouchableOpacity } from "react-native"; 
import { EventItemType } from "../interfaces/eventType"; 

import { colors } from '../theme/colors';
import { typography } from "../theme/typography"; 


const eventImages: { [key: string]: any } = {
    'SummerFest.png': require('../assets/images/SummerFest.png'),
    'FoodTruck.png': require('../assets/images/FoodTruck.png'),
    'Carnaval.jpg': require('../assets/images/Carnaval.jpg'),
    'default_fallback_image': require('../assets/images/Carnaval.jpg'), 
};

interface EventItemProps extends EventItemType {
    onPress: () => void;
}

const EventItem = ({
    name,
    date,
    location,
    image,
    onPress 
}: EventItemProps) => {

    const eventImageSource = (image && eventImages[image])
        ? eventImages[image]
        : eventImages['default_fallback_image'];

    return (
        <TouchableOpacity style={styles.container} onPress={onPress} activeOpacity={0.8}> 
            <Image
                source={eventImageSource}
                style={styles.eventImage}
            />

            <View style={styles.infoContainer}>
                <Text style={styles.name}>{name}</Text>
                <Text style={styles.details}>Date: {date}</Text>
                <Text style={styles.details}>Local: {location}</Text>
            </View>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: colors.bgPrimary, 
        padding: 15,
        marginVertical: 8,
        marginHorizontal: 16,
        borderRadius: 10,
        shadowColor: colors.shadow,
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 3.84,
        elevation: 5,
        overflow: 'hidden',
    },
    eventImage: {
        width: '100%',
        height: 150,
        borderRadius: 8,
        marginBottom: 10,
        resizeMode: 'cover',
    },
    infoContainer: {

    },
    name: {
        fontSize: typography.fontSizes.medium,
        fontWeight: typography.fontWeights.bold,
        marginBottom: 5,
        color: colors.textPrimary,
    },
    details: {
        fontSize: typography.fontSizes.normal,
        color: colors.textSecondary,
    },
});

export default EventItem;