import { useEffect, useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

export const useToggle = (intialState = false) => {
   const [toggle, setToggle] = useState(intialState);

   const handleToggle = () => {
      setToggle((pve) => !pve);
   };

   return [toggle, handleToggle];
};

export const useNetwork = () => {
   const [isOnline, setIsOnline] = useState(navigator.onLine);

   const handleOnline = () => {
      setIsOnline(true);
   };

   const handleOffline = () => {
      setIsOnline(false);
   };

   useEffect(() => {
      // Set initial online status
      setIsOnline(navigator.onLine);

      // Event listeners for online and offline events
      window.addEventListener("online", handleOnline);
      window.addEventListener("offline", handleOffline);

      // Cleanup: remove event listeners
      return () => {
         window.removeEventListener("online", handleOnline);
         window.removeEventListener("offline", handleOffline);
      };
   }, []); // Empty dependency array to ensure the effect runs only once during component mount

   return isOnline;
};

export const useMessage = (error, message, redirectPath) => {
   const navigate = useNavigate();

   useEffect(() => {
      if (error) {
         toast.error(error);
      }
      if (message) {
         toast.success(message);
         if (redirectPath) {
            navigate(redirectPath);
         }
      }
   }, [error, message, navigate, redirectPath]);
};
export const useMode = (intialState) => {
   const [mode, setMode] = useState(intialState);
   const handleOpen = () => {
      setMode(true);
   };
   const handleClose = () => {
      setMode(false);
   };

   return [mode, handleOpen, handleClose];
};

export const useConfig = (token) => {
   const config = {
      headers: {
         Authorization: `Bearer ${token}`
      }
   };

   return config;
};

export const useMedia = (query) => {
   const [matches, setMatches] = useState(false);

   useEffect(() => {
      const mediaQuery = window.matchMedia(query);
      if (mediaQuery.matches !== matches) {
         setMatches(mediaQuery.matches);
      }

      const handleChange = (e) => {
         setMatches(e.matches);
      };

      mediaQuery.addEventListener("change", handleChange);

      return () => {
         mediaQuery.removeEventListener("change", handleChange);
      };
   }, [query, matches]);

   return matches;
};

export const useMediaQuery = (query) => {
   const [matches, setMatches] = useState();

   useEffect(() => {
      const mediaQuery = window.matchMedia(query);
      if (mediaQuery.matches !== matches) {
         setMatches(mediaQuery.matches);
      }

      const handleChange = (e) => {
         setMatches(e.matches);
      };

      mediaQuery.addEventListener("change", handleChange);

      return () => {
         mediaQuery.removeEventListener("change", handleChange);
      };
   }, [query, matches]);

   return matches;
};

export const useScroll = () => {
   const [bottom, setBottom] = useState(true);
   const ref = useRef();
   const {} = useLocation();

   const handleGoBottom = () => {
      setBottom(true);
   };

   useEffect(() => {
      if (bottom && ref?.current) {
         ref.current.scrollTop = ref.current.scrollHeight;
      }
   }, [ref, bottom]);

   return {
      handleGoBottom,
      setBottom,
      bottom,
      ref
   };
};
