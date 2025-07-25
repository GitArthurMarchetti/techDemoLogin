import { useState, useEffect, useRef } from 'react';
import { Animated } from 'react-native';

interface PopupState {
    showPopup: boolean;
    popupMessage: string;
    popupColor: string;
    fadeAnim: Animated.Value;
    triggerPopup: (message: string, color: string) => void;
}

export const useTimedPopup = (duration: number = 3000): PopupState => {
    const [showPopup, setShowPopup] = useState(false);
    const [popupMessage, setPopupMessage] = useState('');
    const [popupColor, setPopupColor] = useState('green');
    const fadeAnim = useRef(new Animated.Value(0)).current;

    const triggerPopup = (message: string, color: string) => {
        setPopupMessage(message);
        setPopupColor(color);
        setShowPopup(true);
    };

    useEffect(() => {
        if (showPopup) {
            fadeAnim.setValue(1);

            const timer = setTimeout(() => {
                Animated.timing(
                    fadeAnim,
                    {
                        toValue: 0, 
                        duration: 0, 
                        useNativeDriver: true,
                    }).start(() => setShowPopup(false));
            }, duration);

            return () => clearTimeout(timer);
        }
    }, [showPopup, duration, fadeAnim]);

    return { showPopup, popupMessage, popupColor, fadeAnim, triggerPopup };
};
