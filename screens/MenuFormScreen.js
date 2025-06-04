import React, { useState, useEffect } from 'react';
import {
  View, Text, TextInput, Button, StyleSheet, Alert,
  Platform, Image, TouchableOpacity, ScrollView
} from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { AntDesign } from '@expo/vector-icons';
import api from '../services/api';

export default function MenuFormScreen({ route, navigation }) {
  const { menu } = route.params || {};
  const isEdit = !!menu;

  const [name, setName] = useState(menu?.name || '');
  const [price, setPrice] = useState(menu?.price?.toString() || '');
  const [description, setDescription] = useState(menu?.description || '');
  const [category, setCategory] = useState(menu?.category || '');
  const [image, setImage] = useState(null);

  useEffect(() => {
    if (isEdit && menu?.url) {
      setImage({
        uri: menu.url,
        name: 'old-image.jpg',
        type: 'image/jpeg',
        isOld: true,
      });
    }
  }, []);

  const pickImage = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert('Izin ditolak', 'Aplikasi perlu izin untuk mengakses galeri');
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      quality: 0.5,
    });

    if (!result.canceled && result.assets.length > 0) {
      const asset = result.assets[0];
      const fileExtension = asset.uri.split('.').pop().toLowerCase();
      const mimeType = fileExtension === 'png' ? 'image/png' : 'image/jpeg';

      setImage({
        uri: asset.uri,
        name: asset.fileName || `upload.${fileExtension}`,
        type: mimeType,
        isOld: false,
      });
    }
  };

  const handleSubmit = async () => {
    if (!name || !price || !description || !category) {
      return Alert.alert('Error', 'Semua field harus diisi');
    }

    try {
      const formData = new FormData();
      formData.append('name', name);
      formData.append('price', parseInt(price));
      formData.append('description', description);
      formData.append('category', category);

      if (image && !image.isOld) {
        formData.append('image', {
          uri: Platform.OS === 'ios' ? image.uri.replace('file://', '') : image.uri,
          name: image.name,
          type: image.type,
        });
      }

      if (isEdit) {
        formData.append('_method', 'PUT');
        await api.post(`/menus/${menu.id}`, formData, {
          headers: { 'Content-Type': 'multipart/form-data' },
        });
        Alert.alert('Berhasil', 'Menu diperbarui');
      } else {
        await api.post('/menus', formData, {
          headers: { 'Content-Type': 'multipart/form-data' },
        });
        Alert.alert('Berhasil', 'Menu ditambahkan');
      }

      navigation.goBack();
    } catch (error) {
      console.log('Gagal simpan menu:', error.response?.data || error.message);
      Alert.alert('Error', 'Gagal menyimpan menu');
    }
  };

  const handleDelete = async () => {
    Alert.alert('Konfirmasi', 'Yakin ingin menghapus menu ini?', [
      { text: 'Batal', style: 'cancel' },
      {
        text: 'Hapus',
        style: 'destructive',
        onPress: async () => {
          try {
            await api.delete(`/menus/${menu.id}`);
            Alert.alert('Berhasil', 'Menu dihapus');
            navigation.goBack();
          } catch (error) {
            Alert.alert('Error', 'Gagal menghapus menu');
          }
        },
      },
    ]);
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.header}>{isEdit ? 'Edit Menu' : 'Form Menu'}</Text>

      <Text style={styles.label}>Gambar</Text>
      <TouchableOpacity style={styles.imagePicker} onPress={pickImage}>
        {image ? (
          <Image source={{ uri: image.uri }} style={styles.imagePreview} />
        ) : (
          <>
            <AntDesign name="camera" size={32} color="#999" />
            <Text style={styles.imageText}>Unggah foto yang menggugah selera supaya pelanggan tertarik</Text>
          </>
        )}
      </TouchableOpacity>

      <Text style={styles.label}>Nama Menu</Text>
      <TextInput
        style={styles.input}
        placeholder="cth: Nasi Goreng Mawut"
        value={name}
        onChangeText={setName}
      />

      <Text style={styles.label}>Harga</Text>
      <TextInput
        style={styles.input}
        placeholder="Rp 20.000"
        value={price}
        onChangeText={setPrice}
        keyboardType="numeric"
      />

      <Text style={styles.label}>Kategori</Text>
      <TextInput
        style={styles.input}
        placeholder="Kategori"
        value={category}
        onChangeText={setCategory}
      />

      <Text style={styles.label}>Deskripsi</Text>
      <TextInput
        style={[styles.input, { height: 80 }]}
        placeholder="Deskripsi"
        value={description}
        onChangeText={setDescription}
        multiline
      />

      <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
        <Text style={styles.submitText}>{isEdit ? 'Simpan' : 'Tambah'}</Text>
      </TouchableOpacity>

      {isEdit && (
        <TouchableOpacity style={styles.deleteButton} onPress={handleDelete}>
          <Text style={styles.deleteText}>Hapus Menu</Text>
        </TouchableOpacity>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#fff',
    flexGrow: 1,
  },
  header: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 16,
    textAlign: 'center',
    color: '#0a66c2',
  },
  label: {
    fontWeight: '600',
    marginBottom: 6,
    marginTop: 12,
    color: '#333',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    paddingHorizontal: 14,
    paddingVertical: 10,
    backgroundColor: '#f9f9f9',
  },
  imagePicker: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 20,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 12,
    backgroundColor: '#fafafa',
  },
  imageText: {
    textAlign: 'center',
    marginTop: 8,
    fontSize: 12,
    color: '#888',
  },
  imagePreview: {
    width: 100,
    height: 100,
    borderRadius: 10,
  },
  submitButton: {
    backgroundColor: '#1E90FF',
    padding: 14,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 20,
  },
  submitText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
  deleteButton: {
    marginTop: 16,
    alignItems: 'center',
  },
  deleteText: {
    color: 'red',
    fontWeight: 'bold',
  },
});
