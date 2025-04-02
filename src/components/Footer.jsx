import { motion } from "framer-motion";

const Footer = () => {
  return (
    <motion.footer 
      className="w-full p-[4%] mt-3"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="container mx-auto px-2">
        <div className="flex flex-col items-center space-y-4">
          {/* First Section - Want to share more memories text */}
          <motion.p 
            className="text-[14px] sm:text-lg font-medium text-gray-600"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }} 
          >
            Want to share more memories? Keep uploading!
          </motion.p>

          {/* Second Section - Links */}
          <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-4">
            <motion.button 
              className="text-sm sm:text-base text-gray-600 hover:text-[#c300f9] transition-colors"
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.2 }}
            >
              Privacy Policy
            </motion.button>
            
            <div className="hidden sm:block text-gray-300">|</div>
            <span className="block sm:hidden text-gray-400">•</span>
            
            <motion.button 
              className="text-sm sm:text-base text-gray-600 hover:text-[#c300f9] transition-colors"
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.2 }}
            >
              Terms of Service
            </motion.button>
            
            <div className="hidden sm:block text-gray-300">|</div>
            <span className="block sm:hidden text-gray-400">•</span>
            
            <motion.button 
              className="text-sm sm:text-base text-gray-600 hover:text-[#c300f9] transition-colors"
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.2 }}
            >
              Cookie Policy
            </motion.button>
          </div>

          {/* Third Section - Copyright */}
          <p className="text-xs sm:text-sm text-gray-800 font-medium">
            © {new Date().getFullYear()}. <span className="text-[#c300f9] font-semibold">Moooments</span>
          </p>
        </div>
      </div>
    </motion.footer>
  );
};

export default Footer;
