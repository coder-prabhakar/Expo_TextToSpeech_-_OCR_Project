import { Link } from 'expo-router'
import { StyleSheet, Text, View } from 'react-native'

const Contact = () => {
    return (
        <View style={styles.container}>
            <Text style={styles.title}>Contact</Text>
            <Link href="/">Go To Home Page</Link>
        </View>
    )
}

export default Contact

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
    }
})