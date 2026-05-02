import React from 'react';
import { Link } from 'react-router-dom';

import {
  Mail,
  Phone
} from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-luxury-navy text-white pt-24 pb-12 px-4">

      <div className="max-w-7xl mx-auto">

        {/* Top Section */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-16 mb-20">

          {/* Brand */}
          <div className="md:col-span-4">

            <Link
              to="/"
              className="text-3xl font-serif font-bold mb-8 block"
            >
              LUXE
              <span className="text-luxury-gold font-light">
                STORE
              </span>
            </Link>

            <p className="text-slate-400 font-light leading-relaxed mb-8">
              Est. 2026. Dedicated to timeless beauty and exceptional craftsmanship.
              We believe in quality that endures.
            </p>

            {/* Icons */}
            <div className="flex space-x-6">

              <div className="w-10 h-10 rounded-full border border-luxury-gold/40 flex items-center justify-center hover:bg-luxury-gold hover:text-black transition-all duration-300 cursor-pointer">
                <Mail className="w-5 h-5" />
              </div>

              <div className="w-10 h-10 rounded-full border border-luxury-gold/40 flex items-center justify-center hover:bg-luxury-gold hover:text-black transition-all duration-300 cursor-pointer">
                <Phone className="w-5 h-5" />
              </div>

            </div>

          </div>

          {/* Concierge */}
          <div className="md:col-span-2">

            <h4 className="text-luxury-gold text-xs font-bold tracking-[0.2em] uppercase mb-8">
              Concierge
            </h4>

            <ul className="space-y-4 text-sm font-light text-slate-300">

              <li>
                <Link
                  to="/shipping"
                  className="hover:text-white transition-colors"
                >
                  Shipping
                </Link>
              </li>

              <li>
                <Link
                  to="/returns"
                  className="hover:text-white transition-colors"
                >
                  Returns
                </Link>
              </li>

              <li>
                <Link
                  to="/faq"
                  className="hover:text-white transition-colors"
                >
                  FAQ
                </Link>
              </li>

              <li>
                <Link
                  to="/contact"
                  className="hover:text-white transition-colors"
                >
                  Contact Us
                </Link>
              </li>

            </ul>

          </div>

          {/* Brand */}
          <div className="md:col-span-2">

            <h4 className="text-luxury-gold text-xs font-bold tracking-[0.2em] uppercase mb-8">
              The Brand
            </h4>

            <ul className="space-y-4 text-sm font-light text-slate-300">

              <li>
                <Link
                  to="/about"
                  className="hover:text-white transition-colors"
                >
                  Our Story
                </Link>
              </li>

              <li>
                <Link
                  to="/sustainability"
                  className="hover:text-white transition-colors"
                >
                  Sustainability
                </Link>
              </li>

              <li>
                <Link
                  to="/careers"
                  className="hover:text-white transition-colors"
                >
                  Careers
                </Link>
              </li>

            </ul>

          </div>

          {/* Newsletter */}
          <div className="md:col-span-4">

            <h4 className="text-luxury-gold text-xs font-bold tracking-[0.2em] uppercase mb-8">
              The Newsletter
            </h4>

            <p className="text-sm font-light text-slate-300 mb-6">
              Receive private invitations and seasonal updates.
            </p>

            <div className="flex border-b border-luxury-gold/50 py-2">

              <input
                type="email"
                placeholder="EMAIL ADDRESS"
                className="bg-transparent border-none w-full text-xs tracking-widest focus:outline-none placeholder:text-slate-600"
              />

              <button
                className="text-luxury-gold text-xs font-bold tracking-widest hover:text-white transition-colors duration-300"
              >
                JOIN
              </button>

            </div>

          </div>

        </div>

        {/* Bottom */}
        <div className="border-t border-white/10 pt-12 text-center">

          <p className="text-[10px] tracking-[0.3em] text-slate-500 uppercase">
            © 2026 LUXESTORE INTERNATIONAL. ALL RIGHTS RESERVED.
          </p>

        </div>

      </div>

    </footer>
  );
};

export default Footer;