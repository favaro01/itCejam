import { useEffect } from "react";
import { useLocation } from "react-router-dom";

export default function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    const container = document.getElementById("main-scroll-container");

    if (container) {
      container.scrollTo({
        top: 0,
        left: 0,
        behavior: "instant",
      });
    } else {
      window.scrollTo(0, 0);
    }
  }, [pathname]); // Rodar toda vez que a URL mudar

  return null;
}
