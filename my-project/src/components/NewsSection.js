import react from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function NewsSection({data}){
    return(
        <View style={styles.mapView} key={data.key}>

            <Text style={styles.articleText}>{data.key}: {data.title}</Text>

            <Text>{data.description}</Text>

            <Text 
                style={styles.link}
                onPress={() => {
                    Linking.openURL(data.url)
                }}
            >{data.url}</Text>

            <Text style={styles.timeText}>{data.published}</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    mapView:{
        margin: 5,
        borderWidth: 5,
        borderRadius: 15,
        padding: 5,
        borderColor: '#CD2355',
        backgroundColor: 'white',
    },
    articleText:{
        fontSize: 15,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    link:{
        color: 'dodgerblue',
        textDecorationLine: 'underline',
        marginBottom: 10,
    },
    timeText:{
        textAlign: 'right',
        fontSize: 10,
    },
})