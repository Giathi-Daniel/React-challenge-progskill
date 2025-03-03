import { useStreak } from "../context/StreakContext";
import { motion } from "framer-motion";

export const StreakTracker = () => {
  const { current, longest } = useStreak();

  return (
    <div className="flex gap-6 p-6 bg-white shadow-xl dark:bg-gray-800 rounded-2xl">
      <div className="text-center">
        <motion.div
          key={current}
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="text-4xl font-bold text-blue-600 dark:text-blue-400"
        >
          {current}
        </motion.div>

        <div className="mt-1 text-sm text-gray-600 dark:text-gray-300">
          Current Streak
        </div>
      </div>

      <div className="border-gray-200 border-1 dark:border-gray-600" />
      <div className="text-center">
        <div className="text-4xl font-bold text-purple-600 dark:text-purple-400">
          {longest}
        </div>

        <div className="mt-1 text-sm text-gray-600 dark:text-gray-300">
          Longest Streak
        </div>
      </div>
    </div>
  );
};
