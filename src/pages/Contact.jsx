import React from "react";

const Contact = () => {
  return (
    <div className="contact-page bg-gray-50 min-h-screen flex items-center justify-center py-10">
      <div className="container max-w-6xl mx-auto px-6">
        <h1 className="text-4xl font-bold text-center mb-12 text-gray-800">Contact Us</h1>
        
        <div className="contact-content grid md:grid-cols-2 gap-10 bg-white p-8 rounded-2xl shadow-lg">
          {/* Contact Info */}
          <div className="contact-info space-y-6">
            <h2 className="text-2xl font-semibold text-gray-700">Get in Touch</h2>
            <p className="text-gray-600">We're here to help! Reach out to us through any of the following channels:</p>
            
            <div className="space-y-4">
              <div className="p-4 border rounded-xl hover:shadow-md transition">
                <h3 className="text-lg font-semibold text-gray-800">Phone</h3>
                <p className="text-gray-600">+233 (555) 123-4567</p>
              </div>
              <div className="p-4 border rounded-xl hover:shadow-md transition">
                <h3 className="text-lg font-semibold text-gray-800">Email</h3>
                <p className="text-gray-600">support@bankly.com</p>
              </div>
              <div className="p-4 border rounded-xl hover:shadow-md transition">
                <h3 className="text-lg font-semibold text-gray-800">Address</h3>
                <p className="text-gray-600">
                  123 Banking Street<br />Financial District<br />Accra, MP 10001
                </p>
              </div>
            </div>
          </div>
          
          {/* Contact Form */}
          <div className="contact-form">
            <h2 className="text-2xl font-semibold text-gray-700 mb-6">Send us a Message</h2>
            <form className="space-y-6">
              <div className="form-group">
                <label className="block text-gray-600 mb-2">Name</label>
                <input 
                  type="text" 
                  placeholder="Your name"
                  className="w-full p-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div className="form-group">
                <label className="block text-gray-600 mb-2">Email</label>
                <input 
                  type="email" 
                  placeholder="Your email"
                  className="w-full p-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div className="form-group">
                <label className="block text-gray-600 mb-2">Message</label>
                <textarea 
                  placeholder="Your message"
                  rows="5"
                  className="w-full p-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                ></textarea>
              </div>
              <button 
                type="submit" 
                className="w-full bg-blue-600 text-white py-3 rounded-xl hover:bg-blue-700 transition font-semibold shadow-md"
              >
                Send Message
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
