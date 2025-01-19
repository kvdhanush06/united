import React from 'react';
import { Link } from 'react-router-dom';

export default function HomePage() {
  return (
    <div className="container">
      <nav className="navbar">
        <div className="nav-left">
          <span>UNI</span>TED
        </div>
        <div className="nav-right">
          <Link to="/login">Login</Link>
          <Link to="/signup">Sign Up</Link>
        </div>
      </nav>

      <main className="main" id="main_section">
        <h1 className="main_h1">Unleash the Ultimate <br /> Tournament Experience</h1>
        <p className="main_para">
          <span style={{ opacity: 0.5 }}>Create a sleek, professional tournament platform effortlessly.</span>
          No more DMs, manual payments, or spreadsheets.
          <span style={{ opacity: 0.5 }}>We handle registrations, payments, sponsorships, brackets, and score
            updates, so you can focus on delivering the best competitive gaming experience.</span>
        </p>
        <div id='main-btn-wrapper'>
          <button className="main-su">Sign Up at No Cost <span className="arrow">➡️</span></button>
        </div>
      </main>

      <div className="games">
        <h2 className="Games-heading">-Games We Offer</h2>
        <br /><br />
        <div className="all-games">
          <div className="free_fire">
            <img className="ff-image" src="freefire.jpg" alt="" />
            <button className="ff-button">know more &#8594</button>
          </div>
          <div className="valorant">
            <img className="valorant-image" src="valorant.jpg" alt="" />
            <button className="valorant-button">know more &#8594</button>
          </div>
          <div className="elden-ring">
            <img className="elden-ring-image" src="witcher.jpg" alt="" />
            <button className="elden-ring-button">know more &#8594</button>
          </div>
          <div className="witcher">
            <img className="witcher-image" src="eldenring.jpg" alt="" />
            <button className="witcher-button">know more &#8594</button>
          </div>
        </div>
      </div>

      <div className="forms" id="forms">
        <h2 className="contact_heading">Contact Us</h2>
        <form className="contact-form" action="https://api.web3forms.com/submit" method="POST">
          <input type="hidden" name="access_key" value="" />
          <label htmlFor="first-name">First Name</label>
          <input type="text" id="first-name" name="first_name" required placeholder="Enter your first name" />

          <label htmlFor="last-name">Last Name</label>
          <input type="text" id="last-name" name="last_name" required placeholder="Enter your last name" />

          <label htmlFor="email">Email</label>
          <input type="email" id="email" name="email" required placeholder="Enter your email" />

          <label htmlFor="message">Message</label>
          <textarea id="message" name="message" required placeholder="Enter your message" rows="5" />

          <button type="submit" className="submit-button">Submit</button>
        </form>
      </div>

      <footer className="ffooter">
        <div className="all-elements">
          <div className="contact">
            <h4 className="h4heading">Contact</h4>
            <ul className="contact_ul">
              <li>
                <a className="footer_elements" href="#forms">Tell Us Everything <br />Do you have any question? Feel free to reach out.</a>
              </li>
              <li><a className="footer_elements" href="mailto:9063074117rushi@gmail.com">Let's Chat</a></li>
            </ul>
          </div>
          <div className="p0licy">
            <h4 className="h4heading">Policy</h4>
            <ul className="policy_ul">
              <li><a className="footer_elements" href="">Privacy</a></li>
              <li><a className="footer_elements" href="">Terms Of Use</a></li>
              <li><a className="footer_elements" href="">Pricing</a></li>
            </ul>
          </div>
          <div className="company">
            <h4 className="h4heading">Company</h4>
            <ul className="policy_ul">
              <li><a className="footer_elements" href="">About</a></li>
              <li><a className="footer_elements" href="">Blog</a></li>
              <li><a className="footer_elements" href="">FAQ</a></li>
            </ul>
          </div>
          <div className="social-media">
            <h4 className="social-media-heading">Follow Us</h4>
            <ul>
              <li><a href="https://twitter.com" className="social-icon"><i className="fab fa-twitter"></i></a></li>
              <li><a href="https://facebook.com" className="social-icon"><i className="fab fa-facebook"></i></a></li>
              <li>
                <a href="https://instagram.com" className="social-icon"><i className="fab fa-instagram"></i></a>
              </li>
              <li><a href="https://linkedin.com" className="social-icon"><i className="fab fa-linkedin"></i></a></li>
            </ul>
          </div>
        </div>
      </footer>
    </div>
  );
}
