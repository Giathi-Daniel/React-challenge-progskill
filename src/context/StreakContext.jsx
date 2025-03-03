import { createContext, useContext, useEffect, useState } from "react";

const StreakContext = createContext();

const getLocalMidnight = () => {
  const now = new Date();
  return new Date(now.getFullYear(), now.getMonth(), now.getDate()).getTime();
};

export function StreakProvider({ children }) {
  const [streakData, setStreakData] = useState(() => {
    try {
      const saved = localStorage.getItem("streakData");

      return saved
        ? JSON.parse(saved)
        : {
            current: 0,
            longest: 0,
            lastCompleted: null,
          };
    } catch (e) {
      console.error("Failed to initialize streak data: ", e);
      return { current: 0, longest: 0, lastCompleted: null };
    }
  });

  const updateStreak = () => {
    const today = getLocalMidnight();

    setStreakData((prev) => {
      let newStreak = prev.current;

      if (prev.lastCompleted === today) return prev;

      if (prev.lastCompleted === today - 86400000) {
        newStreak++;
      } else {
        newStreak = 1;
      }

      return {
        current: newStreak,
        longest: Math.max(newStreak, prev.longest),
        lastCompleted: today,
      };
    });
  };

  useEffect(() => {
    try {
      localStorage.setItem("streakData", JSON.stringify(streakData));
    } catch (error) {
      console.error("Failed to persist streak data:", error);
    }
  }, [streakData]);

  return (
    <StreakContext.Provider value={{ ...streakData, updateStreak }}>
      {children}
    </StreakContext.Provider>
  );
}

export const useStreak = () => {
  const context = useContext(StreakContext);

  if (!context) {
    throw new Error("useStreak must be used within a StreakProvider");
  }

  return context;
};
