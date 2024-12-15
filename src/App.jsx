import React, { useState } from 'react';
import axios from 'axios';
import { FaInstagram, FaLinkedin, FaFacebook, FaCalendar } from 'react-icons/fa'; // Import icons

const App = () => {
  const [price, setPrice] = useState(20);
  const [showModal, setShowModal] = useState(false);
  const [email, setEmail] = useState(''); // State for email input
  const [showFullText, setShowFullText] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  const handlePurchase = () => {
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  const toggleFullText = () => {
    setShowFullText((prev) => !prev);
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    // Email validation
    if (!email || !/\S+@\S+\.\S+/.test(email)) {
      setStatus('Please enter a valid email address.');
      return;
    }

    setStatus('Sending...');  // You can show a "Sending..." status while the form is submitting.

    // Create a simple form to submit data to Formspree
    const form = e.target;

    const formData = new FormData(form);
    formData.append('email', email);  // Add the user's email to the form data

    fetch(form.action, {
      method: 'POST',
      body: formData,
    })
      .then((response) => {
        if (response.ok) {
          setEmail(''); // Clear the email input field
          alert('Your email was sent successfully!');
        } else {
          alert('Failed to send email. Please try again later.'); // Handle failure
        }
      })
      .catch(() => {
        alert('There was an error. Please try again later.'); // Catch any network errors
      });
  };


  return (
    <div className="font-sans bg-gray-50 min-h-screen flex flex-col items-center overflow-x-hidden">
      <header className="bg-gradient-to-r from-blue-600 to-blue-500 w-full py-12 shadow-lg">
        <div className="max-w-6xl mx-auto text-center text-white">
          <h1 className="text-5xl font-bold animate__animated animate__fadeIn">
            (W+H)EALTH MINDSET ACTIVATED
          </h1>
          <p className="text-xl mt-4 animate__animated animate__fadeIn animate__delay-1s">
            Get your copy now! Limited time sale: ${price}
          </p>
          <div className="mt-8 flex justify-center">
            <img
              className={`w-72 h-auto rounded-lg border-4 border-white shadow-xl transform transition-all duration-300 ${
                isHovered ? 'scale-110' : 'scale-100'
              }`}
              src="bookcover.jpeg"  // Keeping the image constant
              alt="Book Cover"
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
            />
          </div>
          <button
            className="mt-8 px-8 py-3 text-white bg-blue-700 rounded-lg hover:bg-blue-800 transition duration-300"
            onClick={handlePurchase}
          >
            Buy Now
          </button>
        </div>
      </header>

      {/* Purchase Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white rounded-lg w-96 p-6 space-y-4 shadow-lg">
            <h3 className="text-2xl font-semibold text-gray-800 text-center">
              Enter Your Email and Make Payment
            </h3>
            <p className="text-sm text-gray-600 text-center mb-4">
              Once payment is received via Zelle, you will receive the book directly to your inbox.
            </p>
            
            <form onSubmit={handleFormSubmit} action="https://formspree.io/f/mpwzgzby" method="POST" className="space-y-4">
              <input
                className="p-3 border rounded-lg w-full"
                type="email"
                name='email'
                placeholder="Enter your Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <div className="bg-blue-100 text-blue-700 p-4 rounded-md text-center text-sm">
                <p><strong>Zelle Payment Info:</strong></p>
                <p>nexus360llc@gmail.com</p>
                <p className="mt-2">After payment, you'll receive the book via email!</p>
              </div>
              <button
                className="px-6 py-3 text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition duration-300"
                type="submit"
              >
                Submit
              </button>
            </form>

            <div className="flex justify-end">
              <button
                className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
                onClick={closeModal}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Author Section */}
      <div className="author-section text-center mt-12 p-6 bg-white shadow-lg rounded-lg max-w-4xl mx-auto">
        <img
          src="author-photo.png" 
          alt="Author"
          className="w-36 h-36 rounded-full mx-auto mb-4"
        />
        <h2 className="text-2xl font-semibold">About Author</h2>
        <p className="author-description text-gray-700 mx-auto mt-2 max-w-xl">
          {showFullText
            ? "For 15 years, Aaron James provided banking and advising services at Fortune 100 Companies including Bank of America, Merrill, and, most recently as Vice President - Private Client Advisor, at J.P. Morgan before founding Nexus 360, LLC in 2024. Having qualified for the Series 7 and 66 licenses through FINRA, he also acquired the CRPC designation (Chartered Retirement Planning Counselor). He completed his postgraduate education with an MS in Financial Management at UMGC, and graduated cum laude with a BA in Psychology from UMBC. When he's not advising his clients, he conducts speaking engagements on financial literacy, develops real estate, volunteers at his home church, and spends time with his two kids, Zoey and Zayden. At Nexus 360, LLC, he educates his client with a (W+H)ealth Mindset Activation for financial freedom and goal achievement. He enjoys traveling, working out, history, and Sudoku Puzzles."
            : "For 15 years, Aaron James provided banking and advising services at Fortune 100 Companies including Bank of America, Merrill, and, most recently as Vice President - Private Client Advisor, at J.P. Morgan before founding Nexus 360, LLC in 2024."}
        </p>
        {/* Added space between short and long description */}
        <div className="mt-4">
          <button
            onClick={toggleFullText}
            className="text-blue-500 hover:text-blue-700 focus:outline-none"
          >
            {showFullText ? 'Read Less' : 'Read More'}
          </button>
        </div>
      </div>

      {/* Social Media Links */}
      <footer className="bg-gray-800 text-white w-full py-8 mt-12">
        <div className="max-w-6xl mx-auto text-center">
          <h3 className="text-xl mb-4">Let's Connect</h3>
          <div className="flex justify-center space-x-6">
            <a href="https://www.instagram.com/nexus360llc/profilecard/?igsh=YW50Njg5czlzNXBo" target="_blank" rel="noopener noreferrer">
              <FaInstagram className="text-3xl hover:text-blue-400" />
            </a>
            <a href="https://www.linkedin.com/authwall?trk=qf&original_referer=&sessionRedirect=https%3A%2F%2Fwww.linkedin.com%2Fin%2Faaron-james-crpc%25E2%2584%25A2-208b158b" target="_blank" rel="noopener noreferrer">
              <FaLinkedin className="text-3xl hover:text-blue-400" />
            </a>
            <a href="https://www.facebook.com/aaron.james.1029770" target="_blank" rel="noopener noreferrer">
              <FaFacebook className="text-3xl hover:text-blue-400" />
            </a>
            <a href="https://calendly.com/nexus360llc" target="_blank" rel="noopener noreferrer">
              <FaCalendar className="text-3xl hover:text-blue-400" />
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default App;
