import { forwardRef } from "react";
import { Pressable, View, Text } from "react-native";
import { useAuth } from "@/contexts/AuthContext";

export const HeaderButton = forwardRef<
  typeof Pressable,
  { onPress?: () => void }
>(({ onPress }, ref) => {
  const { state } = useAuth();
  const { user } = state;
  
  const getInitial = () => {
    if (user?.name) {
      return user.name.charAt(0).toUpperCase();
    }
    return 'U'; // Default for "Usuario"
  };

  return (
    <Pressable
      onPress={onPress}
      className="mr-3"
    >
      {({ pressed }) => (
        <View 
          className="w-8 h-8 rounded-full bg-primary items-center justify-center"
          style={{
            opacity: pressed ? 0.8 : 1,
          }}
        >
          <Text className="text-white font-bold text-sm">
            {getInitial()}
          </Text>
        </View>
      )}
    </Pressable>
  );
});
