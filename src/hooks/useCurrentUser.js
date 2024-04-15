import { useSelector } from "react-redux";

// Custom hook to access the current user from Redux state
const useCurrentUser = () => {
  // Retrieve currentUser from Redux store using useSelector hook
  const currentUser = useSelector((state) => state.user.currentUser);
  return currentUser; // Return the currentUser value
};

export default useCurrentUser; // Export the custom hook for use in components
