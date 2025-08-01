import { SafeAreaView } from "react-native-safe-area-context";
import { styles } from "./styles";
import { Header } from "@/components/Atoms/Header";
import { OrdersList } from "@/components/Molecules/OrdersList";
import { Text, View } from "react-native";
import { TYPOGRAPHY } from "@/constants/typography";

import { useAuth } from "@/hooks/useAuth";
import { Loading } from "@/components/Atoms/Loading";

export function Home() {
    const { user, isLoading } = useAuth()

    if (isLoading) {
        return <Loading />
    }
    return (
        <SafeAreaView style={styles.container}>
            <Header name={user?.name || 'Entregador(a)'} />
            <View style={styles.orders}>

                <View style={styles.heading}>
                    <Text style={[TYPOGRAPHY.title]}>
                        Pedidos
                    </Text>
                    <Text style={TYPOGRAPHY.subtitle}>
                        Selecione um pedido para aceitar iniciar
                        sua rota!
                    </Text>
                </View>
                <OrdersList />


            </View>
        </SafeAreaView>
    )
}