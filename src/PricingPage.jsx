import React from 'react';
import Pricing from './components/Pricing';
import BookingDemo from './components/BookingDemo';
import Testimonials from './components/Testimonials';
import VAShowcase from './components/VAShowcase';
import Timeline from './components/Timeline';
import Stats from './components/Stats';
import FAQ from './components/FAQ';
import GoogleReviews from './components/GoogleReviews';

const PricingPage = () => {
  const handleScrollToBooking = (e) => {
    e.preventDefault();
    const element = document.getElementById('booking');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <div className="bg-white">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-ocean-700 via-ocean-600 to-ocean-500 text-white">
        <div className="section-container">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
              Simple, Transparent Pricing
            </h1>
            <p className="text-lg md:text-xl mb-8 text-ocean-50 max-w-3xl mx-auto">
              Get a dedicated virtual assistant with no hidden fees or long-term contracts.
              Scale your team up or down as needed.
            </p>
          </div>
        </div>
      </section>

      {/* Main Pricing Section */}
      <Pricing />

      {/* Book a Call CTA */}
      <BookingDemo />

      {/* VA Showcase */}
      <VAShowcase />

      {/* Timeline */}
      <Timeline />

      {/* Stats */}
      <Stats />

      {/* Google Reviews */}
      <GoogleReviews />

      {/* FAQ Section */}
      <FAQ />

      {/* Final CTA */}
      <section className="section-container bg-ocean-700 text-white">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-4xl font-bold mb-6">Ready to Get Started?</h2>
          <p className="text-xl text-ocean-100 mb-8">
            Join hundreds of businesses that trust Ocean VA for their virtual assistant needs.
          </p>
          <button
            onClick={handleScrollToBooking}
            className="bg-white text-ocean-700 hover:bg-gray-100 font-bold px-8 py-4 rounded-lg transition-all duration-200 shadow-lg hover:shadow-xl cursor-pointer"
          >
            Book a Free Consultation
          </button>
        </div>
      </section>
    </div>
  );
};

export default PricingPage;
