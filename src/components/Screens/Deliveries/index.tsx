import { View, Text, FlatList, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Header } from "@/components/Atoms/Header";
import { styles } from "./styles";
import { OrderCard } from "@/components/Molecules/OrderCard";
import { TYPOGRAPHY } from "@/constants/typography";
import { useAuth } from "@/hooks/useAuth";

interface DeliveredOrder {
    id: string;
    clientName: string;
    company: string;
    deliveredAt: string;
    address: string;
}

const MOCK_ORDERS: DeliveredOrder[] = [
    {
        id: "1",
        clientName: "João Silva",
        company: "Farmácia Saúde",
        deliveredAt: "2025-07-22 14:30",
        address: "Rua das Flores, 123",
    },
];

export function Deliveries() {

    const { user } = useAuth()
    return (
        <SafeAreaView style={styles.container}>
            <Header name={user?.name || 'Entregador(a)'} />
            <View style={styles.orders}>
                <View style={styles.heading}>

                    <Text style={[TYPOGRAPHY.title]}>
                        Pedidos Entregues
                    </Text>
                    <Text style={TYPOGRAPHY.subtitle}>
                        Veja todos os pedidos que você entregou!
                    </Text>
                </View>
                <FlatList
                    data={MOCK_ORDERS}
                    keyExtractor={(item) => item.id}
                    contentContainerStyle={{
                        gap: 12,
                    }}
                    renderItem={({ item }) => (
                        <OrderCard
                            status={3}
                            title={`Pedido #${item.id}`}
                            company={'Empresa'} />
                    )}
                />

            </View>
        </SafeAreaView>
    );
}