import { useState } from 'react';
import { useAuth } from '../hooks/useAuth'; 
import SessionManagement from './SessionManagement'; 

const SessionManagementModal = () => {
  const { user } = useAuth(); // Get the user from the context
  const [isOpen, setIsOpen] = useState(false);

  const toggleModal = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      {/* Trigger button */}
      <button
        onClick={toggleModal}
        className="px-6 py-2 text-white transition duration-300 bg-blue-600 rounded-lg hover:bg-blue-700"
      >
        Manage Active Sessions
      </button>

      {/* Modal Overlay */}
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-700 bg-opacity-50">
          <div className="w-full max-w-lg p-6 bg-white rounded-lg dark:bg-gray-800">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-2xl font-semibold text-gray-900 dark:text-white">
                Active Sessions
              </h2>
              <button
                onClick={toggleModal}
                className="text-gray-500 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white"
              >
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path
                    d="M6 18L18 6M6 6l12 12"
                    className="stroke-current"
                  ></path>
                </svg>
              </button>
            </div>

            {user ? (
              <SessionManagement />
            ) : (
              <div className="text-center text-gray-500">
                <p>You need to be logged in to manage your sessions.</p>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default SessionManagementModal;