import { FaFacebook, FaTwitter, FaInstagram } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-gradient-to-r from-sky-50 text-gray-800 py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-center">
          <div className="text-center md:text-left">
            <h3 className="text-xl font-semibold mb-2">Your Company Name</h3>
            <p className="text-sm">
              &copy; {new Date().getFullYear()} All rights reserved.
            </p>
          </div>
          <nav className="text-center">
            <ul className="flex flex-wrap justify-center space-x-6">
              <li>
                <a
                  href="/about"
                  className="hover:text-blue-600 transition-colors duration-300"
                >
                  About
                </a>
              </li>
              <li>
                <a
                  href="/contact"
                  className="hover:text-blue-600 transition-colors duration-300"
                >
                  Contact
                </a>
              </li>
              <li>
                <a
                  href="/privacy"
                  className="hover:text-blue-600 transition-colors duration-300"
                >
                  Privacy Policy
                </a>
              </li>
            </ul>
          </nav>
          <div className="flex justify-center md:justify-end space-x-6">
            <a
              href="#"
              className="text-2xl hover:text-blue-600 transition-colors duration-300"
              aria-label="Facebook"
            >
              <FaFacebook />
            </a>
            <a
              href="#"
              className="text-2xl hover:text-blue-600 transition-colors duration-300"
              aria-label="Twitter"
            >
              <FaTwitter />
            </a>
            <a
              href="#"
              className="text-2xl hover:text-blue-600 transition-colors duration-300"
              aria-label="Instagram"
            >
              <FaInstagram />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
