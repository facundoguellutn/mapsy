import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";

export const Container = ({ 
  children, 
  edges = ['top', 'bottom', 'left', 'right'] 
}: { 
  children: React.ReactNode;
  edges?: Array<'top' | 'bottom' | 'left' | 'right'>;
}) => {
  return (
    <SafeAreaView className="flex-1 bg-background" edges={edges}>
      {children}
    </SafeAreaView>
  );
};
