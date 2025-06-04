// screens/MenuDetailScreen.js

import React from 'react';
import { View, Text, StyleSheet, Image, ScrollView } from 'react-native';

export default function MenuDetailScreen({ route }) {
    const { menu } = route.params;

    return (
        <ScrollView contentContainerStyle={styles.container}>
            <View style={styles.card}>
                <Image
                    source={{ uri: menu.url || 'https://via.placeholder.com/150' }}
                    style={styles.image}
                />

                <Text style={styles.title}>{menu.name}</Text>
                <Text style={styles.price}>Rp {menu.price}</Text>

                <View style={styles.detailGroup}>
                    <Text style={styles.label}>Kategori</Text>
                    <Text style={styles.text}>{menu.category}</Text>
                </View>

                <View style={styles.detailGroup}>
                    <Text style={styles.label}>Deskripsi</Text>
                    <Text style={styles.text}>{menu.description}</Text>
                </View>
            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        padding: 16,
        backgroundColor: '#fff',
    },
    card: {
        backgroundColor: '#f8f8f8',
        borderRadius: 12,
        padding: 16,
        alignItems: 'center',
        elevation: 2,
    },
    image: {
        width: 160,
        height: 160,
        borderRadius: 8,
        marginBottom: 16,
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 6,
        textAlign: 'center',
    },
    price: {
        fontSize: 16,
        color: '#555',
        marginBottom: 12,
    },
    detailGroup: {
        width: '100%',
        marginTop: 12,
    },
    label: {
        fontWeight: 'bold',
        fontSize: 14,
        color: '#333',
        marginBottom: 4,
    },
    text: {
        fontSize: 15,
        color: '#444',
        backgroundColor: '#fff',
        padding: 8,
        borderRadius: 6,
    },
});
