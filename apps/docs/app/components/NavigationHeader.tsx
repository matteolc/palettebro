import { Link, NavLink } from "@remix-run/react";
import { Button } from "./ui/button";
import { motion, useMotionValueEvent, useScroll } from "framer-motion";
import { useState } from "react";
import clsx from "clsx";

const NavigationHeader = () => {
    const { scrollY } = useScroll();
    const [isScrolled, setIsScrolled] = useState(false);

    useMotionValueEvent(scrollY, "change", (current) => {
        const diff = current - (scrollY.getPrevious() ?? 0)
        if (current === 0) {
            setIsScrolled(false);
        } else if (current > 0 && !isScrolled) {
            // Set scrolled state as soon as we scroll down
            setIsScrolled(true);
        }
    })

    return (
        <motion.header
            layout
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            className={clsx("fixed inset-x-3 top-4 z-50 mx-auto flex transform-gpu justify-center overflow-hidden rounded-xl border py-2 transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1.03)] will-change-transform", isScrolled ? "px-3 max-w-3xl border-muted bg-background/80 shadow-xl shadow-black/5" : "border-transparent px-6 bg-white/0")}>
            <motion.nav className="w-full max-w-full mx-auto flex items-center justify-between">
                <Link to="/">
                    <h2 className="cursor-pointer title-gradient text-4xl font-bold leading-relaxed bg-gradient-to-r text-transparent bg-clip-text">🌈 Palettebruh</h2>
                </Link>
                <ul className="flex gap-4 text-lg font-semibold items-baseline">
                    <NavLink to="/palette" className="hover:text-primary">
                        <Button variant="outline">
                            Palette
                        </Button>
                    </NavLink>
                    <NavLink to="/shadcdn" className="hover:text-primary"><Button variant="outline">Components</Button></NavLink>
                </ul>
            </motion.nav>
        </motion.header>
    );
}

export { NavigationHeader };