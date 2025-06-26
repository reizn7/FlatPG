import React from 'react';
import './Contact.css';

function Contact() {
  return (
    <div className="contact-page">
      <div className="contact-container">
        <h2>Contact Us</h2>
        <p>We’d love to hear from you! Whether you have a query or want to collaborate, reach out anytime.</p>

        <div className="contact-box">
          <h3>General Inquiries</h3>
          <p>Email: <a href="mailto:bca2326025@smsvaranasi.in">bca2326025@smsvaranasi.in</a></p>
          <p>Phone: +91-747-9515624</p>
        </div>
        <div className="contact-box">
          <h3>For Flat Booking at Lowsest Price</h3>
          <p>Email: <a href="mailto:harshevolve10@gmail.com">harshevolve10@gmail.com</a></p>
          <p>Phone: +91-7080440213</p>
        </div>

      </div>
    </div>
  );
}

export default Contact;
