import React, { Component } from "react";
import { 
    View,
    Text,
    StyleSheet,
    TextInput,
    TouchableOpacity,
    Alert
} from "react-native";

class Resetform extends Component {

    
    constructor(props){
        super(props)
        this.state = {
            otp:'',
            userID:'', 
            password:'',
            confirmPassword:'',
            changePasswordButton:'Change Password',
        }
    }
    
    // this.props.navigation.state.params.userId, 
    // 

    componentDidMount(){
        this.setState({otp:this.props.navigation.state.params.otp,'userID':this.props.navigation.state.params.userId });
    }
    _resetFunction = () =>{
        const { password }  = this.state ;
        const { confirmPassword }  = this.state ;
        const { otp }  = this.state ;
        const { userID }  = this.state ;
        this.setState({ changePasswordButton: 'Please Wait..' });

        if(password==""){
            Alert.alert('Please fill all fields');
            this.setState({ changePasswordButton: 'Submit' });

        }else if(password!=confirmPassword){
            Alert.alert('Confirm Password did not matched');
            this.setState({ changePasswordButton: 'Submit' });

        }else{
        
            fetch('https://adeeclinic.com/Api/reset.php', {
              method: 'POST',
              headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({
                otp: otp,
                userId:userID,
                password:password
              })
            }).then((response) => response.json())
                  .then((responseJson) => {
                    // If server response message same as Data Matched
                
                     // console.warn(responseJson);
                   if(responseJson.msg === 'success')
                    {
                        //Then open Profile activity and send user email to profile activity.
                        // let userid =  responseJson.userData.user_id;
                        this.setState({ changePasswordButton: 'Submit' });
                        Alert.alert('Password changed successfully');
                        this.props.navigation.navigate('Login');
                    }
                    else{
                      Alert.alert(responseJson.msg);
                       this.setState({ changePasswordButton: 'Submit' });
                    }
       
                  }).catch((error) => {
                    console.error(error);
                  });
    
        }

    }


    render() {

        console.warn(this.props.navigation);

        return (
            <View style={styles.container}>
                 <TextInput  
                         style={styles.input}
                         placeholder="New Password"
                         placeholderTextColor="rgba(255,255,255,0.5)"
                         onChangeText={password => this.setState({password})}
                         secureTextEntry={true}
                        autoCapitalize="none"

                />      

                <TextInput  
                         style={styles.input}
                         placeholder="Confirm Password"
                         onChangeText={confirmPassword => this.setState({confirmPassword})}
                         placeholderTextColor="rgba(255,255,255,0.5)"
                         secureTextEntry={true}
                        autoCapitalize="none"

                />   
                   
                
                

                <TouchableOpacity style={styles.buttonContainer}  onPress={this._resetFunction} >
                    <Text style={styles.buttonText}>{this.state.changePasswordButton}</Text>
                </TouchableOpacity>    

                <TouchableOpacity style={styles.signup}  onPress={() => this.props.navigation.navigate('Login')} >
                    <Text style={styles.signupText}>Already have an account ? Login </Text>
                </TouchableOpacity>
                
                

            </View>
        );
    }
}
export default Resetform;

const styles = StyleSheet.create({
    container: {
        padding:20,
    },
    input: {
        height:55,
        borderRadius:3,
        // backgroundColor:'rgba(255,255,255,0.5)',
        borderBottomColor:'#fff',
        borderBottomWidth:1,
        marginBottom:15,
        color:'#fff',
        paddingHorizontal:10,
    },
    buttonContainer: {
        backgroundColor:'#ffffff',
        paddingVertical:20,
        borderRadius:3,
        justifyContent:'center',
        // alignContent:'center',
        alignItems:'center',
        marginTop:10
    },
    buttonText: {
        fontSize:15,
        fontWeight:'700',
        color:'#F04343',
    },
    forgetPassword: {
        // marginTop:10,
        marginHorizontal:10,
        marginVertical:10,
    },
    forgetPasswordText: {
        color:'#fff',
        // alignSelf:'right',
    },
    signup: {
        justifyContent:'center',
        marginVertical:20,
        alignItems:'center'
    },
    signupText: {
        color:'#fff',
        // alignSelf:'right',
    }
    
});