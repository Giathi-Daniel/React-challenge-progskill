import { useEffect, useState } from "react";
import { sendEmailVerification, applyActionCode } from "firebase/auth";
import { auth } from "../../firebase";

const EmailVerification = () => {
  const [status, setStatus] = useState("idle");
  const [error, setError] = useState("");

  const handleResend = async () => {
    try {
      await sendEmailVerification(auth.currentUser);
      setStatus("sent");
    } catch (error) {
      setError(error.message);
    }
  };

  useEffect(() => {
    const verifyEmail = async () => {
      const urlParams = new URLSearchParams(window.location.search);
      const oobCode = urlParams.get("oobCode");
      if (oobCode) {
        try {
          await applyActionCode(auth, oobCode);
          setStatus("verified");
        } catch (error) {
          setError("Invalid verification link", error);
        }
      }
    };

    verifyEmail();
  }, []);

  return (
    <div className="max-w-md p-6 mx-auto bg-white dark:bg-gray-800 rounded-xl">
      {status === "verified" ? (
        <div className="text-green-600">Email successfully verified!</div>
      ) : (
        <>
          <h2 className="mb-4 text-xl font-bold">Verify Your Email</h2>
          {error && <div className="mb-4 text-red-600">{error}</div>}
          <button
            onClick={handleResend}
            className="px-4 py-2 text-white bg-blue-600 rounded-lg"
          >
            Resend Verification Email
          </button>
        </>
      )}
    </div>
  );
};

export default EmailVerification;
