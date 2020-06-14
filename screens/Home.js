import React,{useEffect,useState} from 'react';
import { StyleSheet, Text, View ,Image,FlatList,Alert,Button } from 'react-native';
import {Card,FAB} from 'react-native-paper';
import auth from '@react-native-firebase/auth';
import { GoogleSignin } from '@react-native-community/google-signin';

GoogleSignin.configure({
  webClientId: '854824281419-i470o91bp7e65uau1l18t658gp0pr6jh.apps.googleusercontent.com',
});


function GoogleSignIn() {
    return (
    
    );
  }

  

const Home=({navigation})=>{

    const [data,setData] = useState([])
    const [loading,setLoading] = useState(true)
    const fetchData=()=>{
        fetch("http://192.168.43.205:3000/")
        .then(res=>res.json())
        .then(results=>{
            setData(results)
            setLoading(false)
        }).catch(err=>{
            Alert.alert("Something Went Wrong")
        })
    }

    useEffect(()=>{
       fetchData()
    },[])

    const renderList = ((item)=>{
        return (
            <Card style={styles.mycard}

                onPress={()=>navigation.navigate("Profile",{item})}
            
            >
            <View style={styles.cardView}> 
            <Image
                style={{width:60,height:60,borderRadius:30}}
                source={{uri:item.picture}}
                
                />
                <View style={{marginLeft:10}}>
                <Text style={styles.text}>{item.name}</ Text>
                <Text>{item.position}</Text>
                </View>
            
            </View>
            </Card>
        )
    })

    return(


        <Button
        title="Google Sign-In"
        onPress={() => onGoogleButtonPress().then(() => console.log('Signed in with Google!'))}
      />
                //<View style={{flex:1}}>
                //  <FlatList
                //    data = {data}
                //    renderItem={({item})=>{
                //        return renderList(item)
                //    }}
                //
                //    keyExtractor={item=>item.id}
                //    onRefresh={()=>fetchData()}
                //    refreshing={loading}
                //
                ///>
                //    
                //
                //    <FAB onPress={()=>navigation.navigate("Create")}
                //        style={styles.fab}
                //        small ={false}
                //        icon="plus"
                //        theme={{colors:{
                //            primary:"#f033fa"
                //        }}}
                //        
                    //
                //    />
                // </View>


                <Text>
                    Hi
                </Text>
        
    )
}

const styles = StyleSheet.create({

    logo: {
        width: 60,
        height: 60,
        borderRadius:30,
    },
    mycard:{
        margin:5,
        padding:5,
        flexDirection:"row",
        backgroundColor:"#e0e0e0"
    },
    cardView:{
        flexDirection:"row",
        padding:15,
    },
    text:{
       fontSize:18,
       
    },
    fab: {
        position: 'absolute',
        margin: 16,
        right: 0,
        bottom: 0,
      },
})
export default Home