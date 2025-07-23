import React from "react";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";

import { colors } from '../theme/colors';
import { typography } from "../theme/typography";
import { EventFromJSON } from "../interfaces/event";
import CustomButton from "./CustomButton";

interface EventItemProps extends EventFromJSON {
    onPress: () => void;
}

const EventItem = ({
    title,
    location_id,
    onPress
}: EventItemProps) => {


    return (
        <TouchableOpacity style={styles.container} onPress={onPress} activeOpacity={0.8}>

            <View style={styles.infoContainer}>
                <Text style={styles.name}>{title}</Text>
                <Text style={styles.details} >{location_id}</Text>
                <CustomButton
                    title="Scan"
                    onPress={onPress}
                    style={styles.scanButton}
                />
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
    scanButton: {
        maxWidth: 100,
        height: 35,
        marginTop: 20,
        borderRadius: 18,
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