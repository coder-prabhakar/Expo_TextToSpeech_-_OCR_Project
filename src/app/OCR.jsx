import React from 'react';
import { useOCR } from '../hooks/useOCR';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, Image, ActivityIndicator, TextInput } from 'react-native';


export default function OCR() {
    const {
        imageUri,
        isLoading,
        takePhoto,
        pickFromGallery,
        extractedText,
        editExtractedText,
        clearOCR,
        isError,
        error,
        clearError,
    } = useOCR();

    return (
        <ScrollView contentContainerStyle={styles.container}>
            {imageUri && <Image source={{ uri: imageUri }} style={styles.image} />}

            {isLoading && <ActivityIndicator size="large" color="#4f46e5" style={{ marginVertical: 15 }} />}

            {isError ? <Text style={styles.errorText}>⚠️ Error: {error}</Text> : null}

            <View style={styles.textBox}>
                <TextInput
                    style={styles.transcriptText}
                    value={extractedText}
                    onChangeText={editExtractedText}
                    placeholder="Yahan image se nikala hua text dikhega..."
                    multiline
                />
            </View>

            <View style={styles.buttonRow}>
                <TouchableOpacity style={[styles.button, { backgroundColor: '#4f46e5' }]} onPress={takePhoto}>
                    <Text style={styles.buttonText}>Camera</Text>
                </TouchableOpacity>
                <TouchableOpacity style={[styles.button, { backgroundColor: '#0ea5e9' }]} onPress={pickFromGallery}>
                    <Text style={styles.buttonText}>Gallery</Text>
                </TouchableOpacity>
                <TouchableOpacity style={[styles.button, { backgroundColor: '#6b7280' }]} onPress={clearOCR}>
                    <Text style={styles.buttonText}>Delete</Text>
                </TouchableOpacity>
            </View>
        </ScrollView>
    );
}


const styles = StyleSheet.create({
    container: { padding: 20, backgroundColor: '#fff', flexGrow: 1 },
    image: { width: '100%', height: 200, borderRadius: 10, marginBottom: 15, resizeMode: 'contain', backgroundColor: '#f3f4f6' },
    textBox: { borderWidth: 1, borderColor: '#ccc', borderRadius: 10, padding: 15, minHeight: 100, marginBottom: 20 },
    transcriptText: { fontSize: 16, color: '#111' },
    buttonRow: { flexDirection: 'row', justifyContent: 'space-around' },
    button: { paddingVertical: 12, paddingHorizontal: 16, borderRadius: 8 },
    buttonText: { color: '#fff', fontWeight: 'bold' },
    errorText: { color: '#ef4444', textAlign: 'center', marginBottom: 10, fontWeight: '600' },
});