import { Slot, Stack } from 'expo-router'
import { StyleSheet, Text, View } from 'react-native'


const RootLayout = () => {

    return (
        <Stack
            screenOptions={{
                headerStyle: {
                    backgroundColor: '#00aeff'
                },
                headerTintColor: '#001aff'
            }}
        >
            <Stack.Screen name='index' options={{ title: 'Home' }} />
            <Stack.Screen name='about' options={{ title: 'About' }} />
            <Stack.Screen name='contact' options={{ title: 'Contact', headerShown: false }} />
            <Stack.Screen name='SpeechToText' options={{ title: 'Speech To Text' }} />
        </Stack>
    )

    // return (
    //     <View style={{ flex: 1 }}>

    //         {/* <Slot /> */}

    //         <Stack />

    //         <View style={styles.footer}>
    //             <Text style={styles.title}>Footer</Text>
    //         </View>
            
    //     </View>
    // )
}

export default RootLayout

const styles = StyleSheet.create({
    footer: {
        backgroundColor: 'black',
        width: '100%',
        paddingBlock: 40,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center'
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
        color: 'white',
    }
})