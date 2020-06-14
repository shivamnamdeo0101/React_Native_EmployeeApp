import React from 'react';
import { StyleSheet, Text, View,Image,Linking,Platform,Alert} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import {Title, Card,Button} from 'react-native-paper';
import { MaterialIcons,Entypo } from '@expo/vector-icons';

const Profile=(props)=>{

    const {_id,name,picture,phone,email,salary,position} = props.route.params.item
    console.log(_id)
    const deleteEmploye = ()=>{
        fetch("http://192.168.43.205:3000/delete",{
            method:"post",
            headers:{
             'Content-Type': 'application/json'
            },
            body:JSON.stringify({
                id:_id
            })
        })
        .then(res=>res.json())
        .then(deletedEmp=>{
            Alert.alert(`${deletedEmp.name} deleted`)
            props.navigation.navigate("Home")
        })
        .catch(err=>{
         Alert.alert("someting went wrong")
        })
    }


    const openDial=()=>{
        if(Platform.OS==="android"){
            Linking.openURL(`tel:${phone}`)
        }else{
            Linking.openURL(`telprompt:${phone}`)
        }
    }

    return (
        <View style={styles.root}>
              <LinearGradient
                colors={["#f033fa","#fbc1ff"]}
                style={{height: "20%"}}
            />
            <View style={{alignItems:"center"}}>
            <Image
                    style={{width:140,height:140,borderRadius:140/2,marginTop:-70}}
                    source={{
                        uri:picture
                    }}
                />
            </View>
            <View style={{alignItems:"center",margin:15}}>
                <Title>{name}</Title>
                <Text style={styles.myText}>{position}</Text>
            </View>


            <Card style={styles.mycard} onPress={()=>
                Linking.openURL(`mailto:${email}`)
            }>
                <View style={styles.cardConent}>
                    <MaterialIcons name="email" size={32} color="black" />
                    <Text style={styles.myText}>{email}</Text>
                </View>
            </Card>
            <Card style={styles.mycard} onPress={()=>openDial()

            }>
                <View style={styles.cardConent}>
                    <MaterialIcons name="phone" size={32} color="black" />
                    <Text style={styles.myText}>{phone}</Text>
                </View>
            </Card>
            <Card style={styles.mycard}>
                <View style={styles.cardConent}>
                    <MaterialIcons name="attach-money" size={32} color="black" />
                    <Text style={styles.myText}>{salary}</Text>
                </View>
            </Card>


            <View style={{flexDirection:"row",justifyContent:"space-around",padding:10,}}>
            <Button  style={styles.inputStyle}
                mode ="contained" icon="account-edit" 
                theme={theme}
                onPress={() => {
                    props.navigation.navigate("Create",
                    {_id,name,picture,phone,salary,email,position}
                    ) 
                 }}>
                       Edit
            </Button>
            <Button  style={styles.inputStyle}
                mode ="contained" icon="delete" 
                theme={theme}
                onPress={()=>deleteEmploye()}>
                       Delete
            </Button>
            </View>


              
        </View>
    )
}


const theme={
    colors:{
        primary:"#f033fa"
    }
}


const  styles = StyleSheet.create({

    root:{
        flex:1
    },
    mycard:{
        margin:3,
    },
    cardConent:{
        flexDirection:"row",
        padding:10,
    },
    myText:{
        fontSize:18,
        marginTop:3,
        marginLeft:5,
    },


})
export default Profile