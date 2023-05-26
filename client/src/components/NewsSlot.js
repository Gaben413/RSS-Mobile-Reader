import React from 'react';
import {View, Text, StyleSheet} from 'react-native';

export default function NewsSlot({data}){

    return(
        <View style={GetStyle(data.colorIndex)} key={data.key}>

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

function GetStyle(input){
    output = styles.mapViewRaspiberry;

    if(input == 1)
        output = styles.mapViewRaspiberry
    else if(input == 2)
        output = styles.mapViewUbuntu
    else if(input == 3)
        output = styles.mapViewBlender

    return output
}

const styles = StyleSheet.create({
    mapViewRaspiberry:{
        margin: 5,
        borderWidth: 5,
        borderRadius: 15,
        padding: 5,
        borderColor: '#CD2355',
        backgroundColor: 'white',
    },
    mapViewUbuntu:{
        margin: 5,
        borderWidth: 5,
        borderRadius: 15,
        padding: 5,
        borderColor: '#E95420',
        backgroundColor: 'white',
    },
    mapViewBlender:{
        margin: 5,
        borderWidth: 5,
        borderRadius: 15,
        padding: 5,
        borderColor: 'orange',
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