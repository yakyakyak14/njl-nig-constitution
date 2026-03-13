import { motion } from "framer-motion";

const Footer = () => {
  return (
    <footer className="relative z-10 border-t border-border py-6 bg-background">
      <div className="container text-center text-sm text-muted-foreground space-y-1">
        <p>
          Developed by{" "}
          <motion.span
            className="font-bold text-foreground"
            animate={{ y: [0, -3, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          >
            SirHope
          </motion.span>{" "}
          of{" "}
          <motion.span
            className="font-bold text-foreground"
            animate={{ y: [0, -3, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut", delay: 0.3 }}
          >
            WYN-Tech
          </motion.span>
        </p>
      </div>
    </footer>
  );
};

export default Footer;
