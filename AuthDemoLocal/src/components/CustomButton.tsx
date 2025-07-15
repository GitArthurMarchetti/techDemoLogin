import React from 'react';
import {
  TouchableOpacity,
  Text,
  StyleSheet,
  ActivityIndicator,
  ViewStyle,
  TextStyle,
} from 'react-native';
import { colors } from '../theme/colors';
import { typography } from '../theme/typography';


interface CustomButtonProps {
  title: string;
  onPress: () => void;
  loading?: boolean;
  type?: 'primary' | 'danger' | 'outlinePrimary' | 'outlineDanger'; 
  style?: ViewStyle; 
  textStyle?: TextStyle; 
}

const CustomButton: React.FC<CustomButtonProps> = ({
  title,
  onPress,
  loading = false,
  type = 'primary', 
  style,
  textStyle,
}) => {
  const buttonStyles: ViewStyle[] = [styles.baseButton];
  const textStyles: TextStyle[] = [styles.baseText];

  switch (type) {
    case 'primary':
      buttonStyles.push(styles.primaryButton);
      textStyles.push(styles.primaryText);
      break;
    case 'danger':
      buttonStyles.push(styles.dangerButton);
      textStyles.push(styles.dangerText);
      break;
    case 'outlinePrimary':
        buttonStyles.push(styles.outlinePrimaryButton);
        textStyles.push(styles.outlinePrimaryText);
        break;
    case 'outlineDanger':
        buttonStyles.push(styles.outlineDangerButton);
        textStyles.push(styles.outlineDangerText);
        break;
    default:
      break;
  }

  if (style) {
    buttonStyles.push(style);
  }
  if (textStyle) {
    textStyles.push(textStyle);
  }

  return (
    <TouchableOpacity
      style={buttonStyles}
      onPress={onPress}
      disabled={loading}
      activeOpacity={0.7}
    >
      {loading ? (
        <ActivityIndicator size="small" color={type === 'primary' ? colors.bgPrimary : colors.primary} />
      ) : (
        <Text style={textStyles}>{title}</Text>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  baseButton: {
    width: '100%',
    maxWidth: 300,
    height: 50,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 15,
    shadowColor: colors.shadow,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  baseText: {
    fontSize: typography.fontSizes.button, 
    fontWeight: typography.fontWeights.semiBold, 
  },
  
  primaryButton: {
    backgroundColor: colors.primary,
    borderWidth: 1, 
    borderColor: colors.primary, 
  },
  primaryText: {
    color: colors.textPrimary, 
  },

  dangerButton: {
    backgroundColor: colors.danger,
    borderWidth: 1,
    borderColor: colors.danger,
  },
  dangerText: {
    color: colors.bgPrimary, 
  },

  outlinePrimaryButton: {
    backgroundColor: colors.bgPrimary, 
    borderWidth: 1,
    borderColor: colors.primary, 
  },
  outlinePrimaryText: {
    color: colors.primary, 
  },

  outlineDangerButton: {
    backgroundColor: colors.bgPrimary, 
    borderWidth: 1,
    borderColor: colors.danger, 
  },
  outlineDangerText: {
    color: colors.danger, 
  },
});

export default CustomButton;