import { StatusBar } from 'expo-status-bar';
import { Button, StyleSheet, Text, View } from 'react-native';
import { useAuth } from '../hooks/Auth';

export default function App() {
  const {signIn, signOut} = useAuth();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Aplicativo pronto para usar</Text>
      <Button title="SignIn"
      onPress={() => 
        signIn({ email: "super@email.com", password: "Super123!" })
        }
      />
      <Button title="SignIn Adm"
      onPress={() => 
        signIn({ email: "adm@email.com", password: "Adm123!" })
        }
      />
      <Button title="SignIn User"
      onPress={() => 
        signIn({ email: "user@email.com", password: "User123!" })
        }
      />
      <Button title="SignOut"/>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 20,
    fontFamily: 'light',
  },
});
