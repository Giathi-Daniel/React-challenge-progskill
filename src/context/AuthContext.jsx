import { createContext, useContext, useEffect, useState } from "react";
import { auth } from "../firebase";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (user) => {
      if (user) {
        // Check email verification status
        if (!user.emailVerified) {
          await sendEmailVerification(user);
        }

        // Log session
        const sessionDoc = await firestore.collection("sessions").add({
          userId: user.uid,
          createdAt: new Date(),
          deviceInfo: navigator.userAgent,
          ipAddress: await fetch("https://api.ipify.org").then((res) =>
            res.text()
          ),
        });

        // Store session ID
        await user.getIdToken(true);
      }
    });
  }, []);

  return (
    <AuthContext.Provider value={{ user, loading }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
