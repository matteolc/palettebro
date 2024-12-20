import { Link, NavLink } from "@remix-run/react";
import { Button, buttonVariants } from "./ui/button";
import { motion, useMotionValueEvent, useScroll } from "framer-motion";
import { useState } from "react";
import clsx from "clsx";
import { RiHeartFill } from "@remixicon/react";
import { Separator } from "./ui/separator";

const NavigationHeader = () => {
  const { scrollY } = useScroll();
  const [isScrolled, setIsScrolled] = useState(false);

  useMotionValueEvent(scrollY, "change", (current) => {
    const diff = current - (scrollY.getPrevious() ?? 0);
    if (current === 0) {
      setIsScrolled(false);
    } else if (current > 0 && !isScrolled) {
      setIsScrolled(true);
    }
  });

  return (
    <motion.header
      layout
      initial={{ opacity: 0, scale: 0 }}
      animate={{ opacity: 1, scale: 1 }}
      className={clsx(
        "left-0 py-1 fixed inset-x-3 top-4 z-50 mx-auto flex justify-center overflow-hidden rounded-lg border transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1.03)] will-change-transform",
        isScrolled
          ? "max-w-3xl border-neutral-200/60 bg-background/95 shadow-xl shadow-black/5"
          : "border-transparent bg-white/0",
      )}
    >
      <div
        className={clsx(isScrolled ? "border-none" : "", "container-wrapper")}
      >
        <motion.nav
          className={clsx(
            "items-center justify-between container w-full flex gap-12",
          )}
        >
          <Link to="/">
            <h2 className="cursor-pointer title-gradient text-3xl font-bold leading-relaxed bg-gradient-to-r text-transparent bg-clip-text">
              🌈 Palettebruh
            </h2>
          </Link>
          <div className="flex gap-4 items-center">
            <ul className="flex gap-x-2 text-lg font-semibold items-center bg-primary/10 px-2 py-0.5 rounded-lg border border-primary-400/10">
              {["palette", "examples", "blocks"].map((item) => (
                <NavLink
                  to={`/${item}`}
                  key={item}
                  className={({ isActive, isPending }) =>
                    clsx(
                      isActive
                        ? "bg-primary-50/90 hover:bg-primary-50 text-primary-900"
                        : "text-muted-foreground hover:text-primary-800",
                      "px-2 py-1 rounded-sm text-sm font-medium transition-colors",
                    )
                  }
                >
                  {item}
                </NavLink>
              ))}
              <Separator
                orientation="vertical"
                className="mx-1 hidden h-4 md:flex"
              />
                                
              <NavLink
                to="/favourites"
                className={({ isActive, isPending }) =>
                  clsx(
                    
                        buttonVariants({ variant: "ghost", size: "sm" }),
                        "justify-start mx-0 cursor-pointer pl-1.5",
                                      
                    isActive
                      ? "text-secondary-800 hover:bg-transparent hover:text-secondary-600"
                      : "hover:text-secondary-800 hover:animate-pulse hover:bg-transparent",
                    isPending ? "animate-pulse" : "",
                    "text-secondary-600 text-sm font-medium transition-colors",
                  )
                }
              >         
                <RiHeartFill className="inline-block size-5" />
              </NavLink>
            </ul>
          </div>
        </motion.nav>
      </div>
    </motion.header>
  );
};

export { NavigationHeader };
