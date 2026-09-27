import { Link, useRouter } from 'expo-router'
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'

const Home = () => {
    const router = useRouter();

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Home</Text>
            {/* <Link href="/about">Go To About Page</Link> */}

            <TouchableOpacity
                style={styles.card}
                onPress={() => router.push('/SpeechToText')}
            >
                <Text style={styles.cardText}>🎙️ Speech to Text</Text>
            </TouchableOpacity>

            <TouchableOpacity
                style={styles.card}
                onPress={() => router.push('/OCR')}
            >
                <Text style={styles.cardText}>🖼️ Image to Text (OCR)</Text>
            </TouchableOpacity>
        </View>
    )
}

export default Home

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 32
    },
    card: {
        backgroundColor: '#4f46e5',
        padding: 20,
        borderRadius: 12,
        marginBottom: 15,
    },
    cardText: { color: '#fff', fontSize: 18, fontWeight: '600', textAlign: 'center' },
})