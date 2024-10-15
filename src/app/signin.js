import { StatusBar } from 'expo-status-bar';
import { BackHandler, StyleSheet, Text, TextInput, View, TouchableOpacity } from 'react-native';
import { useAuth } from '../hooks/Auth';
import { router } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { useState } from 'react';

export default function App() {
  const { signIn, signOut } = useAuth();
  const [email, setEmail] = useState("super@email.com");
  const [password, setPassword] = useState("A123456a!");
  const [passwordVisibility, setPasswordVisibility] = useState(false);

  const togglePasswordVisibility = () => {
    setPasswordVisibility(!passwordVisibility);
  }

  const handleEntrarSuper = async () => {
    try {
      await signIn({ email: "super@email.com", password: "A123456a!" });
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <View style={styles.container}>
      <View style={styles.inputbox}>
        <Ionicons name="mail-open-outline" size={20} color="black" />
        <TextInput style={styles.emailinput} placeholder="Email" value={email} onChangeText={setEmail} />
      </View>

      <View style={styles.inputbox}>
        <Ionicons name="lock-closed-outline" size={20} color="black" />
        <TextInput 
          style={styles.emailinput} 
          placeholder="Senha" 
          value={password} 
          onChangeText={setPassword} 
          secureTextEntry={!passwordVisibility} 
        />
        <Ionicons 
          name={passwordVisibility ? "eye-off-outline" : "eye-outline"} 
          size={20} 
          color="black" 
          onPress={togglePasswordVisibility} 
        />
      </View>

      <TouchableOpacity style={styles.button} onPress={handleEntrarSuper}>
        <Text style={styles.buttonText}>Entrar</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.buttonSecondary} onPress={() => router.push("about")}>
        <Text style={styles.buttonTextSecondary}>Sobre</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.buttonSecondary} onPress={() => BackHandler.exitApp()}>
        <Text style={styles.buttonTextSecondary}>Sair do aplicativo</Text>
      </TouchableOpacity>

      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
    gap: 15,
  },
  inputbox: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 10,
    width: '90%',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
    marginVertical: 10,
  },
  emailinput: {
    flex: 1,
    height: 40,
    fontSize: 16,
    paddingLeft: 10,
    color: '#333',
  },
  button: {
    backgroundColor: '#836FFF',
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderRadius: 10,
    width: '90%',
    alignItems: 'center',
    marginVertical: 10,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  buttonSecondary: {
    backgroundColor: '#fff',
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderRadius: 10,
    width: '90%',
    alignItems: 'center',
    borderColor: '#836FFF',
    borderWidth: 1,
    marginVertical: 10,
  },
  buttonTextSecondary: {
    color: '#836FFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
});