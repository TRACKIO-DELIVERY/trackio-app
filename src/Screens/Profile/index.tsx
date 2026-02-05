import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { styles } from "./styles";
import { useAuth } from "@/contexts/Auth";
import { TYPOGRAPHY } from "@/constants/typography";

export function Profile() {
  const { user, logout } = useAuth();

  function handleLogout() {
    logout();
  }

  function Avatar() {
    return <View style={styles.avatarEmpty} />;
  }
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.profileCard}>
        {user?.image_url ? (
          <Image source={{ uri: user?.image_url }} style={styles.avatar} />
        ) : (
          <Avatar />
        )}

        <Text style={styles.name}>{user?.username || "Entregador 1"}</Text>
        <Text style={styles.email}>{user?.email || "email@gmail.com"}</Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Configurações</Text>

        <TouchableOpacity style={styles.option}>
          <Ionicons name="settings-outline" size={20} color="#333" />
          <Text style={styles.optionText}>Preferências</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.option}>
          <Ionicons name="help-circle-outline" size={20} color="#333" />
          <Text style={styles.optionText}>Ajuda</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.option, styles.logout]}
          onPress={handleLogout}
        >
          <Ionicons name="log-out-outline" size={20} color="#D32F2F" />
          <Text style={[styles.optionText, { color: "#D32F2F" }]}>Sair</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}
