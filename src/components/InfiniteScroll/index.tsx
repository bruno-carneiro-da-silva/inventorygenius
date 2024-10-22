import { useEffect } from "react";

const useInfiniteScroll = (callback: () => void) => {
  useEffect(() => {
    const handleScroll = () => {
      const { scrollTop, scrollHeight, clientHeight } =
        document.documentElement;
      if (scrollTop + clientHeight >= scrollHeight) {
        callback();
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [callback]);
};

const InfiniteScroll = ({ onIntersect }: { onIntersect: () => void }) => {
  useInfiniteScroll(onIntersect);

  return null;
};

export default InfiniteScroll;
