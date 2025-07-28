import { View, Text, FlatList, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Header } from "@/components/Atoms/Header";
import { styles } from "./styles";

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

            <Text style={styles.title}>Pedidos entregues</Text>

            <FlatList
                data={MOCK_ORDERS}
                keyExtractor={(item) => item.id}
                contentContainerStyle={styles.list}
                renderItem={({ item }) => (
                    <View style={styles.card}>
                        <Text style={styles.client}>{item.clientName}</Text>
                        <Text style={styles.company}>{item.company}</Text>
                        <Text style={styles.address}>{item.address}</Text>
                        <Text style={styles.date}>Entregue em: {item.deliveredAt}</Text>
                    </View>
                )}
            />
        </SafeAreaView>
    );
}