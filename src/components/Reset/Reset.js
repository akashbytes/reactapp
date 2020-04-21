import React, { Fragment,Component } from "react";
import { 
    View,
    StatusBar, 
    StyleSheet,
    Image,
} from "react-native";
import Resetform from "./Resetform";

class Reset extends Component {
    

    render() {

        const { navigation } = this.props;

        return (
            <Fragment>
              <StatusBar  barStyle="light-content" hidden = {false} backgroundColor = "#F04343"  />
                <View style={styles.container}>
                    <View style={styles.logoContainer}>
                           <Image style={styles.logo}  source={require('../../../images/logo.png')} /> 
                    </View>
                    <View style={styles.formContainer}>
                            <Resetform navigation={ this.props.navigation } />
                    </View>
                                        
                </View>
            </Fragment>
            
        );
    }
}
export default Reset;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor :'#F04343',
        // alignItems: 'center',
        // justifyContent: 'center'
    },
    title: {
        color:'#fff',
        fontSize:22
    },  
    logo: {
        height:250,
        width:250,  
        marginTop:50,
    },
    logoContainer: {
        alignItems:'center',
        justifyContent:'center',
        // flexGrow:1,
    },
    formContainer : {

    }
});