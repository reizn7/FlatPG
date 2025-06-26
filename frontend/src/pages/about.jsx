import React from 'react';
import './About.css';

function About() {
  return (
    <div className="about-page">
      <div className="about-container">
        <h2>About Flat&PG Hub</h2>
        <p>
          Flat&PG Hub is a student-first housing platform created to simplify the journey
          of finding and listing PGs or flats. Whether you're a student looking for
          affordable stays or a lister trying to reach tenants—this is the place.
        </p>
        <p>
          With our modern UI, direct contact system, and listing support, we aim to bridge
          the gap between seekers and owners in a clean, fast, and effective way.
        </p>

        <h3>Meet the Team</h3>
        <div className="team-cards">
          {/* Harsh Singh */}
          <div className="team-card">
            <img
              src="/harsh.jpeg"
              alt="Harsh Singh"
              onError={(e) => { e.target.src = "https://via.placeholder.com/120"; }}
            />
            <h4>Harsh Singh</h4>
            <p>
              Co-Founder and Manager<br />
              BCA Student, SMS Varanasi<br />
              📞 7080440213<br />
              ✉️<a href="mailto:harshevolve10@gmail.com">harshevolve10@gmail.com</a>
            </p>
          </div>

          {/* Akshay */}
          <div className="team-card">
            <img
              src="/akshay.jpeg"
              alt="Akshay Narayan Singh"
            />
            <h4>Akshay Narayan Singh</h4>
            <p>
                Co-Founder and Manager<br />
                BCA Student, SMS Varanasi<br />
              📞 747-9515624<br />
              ✉️<a href="mailto:bca2326025@smsvaranasi.in">bca2326025@smsvaranasi.in</a>
            </p>
          </div>

          {/* Sarthak */}
          <div className="team-card1">
            <img
              src="/sarthak.jpeg"
              alt="Sarthak"
            />
            <h4>Sarthak Tripathi</h4>
            <p>
              Co-Founder and Developer<br />
              B.Tech Student, JIIT Noida<br />
              📞 <br />
              ✉️ <a href="mailto:tempmail@gmail.com">tempmail@gmail.com</a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default About;
