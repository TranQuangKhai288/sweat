import React, { useEffect, useState } from "react";
import { GestureHandlerRootView } from "react-native-gesture-handler"; // Thêm import
import { AuthProvider } from "./src/contexts/AuthContext";
import { UserProvider } from "./src/contexts/UserContext";
import { BottomSheetProvider } from "./src/contexts/BottomSheetContext";
import AppNavigator from "./src/navigation/AppNavigation";
import "./global.css";
import { ThemeProvider } from "./src/contexts/ThemeContext";
import { auth } from "./src/utils/firebase";
console.log("📦 Firebase Auth Instance:", auth); // 👈 Log để xác nhận

const App: React.FC = () => {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <ThemeProvider>
        <AuthProvider>
          <UserProvider>
            <BottomSheetProvider>
              <AppNavigator />
            </BottomSheetProvider>
          </UserProvider>
        </AuthProvider>
      </ThemeProvider>
    </GestureHandlerRootView>
  );
};

export default App;
