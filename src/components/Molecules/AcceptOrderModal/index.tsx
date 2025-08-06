import React from "react";
import { Modal, View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { styles } from "./styles";

interface AcceptOrderModalProps {
    visible: boolean;
    onConfirm?: () => void;
    onCancel?: () => void;
}

export function AcceptOrderModal({ visible, onConfirm, onCancel }: AcceptOrderModalProps) {
    return (
        <Modal
            visible={visible}
            transparent
            animationType="fade"
        >
            <View style={styles.overlay}>
                <View style={styles.modalContainer}>
                    <Text style={styles.title}>Aceitar pedido?</Text>
                    <Text style={styles.description}>
                        Você deseja escolher este pedido para inciar a entrega posteriormente?
                    </Text>

                    <View style={styles.buttonContainer}>
                        <TouchableOpacity style={[styles.button, styles.cancelButton]} onPress={onCancel}>
                            <Text style={[styles.buttonText, { color: "#333" }]}>Cancelar</Text>
                        </TouchableOpacity>

                        <TouchableOpacity style={[styles.button, styles.confirmButton]} onPress={onConfirm}>
                            <Text style={[styles.buttonText, { color: "#fff" }]}>Aceitar</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </Modal>
    );
}
