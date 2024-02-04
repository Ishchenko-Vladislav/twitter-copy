import { useState, useEffect } from "react";

interface ScrollDirection {
  isScrollingDown: boolean;
  isScrollingUp: boolean;
}

const useScrollDirection = (): ScrollDirection => {
  const [scrollDirection, setScrollDirection] = useState<ScrollDirection>({
    isScrollingDown: false,
    isScrollingUp: false,
  });

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollPos = window.pageYOffset;

      setScrollDirection((prev) => ({
        isScrollingDown: currentScrollPos > prevScrollPos,
        isScrollingUp: currentScrollPos < prevScrollPos,
      }));

      prevScrollPos = currentScrollPos;
    };

    let prevScrollPos = window.pageYOffset;

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return scrollDirection;
};

export default useScrollDirection;
