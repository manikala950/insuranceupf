import { Mail, Phone, MapPin, Linkedin, Twitter, Facebook } from "lucide-react";
import { NavLink } from "./NavLink";
import logo from "@/assets/logo.png";

const Footer = () => {
  return (
    <footer className="bg-foreground text-background">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div>
            <img src={logo} alt="UPLIFE India" className="h-12 w-auto mb-4 brightness-0 invert" />
            <p className="text-background/80 text-sm mb-4">
              Supporting families through the challenging process of death policy claims with compassion and expertise.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-semibold text-lg mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <NavLink to="/about" className="text-background/80 hover:text-primary transition-colors text-sm">
                  About Us
                </NavLink>
              </li>
              <li>
                <NavLink to="/services" className="text-background/80 hover:text-primary transition-colors text-sm">
                  Our Services
                </NavLink>
              </li>
              <li>
                <NavLink to="/process" className="text-background/80 hover:text-primary transition-colors text-sm">
                  How It Works
                </NavLink>
              </li>
              <li>
                <NavLink to="/contact" className="text-background/80 hover:text-primary transition-colors text-sm">
                  Contact Us
                </NavLink>
              </li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="font-semibold text-lg mb-4">Our Services</h3>
            <ul className="space-y-2 text-sm text-background/80">
              <li>Policy Claim Assistance</li>
              <li>Document Preparation</li>
              <li>Insurance Consultation</li>
              <li>Legal Support</li>
              <li>End-to-End Processing</li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="font-semibold text-lg mb-4">Contact Us</h3>
            <ul className="space-y-3">
              <li className="flex items-start space-x-3">
                <MapPin className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                <span className="text-sm text-background/80">
                  123 Business District, Mumbai, Maharashtra 400001, India
                </span>
              </li>
              <li className="flex items-center space-x-3">
                <Phone className="h-5 w-5 text-primary flex-shrink-0" />
                <span className="text-sm text-background/80">+91 22 1234 5678</span>
              </li>
              <li className="flex items-center space-x-3">
                <Mail className="h-5 w-5 text-primary flex-shrink-0" />
                <span className="text-sm text-background/80">support@uplifeindia.com</span>
              </li>
            </ul>

            {/* Social Media */}
            <div className="flex space-x-4 mt-6">
              <a href="#" className="text-background/80 hover:text-primary transition-colors" aria-label="LinkedIn">
                <Linkedin className="h-5 w-5" />
              </a>
              <a href="#" className="text-background/80 hover:text-primary transition-colors" aria-label="Twitter">
                <Twitter className="h-5 w-5" />
              </a>
              <a href="#" className="text-background/80 hover:text-primary transition-colors" aria-label="Facebook">
                <Facebook className="h-5 w-5" />
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-background/20 mt-8 pt-8 text-center">
          <p className="text-sm text-background/60">
            © {new Date().getFullYear()} UPLIFE India Pvt Ltd. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
