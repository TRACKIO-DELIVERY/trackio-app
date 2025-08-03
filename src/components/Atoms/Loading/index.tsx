import { THEME } from "@/constants/theme";
import { Image, View } from "react-native";

export function Loading() {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: THEME.purple[700],
        zIndex: 999
      }}>
      <Image
        source={require('@/assets/logo/logo-white.png')}
        style={{ width: 180, height: 180 }} />
    </View>
  );
}