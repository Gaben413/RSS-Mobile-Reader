import {SUBMIT_IP, DELETE_IP} from "@env"
import React, { useState } from 'react';
import {View, Text, StyleSheet, Button, Alert} from 'react-native';
import Axios from 'axios';

export default function NewsSlot({data}){

    //Request a function to automatically reload the page so it can be more dinamic
    const [show, setShow] = useState(data.show);
    const [del, setDel] = useState(true);

    const quickAlert = (input) => Alert.alert('REMOVED', `\"${input}\" removed from favourites`,
    [
      {
        text: 'OK',
        onPress: () => {
          console.log(`${input}`);
        }
      }
    ]);

    return(
        <View style={GetStyle(data.colorIndex)} key={data.key}>
            <View style={styles.viewFav}>
                <Text style={styles.articleText}>{data.key}: {data.title}</Text>
                <View style={{maxHeight:'100%'}}>
                    {
                        show ?
                        <Button
                            title='FAV'
                            onPress={()=>{
                                array = [data.title, data.description, data.url, data.published, GetSourceType(data.colorIndex)]
                                console.log('Show data');
                                console.log('TITLE:' + array[0]+'\nDESC:' + array[1] + '\nLINK:' + array[2] + '\nPUBLISHED:' + array[3] + '\nTYPE:' + array[4])

                                Axios.post(SUBMIT_IP, {item:array});
                            }}
                        />
                        :
                        <Button
                            title='DEL'
                            onPress={()=>{
                                if(del){
                                    quickAlert(data.title)

                                    console.log(`DELETE KEY ${data.key}`);
                                    console.log(`${DELETE_IP}/${data.key}`);
                                    Axios.delete(`${DELETE_IP}/${data.otherKey}`)
                                    setDel(false);
                                }
                            }}
                            disabled={!del}
                        />
                    }
                    
                </View>
            </View>

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

function GetSourceType(input){
    output = 'R';

    if(input == 1){
        output = 'R';
    }else if(input == 2){
        output = 'U';
    }else if(input == 3){
        output = 'B';
    }

    return output;
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
        width: '80%',
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
    viewFav:{
        maxWidth: '100%',
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    favButton:{
        width: 50,
        height: 5
    }
})