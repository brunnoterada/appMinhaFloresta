import React,{useState,useEffect} from 'react';
import { KeyboardAvoidingView,
  View,
  Image,
  TextInput,
  TouchableOpacity,
  Text,
  StyleSheet,
  Animated,
  Keyboard,
  } from 'react-native';

export default function App() {

  const[offset] = useState(new Animated.ValueXY({x : 0, y : 80,}));
  const[opacity] = useState(new Animated.Value(0));
  const[logoima] = useState(new Animated.ValueXY({x : 100, y : 100}));
  useEffect(()=>{
    keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', keyboardDidShow);
    keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', keyboardDidHide);
    Animated.parallel([
      Animated.spring(offset.y,{
      toValue:0,
      speed:4,
      bounciness:20
    }),
    Animated.timing(opacity,{
      toValue:1,
      duration:200,
    })
  
  ]).start();
    
  },[]);

  function keyboardDidShow(){
    Animated.parallel([
      Animated.timing(logoima.x,{
        toValue:55,
        duration:100,
      }),
      Animated.timing(logoima.y,{
        toValue:55,
        duration:100,
      }),

    ]).start();
  }
  function keyboardDidHide(){
    Animated.parallel([
      Animated.timing(logoima.x,{
        toValue:100,
        duration:100,
      }),
      Animated.timing(logoima.y,{
        toValue:100,
        duration:100,
      }),

    ]).start();
  }

  return (
    <KeyboardAvoidingView style={styles.background}>
      <View style={styles.logo}>
        <Animated.Image
        style={{
          width: logoima.x,
          height: logoima.y,
        }} 
        source={require('./assets/logo.png')}/>
      </View>
      <Animated.View 
      style={[
        styles.container,
      {
        opacity:opacity,
        transform:[
          {translateY: offset.y}
        ]
      }
      ]}
      >
        <TextInput 
        style={styles.input}
        placeholder="Email"
        autoCorrect={false}
        onChangeText={()=>{}}
        />
        <TextInput 
        style={styles.input}
        placeholder="Senha"
        autoCorrect={false}
        onChangeText={()=>{}}
        />
        <TouchableOpacity style={styles.buttonSubmit}>
          <Text style={styles.submitText}>
              Acessar
          </Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.buttonRegister}>
          <Text style={styles.registerText}>
              Criar conta gratuita
          </Text>
        </TouchableOpacity>
      </Animated.View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  background:{
    flex:1,
    alignItems:'center',
    justifyContent:'center',
  },
  logo:{
    flex:1,
    justifyContent:'center',
  },
  container:{
    flex:1,
    alignItems:'center',
    justifyContent:'center',
    width:'90%',
    marginBottom:50,
  },
  input:{
    backgroundColor:'#DFDFDF',
    width:'90%',
    marginBottom:18,
    color:'#222',
    fontSize:17,
    padding:10,
    borderRadius:7,
  },
  buttonSubmit:{
    backgroundColor:'#29950C',
    width:'90%',
    height:45,
    alignItems:'center',
    justifyContent:'center',
    borderRadius:7,
    
  },
  submitText:{
    color:'#fff',
    fontSize:18,
  },
  buttonRegister:{
    marginTop:10,
  },

});