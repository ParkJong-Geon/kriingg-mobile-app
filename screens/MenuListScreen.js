import React, { useEffect, useState, useCallback } from 'react';
import {
    View, Text, FlatList, Image, StyleSheet,
    RefreshControl, TouchableOpacity, SafeAreaView, Alert
} from 'react-native';
import api from '../services/api';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import { Ionicons, MaterialIcons } from '@expo/vector-icons';

export default function MenuListScreen() {
    const [menus, setMenus] = useState([]);
    const [loading, setLoading] = useState(false);
    const navigation = useNavigation();

    const fetchMenus = async () => {
        try {
            setLoading(true);
            const response = await api.get('/menus');
            setMenus(response.data.data);
        } catch (error) {
            console.error('Gagal mengambil data menu:', error.response?.data || error.message);
        } finally {
            setLoading(false);
        }
    };

    useFocusEffect(useCallback(() => {
        fetchMenus();
    }, []));

    const handleDelete = async (menuId) => {
        Alert.alert(
            'Konfirmasi',
            'Yakin ingin menghapus menu ini?',
            [
                { text: 'Tidak', style: 'cancel' },
                {
                    text: 'Ya',
                    style: 'destructive',
                    onPress: async () => {
                        try {
                            await api.delete(`/menus/${menuId}`);
                            fetchMenus(); // refresh list
                        } catch (error) {
                            Alert.alert('Error', 'Gagal menghapus menu');
                        }
                    },
                },
            ]
        );
    };

    const renderItem = ({ item }) => (
        <View style={styles.card}>
            <TouchableOpacity style={{ flexDirection: 'row', flex: 1 }} onPress={() => navigation.navigate('MenuDetail', { menu: item })}>
                <Image
                    source={{ uri: item.url || 'https://via.placeholder.com/64' }}
                    style={styles.image}
                />
                <View style={{ flex: 1 }}>
                    <Text style={styles.title}>{item.name}</Text>
                    <Text style={styles.price}>Rp {item.price}</Text>
                </View>
            </TouchableOpacity>
            <View style={styles.actionIcons}>
                <TouchableOpacity onPress={() => navigation.navigate('MenuForm', { menu: item })}>
                    <Ionicons name="pencil" size={20} color="#555" />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => handleDelete(item.id)} style={{ marginLeft: 12 }}>
                    <Ionicons name="trash" size={20} color="red" />
                </TouchableOpacity>
            </View>
        </View>
    );

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.headerTitle}>Daftar Menu</Text>
            </View>

            <FlatList
                data={menus}
                keyExtractor={(item) => item.id.toString()}
                renderItem={renderItem}
                refreshControl={<RefreshControl refreshing={loading} onRefresh={fetchMenus} />}
                contentContainerStyle={styles.list}
            />

            <View style={styles.addButtonContainer}>
                <TouchableOpacity style={styles.addButton} onPress={() => navigation.navigate('MenuForm')}>
                    <Text style={styles.addButtonText}>Tambah</Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#fff' },
    header: {
        backgroundColor: '#1E90FF',
        paddingVertical: 14,
        paddingHorizontal: 16,
    },
    headerTitle: {
        color: 'white',
        fontWeight: 'bold',
        fontSize: 18,
    },
    list: {
        padding: 16,
        paddingBottom: 100,
    },
    card: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#f8f8f8',
        padding: 10,
        borderRadius: 8,
        marginBottom: 12,
        elevation: 2,
    },
    image: {
        width: 60,
        height: 60,
        borderRadius: 6,
        marginRight: 10,
    },
    title: {
        fontWeight: 'bold',
        fontSize: 16,
    },
    price: {
        fontSize: 14,
        color: '#555',
        marginTop: 2,
    },
    actionIcons: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingLeft: 10,
    },
    addButtonContainer: {
        position: 'absolute',
        bottom: 20,
        left: 16,
        right: 16,
    },
    addButton: {
        backgroundColor: '#1E90FF',
        paddingVertical: 14,
        borderRadius: 20,
        alignItems: 'center',
    },
    addButtonText: {
        color: 'white',
        fontWeight: 'bold',
        fontSize: 16,
    },
});
