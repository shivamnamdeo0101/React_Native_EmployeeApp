import React,{useState} from 'react';
import { StyleSheet, Text,View,Modal,Alert,KeyboardAvoidingView} from 'react-native'
import {TextInput,Button} from 'react-native-paper';
import * as ImagePicker from 'expo-image-picker';
import * as Permissions from 'expo-permissions';


const CreateEmployee =({navigation,route})=>{


    const getDetails = (type)=>{
        if(route.params){
           switch(type){
               case "name":
                   return route.params.name
               case "phone":
                  return route.params.phone
               case "email":
                 return route.params.email
               case "salary":
                   return route.params.salary  
               case "picture":
                   return  route.params.picture
               case "position":
                 return  route.params.position  
           }
        }
        return ""
     }

    if(route.params){
        console.log(route.params)
    }

    const [name,setName] = useState(getDetails("name"))
    const [phone,setPhone] = useState(getDetails("phone"))
    const [email,setEmail] = useState(getDetails("email"))
    const [salary,setSalary] = useState(getDetails("salary"))
    const [picture,setPicture] = useState(getDetails("picture"))
    const [position,setPosition] = useState(getDetails("position"))
    const [modal,setModal] = useState(false)
    const [enableshift,setenableShift] = useState(false)


    const submitData = ()=>{
        fetch("http://192.168.43.205:3000/send-data",{
            method:"post",
            headers:{
                'Content-Type':'application/json'
            },
            body:JSON.stringify({
                name,
                email,
                phone,
                salary,
                picture,
                position

            })
        })
        .then(res=>res.json())
        .then(data=>{
            Alert.alert(`${data.name} is Saved Succesfully `)
            navigation.navigate("Home")
        }).catch(err=>{
            Alert.alert("Something Went Wrong")
        })
    }

    const updateDetails=()=>{

        fetch("http://192.168.43.205:3000/update",{
            method:"post",
            headers:{
                'Content-Type':'application/json'
            },
            body:JSON.stringify({
                id:route.params._id,
                name,
                email,
                phone,
                salary,
                picture,
                position

            })
        })
        .then(res=>res.json())
        .then(data=>{
            Alert.alert(`${data.name} is Updated `)
            navigation.navigate("Home")
        }).catch(err=>{
            Alert.alert("Something Went Wrong")
        })
    }


    const pickFromGallery = async()=>{
        const {granted} = await Permissions.askAsync(Permissions.CAMERA_ROLL)
        if(granted){
            let data = await ImagePicker.launchImageLibraryAsync({
                mediaTypes:ImagePicker.MediaTypeOptions.Images,
                allowsEditing:true,
                aspect:[1,1],
                quality:0.6,
                
            })
            if(!data.cancelled){
                let newfile = { 
                    uri:data.uri,
                    type:`test/${data.uri.split(".")[1]}`,
                    name:`test.${data.uri.split(".")[1]}`
                }
                handleUpload(newfile)
            }
        }else{
            Alert.alert("You have to give permission")
            
        }
    }
    const pickFromCamera = async()=>{
        const {granted} = await Permissions.askAsync(Permissions.CAMERA)
        if(granted){
            let data = await ImagePicker.launchCameraAsync({
                mediaTypes:ImagePicker.MediaTypeOptions.Images,
                allowsEditing:true,
                aspect:[1,1],
                quality:0.6,
                
            })
            if(!data.cancelled){
                let newfile = { 
                    uri:data.uri,
                    type:`test/${data.uri.split(".")[1]}`,
                    name:`test.${data.uri.split(".")[1]}`
                }
                handleUpload(newfile)
            }
        }else{
            Alert.alert("You have to give permission")
        }
    }

    const handleUpload=(image)=>{
        const data = new FormData()
        data.append('file',image)
        data.append('upload_preset','employeeApp')
        data.append("cloud_name","aryansn0101")

        fetch("https://api.cloudinary.com/v1_1/aryansn0101/image/upload",{
            method:"post",
            body:data
        }).then(res=>res.json()).
        then(data =>{
            setPicture(data.url)
            setModal(false)
        }).catch(err=>{
            Alert.alert("Error While Uploading")
        })
    }

    return(
        <KeyboardAvoidingView behavior="position"  style={styles.root} enabled={enableshift}>
        <View>
            
            <TextInput
                label='Name'
                style= {styles.inputStyle}
                value={name}
                onFocus={()=>setenableShift(false)}
                theme={theme}
                mode="outlined"
                onChangeText={text => setName(text)}
            />
            <TextInput
                label='Email'
                style= {styles.inputStyle}
                value={email}
                theme={theme}
                onFocus={()=>setenableShift(false)}
                mode="outlined"
                onChangeText={text => setEmail(text)}
            />
            <TextInput
                label='Phone'
                style= {styles.inputStyle}
                value={phone}
                theme={theme}
                onFocus={()=>setenableShift(false)}
                mode="outlined"
                onChangeText={text => setPhone(text)}
            />
            <TextInput
                label='Salary'
                style= {styles.inputStyle}
                value={salary}
                theme={theme}
                onFocus={()=>setenableShift(true)}
                mode="outlined"
                onChangeText={text => setSalary(text)}
            />
             <TextInput
                label='Position'
                style= {styles.inputStyle}
                value={position}
                onFocus={()=>setenableShift(true)}
                theme={theme}
                mode="outlined"
                onChangeText={text => setPosition(text)}
            />

            <Button style={styles.inputStyle} 
                icon={picture==""?"upload":"check"}
                mode="contained"
                theme={theme}
                onPress={() => setModal(true)}>
                Upload Image
            </Button>

            {route.params?
             <Button 
             style={styles.inputStyle}
             icon="content-save"
              mode="contained" 
              theme={theme}
              onPress={() => updateDetails()}>
                   Update details
             </Button>
             : 
             <Button 
             style={styles.inputStyle}
             icon="content-save"
              mode="contained" 
              theme={theme}
              onPress={() => submitData()}>
                   save
             </Button>
             }

           

            <Modal 
                animationType="slide"
                transparent={true}
                visible={modal}
            
            >   
            <View style={styles.modelView}>
                <View style={styles.modelButtonView}>
                <Button style={styles.inputStyle}
                icon="camera"
                mode="contained" 
                theme={theme}
                onPress={() => pickFromCamera()}>
                    Camera
                </Button>
                <Button style={styles.inputStyle}
                icon="image-area"
                 mode="contained"
                 theme={theme}
                  onPress={() => pickFromGallery()}>
                    Gallery
                </Button>
                </View>
                <Button  style={styles.inputStyle}icon="cancel" onPress={() => setModal(false)}>
                    Cancel
                </Button>
             
            </View>
            
            
            </Modal>
           
        </View> 
        </KeyboardAvoidingView>

    )
}

const theme={
    colors:{
        primary:"#f033fa"
    }
}

const styles = StyleSheet.create({
    root:{
        flex:1
    },
    inputStyle:{
        margin:10
        
    },
    modelButtonView:{
        flexDirection:"row",
        justifyContent:"space-around",
        padding:10,
    },
    modelView:{
        position:"absolute",
        bottom:2,
        width:"100%",
        backgroundColor:"white",
    },

})

export default CreateEmployee