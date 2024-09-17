import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { Drawer } from 'expo-router/drawer';
import { Ionicons } from '@expo/vector-icons';
import { DrawerContentScrollView, DrawerItemList } from '@react-navigation/drawer';
import { Button, View } from 'react-native';



function CustomDrawerContent(props) {
  return (    
    <DrawerContentScrollView {...props}>
      <DrawerItemList {...props} />
      <Button title="Deslogar"/>
    </DrawerContentScrollView>
  );
}



const DrawerLayout = () => {
    return (
        <GestureHandlerRootView style={{ flex: 1 }}>
        <Drawer drawerContent= {(props) => <CustomDrawerContent {...props} />}>
          <Drawer.Screen name="index" options={{
            drawerLabel: "Principal",
             headerTitle:"Principal",
              drawerIcon: () => <Ionicons name="home" size={24} color="black"/> 
            }}
            />
          <Drawer.Screen name="list" options={{
            drawerLabel: "Listagem",
             headerTitle:"Listagem",
              drawerIcon: () => <Ionicons name="list-outline" size={24} color="black"/> 
            }}
            />
          <Drawer.Screen name="payment" options={{
            drawerLabel: "Pagamentos",
             headerTitle:"Pagamentos",
              drawerIcon: () => <Ionicons name="diamond-outline" size={24} color="black"/> 
            }}
            />
            </Drawer>
      </GestureHandlerRootView>
    );
}

export default function Layout() {
  return DrawerLayout ();
}