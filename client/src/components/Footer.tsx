const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="py-10 bg-background border-t border-gray-800">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-6 md:mb-0">
            <a href="#hero" className="text-white font-display text-2xl font-bold tracking-wider">
              GR<span className="text-primary">III</span>
            </a>
          </div>
          
          <div className="text-center md:text-right">
            <p className="text-gray-400">&copy; {currentYear} Gary Robinson III. All rights reserved.</p>
            <p className="text-gray-500 text-sm mt-1">Designed with precision and excellence.</p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
