import { View, StyleSheet } from 'react-native';
import { styles } from "./styles";

import PackageIcon from '@/assets/icons/package.svg'
import { THEME } from '@/constants/theme';

export const OrderIcon: React.FC = () => {
  return (
    <View style={styles.container}>
      <View style={styles.icon}>
        <PackageIcon color={THEME.grey[600]} />
      </View>
    </View>
  );
};


