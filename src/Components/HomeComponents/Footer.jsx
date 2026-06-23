import React from "react";
import {
  FaFacebookF,
  FaTwitter,
  FaInstagram,
  FaLinkedinIn,
} from "react-icons/fa";
import Container from "../CommonComponents/Container";
import qr from "../../assets/Qr Code.png";
import { LuSendHorizontal } from "react-icons/lu";





const Footer = () => {
  return (
    
    <footer className="bg-black text-white pt-16">
      <Container>
      <div className="max-w-6xl mx-auto">

        <div className="grid grid-cols-1 md:grid-cols-5 gap-10">
          <div>
            <h3 className="text-2xl font-semibold mb-5">
              Exclusive
            </h3>
            <h4 className="mb-3 font-medium">
              Subscribe
            </h4>
            <p className="text-sm mb-4">
              Get 10% off your first order
            </p>

            <div className="border border-white flex items-center px-3 py-2">
              <input type="text" placeholder="Enter your email" className="bg-transparent outline-none w-full text-sm" />
              <button>
                <LuSendHorizontal />
              </button>

            </div>

          </div>


         

          <div>
            <h3 className="font-medium mb-5">
              Support
            </h3>
            <p className="text-sm mb-2">
              111 Bijoy sarani, Dhaka,
            </p>
            <p className="text-sm mb-2">
              DH 1515, Bangladesh.
            </p>
            <p className="text-sm mb-2">
              exclusive@gmail.com
            </p>
            <p className="text-sm">
              +88015-88888-9999
            </p>

          </div>



         

          <div>

            <h3 className="font-medium mb-5">
              Account
            </h3>

            <ul className="space-y-2 text-sm">

              <li>My Account</li>
              <li>Login / Register</li>
              <li>Cart</li>
              <li>Wishlist</li>
              <li>Shop</li>

            </ul>

          </div>



          

          <div>

            <h3 className="font-medium mb-5">
              Quick Link
            </h3>

            <ul className="space-y-2 text-sm">

              <li>Privacy Policy</li>
              <li>Terms Of Use</li>
              <li>FAQ</li>
              <li>Contact</li>

            </ul>

          </div>



         

          <div>

            <h3 className="font-medium mb-5">
              Download App
            </h3>

            <p className="text-xs mb-4">
              Save $3 with App New User Only
            </p>

            <div className="flex gap-3 mb-5">

              <div className="w-20 h-20 bg-white">
                <img
                    src={qr}
                    alt="QR Code"
                    className="w-20 h-20"
                  />
              </div>

              <div className="space-y-2">

                <div className="bg-gray-800 px-4 py-2 rounded text-xs">
                  Google Play
                </div>

                <div className="bg-gray-800 px-4 py-2 rounded text-xs">
                  App Store
                </div>

              </div>

            </div>


            <div className="flex gap-5 text-lg">

              <FaFacebookF />
              <FaTwitter />
              <FaInstagram />
              <FaLinkedinIn />

            </div>

          </div>

        </div>



        <div className="border-t border-gray-800 mt-12 py-6 text-center">

          <p className="text-gray-500 text-sm">
            © Copyright Rimel 2022. All right reserved
          </p>

        </div>

      </div>
      </Container>


    </footer>
    
  );
};

export default Footer;