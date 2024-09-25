import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { Drawer } from 'expo-router/drawer';
import { Ionicons } from '@expo/vector-icons';
import { DrawerContentScrollView, DrawerItemList } from '@react-navigation/drawer';
import { Button, Image, Text, TouchableOpacity, View } from 'react-native';
import { useAuth } from '../../hooks/Auth/index';



function CustomDrawerContent(props) {
  const { signOut, user } = useAuth();

  return (
    <View style={{ flex: 1 }}>
      <View style={{ marginTop: 15 }}>
        <Image source={{ uri: "https://github.com/PauloVictor22.png" 
        }} 
        style={{ width: 100,
           height: 100,
           borderRadius: 50,
           alignSelf: "center",
           backgroundColor: "#708090",
           paddingVertical: 10,
           marginTop: 10,

         }}
        />
        <Text style={{ textAlign: "center", fontSize: 20 }}>
          {user?.user?.nome}
        </Text>
      </View>
      <DrawerContentScrollView {...props}>
        <DrawerItemList {...props} />
      </DrawerContentScrollView>
      <TouchableOpacity onPress={() => signOut()}
        style={{
          justifyContent: "center", alignItems: "center",
          height: 50,
          padding: 10,
          backgroundColor: "#836FFF",
          borderRadius: 5,
          margin: 10
        }} >
        <Text style={{ color: "white", fontFamily: "bold" }}>Deslogar</Text>
      </TouchableOpacity>
    </View>
  );
}



const DrawerLayout = () => {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <Drawer drawerContent={(props) => <CustomDrawerContent {...props} />}>
        <Drawer.Screen name="index" options={{
          drawerLabel: "Principal",
          headerTitle: "Principal",
          drawerIcon: () => <Ionicons name="home" size={24} color="black" />
        }}
        />
        <Drawer.Screen name="list" options={{
          drawerLabel: "Listagem",
          headerTitle: "Listagem",
          drawerIcon: () => <Ionicons name="list-outline" size={24} color="black" />
        }}
        />
        <Drawer.Screen name="payment" options={{
          drawerLabel: "Pagamentos",
          headerTitle: "Pagamentos",
          drawerIcon: () => <Ionicons name="diamond-outline" size={24} color="black" />
        }}
        />
      </Drawer>
    </GestureHandlerRootView>
  );
}

export default function Layout() {
  return DrawerLayout();
}