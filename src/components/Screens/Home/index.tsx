import { OrdersList } from "@/components/Molecules/OrdersList";
import { SafeAreaView } from "react-native-safe-area-context";
import { styles } from "./styles";

export function Home() {
    return (
        <SafeAreaView style={styles.container}>
            <OrdersList />
        </SafeAreaView>
    )
}