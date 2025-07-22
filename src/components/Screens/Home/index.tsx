import { OrdersList } from "@/components/Molecules/OrdersList";
import { SafeAreaView } from "react-native-safe-area-context";

export function Home () {
    return (
        <SafeAreaView>
            <OrdersList />
        </SafeAreaView>
    )
}