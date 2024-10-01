import { useDispatch } from 'react-redux'; // Import hooks for Redux state management
import { setScrollPosition } from '@/store/scrollStore'; // Import action creator to set scroll position in the Redux store
import { useEffect } from 'react'; // Import useEffect hook for managing side effects in functional components

export const useScrollManager = () => {
  const dispatch = useDispatch(); // Get the dispatch function from the Redux store

  useEffect(() => {
    // Restore scroll position when the component mounts
    const savedScrollPosition = localStorage.getItem('scrollPosition'); // Retrieve saved scroll position from local storage
    if (savedScrollPosition) {
      // If a saved scroll position exists, dispatch it to the store and scroll to that position
      dispatch(setScrollPosition(Number(savedScrollPosition))); // Dispatch the saved scroll position to the Redux store
      window.scrollTo(0, Number(savedScrollPosition)); // Scroll to the saved position
    }

    const handleScroll = () => {
      // Save current scroll position on scroll event
      const currentScrollPosition = window.scrollY; // Get the current vertical scroll position
      dispatch(setScrollPosition(currentScrollPosition)); // Dispatch the current scroll position to the Redux store
      localStorage.setItem('scrollPosition', currentScrollPosition.toString()); // Save the current scroll position to local storage
    };

    window.addEventListener('scroll', handleScroll); // Attach the scroll event listener
    return () => {
      window.removeEventListener('scroll', handleScroll); // Clean up the event listener on component unmount
    };
  }, [dispatch]); // Effect depends on dispatch function
};
