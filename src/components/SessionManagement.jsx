import { useEffect, useState } from "react";
import { getAuth, revokeRefreshTokens } from "firebase/auth";
import { collection, query, where, onSnapshot } from "firebase/firestore";
import { db } from "../firebase";

const SessionManagement = () => {
  const [sessions, setSessions] = useState([]);
  const auth = getAuth();

  useEffect(() => {
    const q = query(
      collection(db, "sessions"),
      where("userId", "==", auth.currentUser.uid)
    );
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const sessionsData = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setSessions(sessionsData);
    });

    return () => unsubscribe();
  }, [auth.currentUser.uid]);

  const revokeSession = async (sessionId) => {
    await revokeRefreshTokens(auth, sessionId);
  };

  return (
    <div className="p-6 bg-white dark:bg-gray-800 rounded-xl">
      <h2 className="mb-6 text-xl font-bold">Active Sessions</h2>
      <div className="space-y-4">
        {sessions.map((session) => (
          <div
            key={session.id}
            className="flex items-center justify-between p-4 border rounded-lg"
          >
            <div>
              <p className="font-medium">{session.deviceInfo}</p>
              <p className="text-sm text-gray-600">
                {new Date(session.createdAt).toLocaleString()}
              </p>
              <p className="text-sm">IP: {session.ipAddress}</p>
            </div>
            <button
              onClick={() => revokeSession(session.id)}
              className="px-4 py-2 text-white bg-red-600 rounded-lg hover:bg-red-700"
            >
              Revoke
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SessionManagement;
