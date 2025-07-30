import { View, Text, FlatList, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Header } from "@/components/Atoms/Header";
import { styles } from "./styles";
import { OrderCard } from "@/components/Molecules/OrderCard";
import { TYPOGRAPHY } from "@/constants/typography";

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
    {
        id: "2",
        clientName: "Maria Oliveira",
        company: "Pet Shop Vida",
        deliveredAt: "2025-07-21 11:15",
        address: "Av. Brasil, 456",
    },
    {
        id: "3",
        clientName: "Lucas Pereira",
        company: "Mercado Bom Preço",
        deliveredAt: "2025-07-20 09:45",
        address: "Rua da Paz, 789",
    },
];

export function Deliveries() {
    return (
        <SafeAreaView style={styles.container}>
            <Header name="Karen" />
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
                            status={"finalizado"}
                            title={`Pedido ${item.id}`}
                            deliverer={'Sem entregador'}
                            company={'Empresa'} />
                    )}
                />

            </View>
        </SafeAreaView>
    );
}