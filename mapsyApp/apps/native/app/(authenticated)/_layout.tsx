import { Drawer } from "expo-router/drawer";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import { HeaderButton } from "@/components/header-button";
import { Link } from "expo-router";

export default function AuthenticatedLayout() {
  return (
    <Drawer>
      <Drawer.Screen
        name="home"
        options={{
          headerTitle: "Mapsy",
          drawerLabel: "Inicio",
          drawerIcon: ({ size, color }) => (
            <Ionicons name="home-outline" size={size} color={color} />
          ),
          headerRight: () => (
            <Link href="/profile" asChild>
              <HeaderButton />
            </Link>
          ),
        }}
      />
      <Drawer.Screen
        name="explore"
        options={{
          headerTitle: "Explorar",
          drawerLabel: "Explorar",
          drawerIcon: ({ size, color }) => (
            <Ionicons name="compass-outline" size={size} color={color} />
          ),
        }}
      />
      <Drawer.Screen
        name="favorites"
        options={{
          headerTitle: "Favoritos",
          drawerLabel: "Favoritos",
          drawerIcon: ({ size, color }) => (
            <Ionicons name="heart-outline" size={size} color={color} />
          ),
        }}
      />
      <Drawer.Screen
        name="history"
        options={{
          headerTitle: "Historial",
          drawerLabel: "Historial",
          drawerIcon: ({ size, color }) => (
            <Ionicons name="time-outline" size={size} color={color} />
          ),
        }}
      />
      <Drawer.Screen
        name="profile"
        options={{
          headerTitle: "Perfil",
          drawerLabel: "Perfil",
          drawerIcon: ({ size, color }) => (
            <Ionicons name="person-outline" size={size} color={color} />
          ),
        }}
      />
    </Drawer>
  );
}