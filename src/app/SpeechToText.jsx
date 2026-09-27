import { useSpeechToText } from '../hooks/useSpeechToText';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, TextInput } from 'react-native';


export default function SpeechToText() {
    const { 
        isListening, 
        transcript, 
        startTranscript, 
        stopTranscript, 
        clearTranscript, 
        editTranscript, 
        isError, 
        error, 
        clearError 
    } = useSpeechToText({ speechLang: 'en-IN' });

    return (
        <View style={styles.container}>
            <View style={styles.textBox}>
                {isError ? (<Text style={styles.errorText}>⚠️ Error: {error}</Text>) : null}

                <TextInput
                    style={styles.transcriptText}
                    value={isListening ? `${transcript} ...` : transcript}
                    onChangeText={editTranscript}
                    onFocus={() => {
                        if (isListening) stopTranscript();
                    }}
                    multiline
                />
            </View>

            <View style={styles.buttonRow}>
                <TouchableOpacity 
                    style={[styles.button, { backgroundColor: '#22c55e' }, isListening && styles.btnDisabled]} 
                    onPress={startTranscript}
                    disabled={isListening}
                >
                    <Text style={styles.buttonText}>Start</Text>
                </TouchableOpacity>

                <TouchableOpacity 
                    style={[styles.button, { backgroundColor: '#ef4444' }, !isListening && styles.btnDisabled]}
                    onPress={stopTranscript}
                    disabled={!isListening}
                >
                    <Text style={styles.buttonText}>Stop</Text>
                </TouchableOpacity>
                
                <TouchableOpacity 
                    style={[styles.button, { backgroundColor: '#6b7280' }]} 
                    onPress={clearTranscript}
                >
                    <Text style={styles.buttonText}>Delete</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}


const styles = StyleSheet.create({
    container: { flex: 1, padding: 20, backgroundColor: '#fff' },
    textBox: { flex: 1, borderWidth: 1, borderColor: '#ccc', borderRadius: 10, padding: 15, marginBottom: 15 },
    transcriptText: { fontSize: 18, color: '#111' },
    status: { textAlign: 'center', marginBottom: 20, fontSize: 14, color: '#555' },
    buttonRow: { flexDirection: 'row', justifyContent: 'space-around' },
    button: { paddingVertical: 12, paddingHorizontal: 20, borderRadius: 8 },
    buttonText: { color: '#fff', fontWeight: 'bold' },
    btnDisabled: { backgroundColor: '#cccccc' },
    errorText: { color: '#ef4444', textAlign: 'center', marginBottom: 10, fontWeight: '600' },
});