import { validateTicket } from "../utils/ticketsService";
import { useTimedPopup } from "./useTimedPopUp";

interface BarcodeScannerHook {
    handleBarcodeRead: (event: any) => Promise<void>;
    popupState: ReturnType<typeof useTimedPopup>; 
}

export const useBarcodeScanner = (eventId: string): BarcodeScannerHook => {
    const popupState = useTimedPopup(1000); 

    const handleBarcodeRead = async (event: any) => {
        const scannedCode = event.nativeEvent.codeStringValue;

        let message = '';
        let color = '';

        const isValid = await validateTicket(scannedCode, eventId);

        if (isValid) {
            message = `Ticket Valid`;
            color = 'green';
        } else {
            message = `Invalid Ticket: Please try again.`;
            color = 'red';
        }

        popupState.triggerPopup(message, color);
    };

    return { handleBarcodeRead, popupState };
};
