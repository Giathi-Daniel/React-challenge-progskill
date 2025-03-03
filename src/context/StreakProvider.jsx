import { createContext, useContext, useEffect, useState } from "react";
import PropTypes from 'prop-types';
import { getLocalMidnight, updateStreakLogic } from '../utils/StreakUtils';

const StreakContext = createContext();

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

    setStreakData((prev) => updateStreakLogic(prev, today)); 
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

StreakProvider.propTypes = {]
  children: PropTypes.node.isRequired,
};

export const useStreak = () => {
  const context = useContext(StreakContext);

  if (!context) {
    throw new Error("useStreak must be used within a StreakProvider");
  }

  return context;
};
