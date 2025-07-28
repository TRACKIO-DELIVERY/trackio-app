import { SafeAreaView } from "react-native-safe-area-context";
import { styles } from "./styles";
import { Button } from "@/components/Atoms/Button";
import { router } from "expo-router";
import { Header } from "@/components/Atoms/Header";

export function Home() {

    return (
        <SafeAreaView style={styles.container}>
            <Header name="Fulano" />
            <Button onPress={() => router.push('/(tabs)/order/34')} />
        </SafeAreaView>
    )
}