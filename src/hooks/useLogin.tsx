import * as WebBrowser from "expo-web-browser";
import * as Google from "expo-auth-session/providers/google";
import { useEffect } from "react";
import { makeRedirectUri } from "expo-auth-session";
import { signInWithCredential, GoogleAuthProvider } from "firebase/auth";
import { auth } from "../utils/firebase"; // ✅ dùng từ file firebase.ts

WebBrowser.maybeCompleteAuthSession();

export const useGoogleLogin = () => {
  const [request, response, promptAsync] = Google.useAuthRequest({
    clientId:
      "723738255512-mrcmjj0o9h37889vmmi0topre3589e1b.apps.googleusercontent.com",
    redirectUri: makeRedirectUri(),
  });

  useEffect(() => {
    if (response?.type === "success") {
      const id_token = response.authentication?.idToken;
      if (id_token) {
        const credential = GoogleAuthProvider.credential(id_token);
        signInWithCredential(auth, credential)
          .then((userCred) => {
            console.log("✅ Đăng nhập Firebase thành công", userCred.user);
          })
          .catch((err) => {
            console.error("❌ Lỗi khi đăng nhập Firebase", err);
          });
      }
    }
  }, [response]);

  return { promptAsync, request };
};
