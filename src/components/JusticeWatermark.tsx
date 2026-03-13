import { motion } from "framer-motion";
import justiceLogo from "@/assets/justice-logo.png";

const JusticeWatermark = () => {
  return (
    <div className="fixed inset-0 pointer-events-none z-0 flex items-center justify-center overflow-hidden">
      <motion.img
        src={justiceLogo}
        alt="Ministry of Justice"
        className="w-[500px] h-[500px] opacity-[0.04]"
        animate={{
          scale: [1, 1.05, 1],
          rotate: [0, 1, -1, 0],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
    </div>
  );
};

export default JusticeWatermark;
