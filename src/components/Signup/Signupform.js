import React, { Component } from "react";
import { 
    View,
    Text,
    StyleSheet,
    TextInput,
    TouchableOpacity,
    Alert
} from "react-native";

class Signupform extends Component {

    constructor(props) {
        super(props)
    
        this.state = {
          name: '',
          email: '',
          phone: '',
          password: '',
          confirmPassword:'',
          SignupButton:'Register',
        }
      }
    
      _Register = () => {
    
       this.setState({ SignupButton: 'Please Wait..' });

       if(this.state.password==this.state.confirmPassword){

            fetch('https://adeeclinic.com/Api/signup.php', {
                method: 'POST',
                headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                name: this.state.name,
                email: this.state.email,
                password: this.state.password,
                phone: this.state.phone
                })
            }).then((response) => response.json())
                .then((responseJson) => {
                // Showing response message coming from server after inserting records.
                    Alert.alert(responseJson.msg);
                    
                this.setState({ SignupButton: 'Register' })
        
        
                }).catch((error) => {
                console.error(error);
                this.setState({ SignupButton: 'Register' })
        
                });
       }else{
            Alert.alert('Confirm password did not matched');
            this.setState({ SignupButton: 'Register' })

       }
    
        
    
    
      }
    

    render() {
        return (
            <View style={styles.container}>
                <TextInput  
                         style={styles.input}
                         placeholder="Name"
                         onChangeText={data => this.setState({ name: data })}
                         underlineColorAndroid='transparent'
                         placeholderTextColor="rgba(255,255,255,0.5)"

                />

                <TextInput  
                         style={styles.input}
                         placeholder="Email"
                         onChangeText={data => this.setState({ email: data })}
                         underlineColorAndroid='transparent'
                         placeholderTextColor="rgba(255,255,255,0.5)"
                        autoCapitalize="none"


                />  

                <TextInput  
                         style={styles.input}
                         placeholder="Phone no"
                         onChangeText={data => this.setState({ phone: data })}
                         underlineColorAndroid='transparent'
                         placeholderTextColor="rgba(255,255,255,0.5)"
                        autoCapitalize="none"


                />
                    

                
                <TextInput  
                         style={styles.input}
                         placeholder="Password"
                         placeholderTextColor="rgba(255,255,255,0.5)"
                         secureTextEntry={true}
                         onChangeText={data => this.setState({ password: data })}
                         underlineColorAndroid='transparent'
                        autoCapitalize="none"

                />      

                <TextInput  
                         style={styles.input}
                         placeholder="Confirm Password"
                         onChangeText={data => this.setState({ confirmPassword: data })}
                         underlineColorAndroid='transparent'
                         placeholderTextColor="rgba(255,255,255,0.5)"
                         secureTextEntry={true}
                        autoCapitalize="none"

                />      

                    



               
                <TouchableOpacity style={styles.buttonContainer}  onPress={this._Register} >
                    <Text style={styles.buttonText}>{this.state.SignupButton}</Text>
                </TouchableOpacity>    

                <TouchableOpacity style={styles.signup} onPress={() => this.props.navigation.goBack()} >
                    <Text style={styles.signupText}>Already have an account ? Login </Text>
                </TouchableOpacity>
                

            </View>
        );
    }
}
export default Signupform;

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