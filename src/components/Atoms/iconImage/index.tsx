import { View, StyleSheet } from 'react-native';
import { styles } from "./styles";

import PackageIcon from '@/assets/icons/package.svg'

export const OrderIcon: React.FC = () => {
  return (
    <View style={styles.container}>
      <View style={styles.icon}>
        <PackageIcon />
      </View>
    </View>
  );
};


