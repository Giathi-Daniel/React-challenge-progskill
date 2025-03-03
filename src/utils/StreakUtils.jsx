export const getLocalMidnight = () => {
    const now = new Date();
    return new Date(now.getFullYear(), now.getMonth(), now.getDate()).getTime();
  };
  
export const updateStreakLogic = (prev, today) => {
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
};  