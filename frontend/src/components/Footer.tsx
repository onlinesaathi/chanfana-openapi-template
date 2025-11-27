
import { Facebook, Twitter, Youtube, Instagram, Mail, Phone, MapPin } from "lucide-react";

const footerLinks = [
  {
    title: "ABOUT",
    links: [
      { name: "Contact Us", url: "#" },
      { name: "About Us", url: "#" },
      { name: "Careers", url: "#" },
      { name: "Flipkart Stories", url: "#" },
      { name: "Press", url: "#" },
    ],
  },
  {
    title: "HELP",
    links: [
      { name: "Payments", url: "#" },
      { name: "Shipping", url: "#" },
      { name: "Cancellation & Returns", url: "#" },
      { name: "FAQ", url: "#" },
      { name: "Report Infringement", url: "#" },
    ],
  },
  {
    title: "CONSUMER POLICY",
    links: [
      { name: "Return Policy", url: "#" },
      { name: "Terms Of Use", url: "#" },
      { name: "Security", url: "#" },
      { name: "Privacy", url: "#" },
      { name: "Sitemap", url: "#" },
    ],
  },
  {
    title: "SOCIAL",
    links: [
      { name: "Facebook", url: "#", icon: <Facebook size={16} /> },
      { name: "Twitter", url: "#", icon: <Twitter size={16} /> },
      { name: "YouTube", url: "#", icon: <Youtube size={16} /> },
      { name: "Instagram", url: "#", icon: <Instagram size={16} /> },
    ],
  },
];

const Footer = () => {
  return (
    <footer className="bg-[#172337] text-white pt-10 pb-6">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Main Links */}
          {footerLinks.map((section) => (
            <div key={section.title}>
              <h4 className="text-sm font-medium text-gray-400 mb-3">{section.title}</h4>
              <ul className="space-y-2">
                {section.links.map((link) => (
                  <li key={link.name}>
                    <a 
                      href={link.url} 
                      className="text-xs text-gray-300 hover:underline flex items-center"
                    >
                      {link.icon && <span className="mr-2">{link.icon}</span>}
                      {link.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          {/* Contact Info */}
          <div>
            <h4 className="text-sm font-medium text-gray-400 mb-3">CONTACT</h4>
            <ul className="space-y-3">
              <li className="flex items-start">
                <MapPin size={16} className="mr-2 mt-0.5 flex-shrink-0 text-gray-400" />
                <span className="text-xs text-gray-300">
                  Flipkart Internet Private Limited,
                  Buildings Alyssa, Begonia &
                  Clove Embassy Tech Village,
                  Outer Ring Road, Devarabeesanahalli Village,
                  Bengaluru, 560103,
                  Karnataka, India
                </span>
              </li>
              <li>
                <a href="mailto:support@flipkart.com" className="text-xs text-gray-300 hover:underline flex items-center">
                  <Mail size={16} className="mr-2 text-gray-400" />
                  support@flipkart.com
                </a>
              </li>
              <li>
                <a href="tel:1800202929" className="text-xs text-gray-300 hover:underline flex items-center">
                  <Phone size={16} className="mr-2 text-gray-400" />
                  1800 202 9898
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-10 pt-6 border-t border-gray-700 text-xs text-gray-400 flex flex-col md:flex-row justify-between items-center">
          <p>&copy; 2023 Flipkart Clone. All rights reserved.</p>
          <p className="mt-2 md:mt-0">This is a demo website for educational purposes only.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
