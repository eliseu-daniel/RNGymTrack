import React from 'react';
import {View, Text, Image, ScrollView, TextInput} from 'react-native';

const App = () => {
  return (
    <ScrollView>
      <Text>GYM TRACK</Text>
      <View>
        <Image
          source={{
            uri: 'https://reactnative.dev/docs/assets/p_cat2.png',
          }}
          style={{width: 200, height: 200}}
        />
      </View>
      <Text> Login</Text>
      <TextInput
        style={{
          height: 40,
          borderColor: 'gray',
          borderWidth: 1,
        }}
        placeholder="Login"
      />
      <Text>Senha:</Text>
      <TextInput
      secureTextEntry={true}
        style={{
          height: 40,
          borderColor: 'gray',
          borderWidth: 1
        }}
        placeholder='Senha'/>
    </ScrollView>
  );
};

export default App;