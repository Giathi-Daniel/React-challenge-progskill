import { useState } from "react";
import { doc, setDoc } from "firebase/firestore";
import { auth, db } from "../firebase";

const GdprConsent = () => {
  const [consent, setConsent] = useState(false);
  const handleAccept = async () => {
    await setDoc(doc(db, "users", auth.currentUser.uid), {
      privacy: {
        consentGiven: true,
        consentTimestamp: new Date(),
        cookiePreferences: {
          necessary: true,
          analytics: consent,
          marketing: consent,
        },
      },
    });
  };

  return (
    <div className="fixed bottom-0 left-0 right-0 p-6 bg-white shadow-xl dark:bg-gray-800">
      <div className="flex flex-col items-center max-w-6xl gap-4 mx-auto md:flex-row">
        <p className="flex-1 text-sm">
          We use cookies to ensure the best experience. Read our{" "}
          <a href="/privacy" className="text-blue-600 hover:underline">
            Privacy Policy
          </a>{" "}
          and{" "}
          <a href="/terms" className="text-blue-600 hover:underline">
            Terms of Service
          </a>
          .
        </p>
        <div className="flex gap-4">
          <button
            onClick={handleAccept}
            className="px-4 py-2 text-white bg-blue-600 rounded-lg"
          >
            Accept All
          </button>
          <button
            onClick={() => setConsent(!consent)}
            className="px-4 py-2 border border-gray-300 rounded-lg"
          >
            Preferences
          </button>
        </div>
      </div>
    </div>
  );
};

export default GdprConsent;
