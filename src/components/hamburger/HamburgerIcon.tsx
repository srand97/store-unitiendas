import { motion } from "framer-motion";

export const HamburgerIcon = ({ isOpen }: { isOpen: boolean }) => (
  <svg width="23" height="23" viewBox="0 0 23 23">
    <motion.path
      fill="transparent"
      strokeWidth="3"
      stroke="white"
      strokeLinecap="round"
      animate={isOpen ? { d: "M 3 16.5 L 17 2.5" } : { d: "M 2 2.5 L 20 2.5" }}
    />
    <motion.path
      fill="transparent"
      strokeWidth="3"
      stroke="white"
      strokeLinecap="round"
      d="M 2 9.423 L 20 9.423"
      animate={{ opacity: isOpen ? 0 : 1 }}
    />
    <motion.path
      fill="transparent"
      strokeWidth="3"
      stroke="white"
      strokeLinecap="round"
      animate={isOpen ? { d: "M 3 2.5 L 17 16.5" } : { d: "M 2 16.346 L 20 16.346" }}
    />
  </svg>
);
