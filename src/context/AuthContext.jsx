import { createContext, useContext, useEffect, useState } from "react";
import PropTypes from "prop-types";
import { auth, db } from "../../firebase";
import { sendEmailVerification } from "firebase/auth";
import { collection, addDoc } from "firebase/firestore";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (user) => {
      if (user) {
        if (!user.emailVerified) {
          await sendEmailVerification(user);
        }

        try {
          // Add session data to Firestore
          const sessionDoc = await addDoc(collection(db, "sessions"), {
            userId: user.uid,
            createdAt: new Date(),
            deviceInfo: navigator.userAgent,
            ipAddress: await fetch("https://api.ipify.org").then((res) => res.text()),
          });
          console.log("Session created:", sessionDoc.id);
        } catch (error) {
          console.error("Error creating session in Firestore:", error);
        }
      }
      setUser(user);
      setLoading(false);
    });

    return () => unsubscribe(); // Cleanup listener
  }, []);

  return (
    <AuthContext.Provider value={{ user, loading }}>
      {children}
    </AuthContext.Provider>
  );
}

// Custom hook to use auth context
export function useAuth() {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }

  return context;
}

// Prop types for AuthProvider
AuthProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export { AuthContext };
