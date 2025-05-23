import React from 'react';
import { Link } from 'react-router-dom';
import Navbar from './Navbar';

// export default function HomePage() {
//   return (
//     <div className="container">
      
//       <Navbar></Navbar>

//       <main className="main" id="main_section">
//         <h1 className="main_h1">Unleash the Ultimate <br /> Tournament Experience</h1>
//         <p className="main_para">
//           <span style={{ opacity: 0.5 }}>Create a sleek, professional tournament platform effortlessly.</span>
//           No more DMs, manual payments, or spreadsheets.
//           <span style={{ opacity: 0.5 }}>We handle registrations, payments, sponsorships, brackets, and score
//             updates, so you can focus on delivering the best competitive gaming experience.</span>
//         </p>
//         <div id='main-btn-wrapper'>
//           <button className="main-su">Sign Up at No Cost <span className="arrow">➡️</span></button>
//         </div>
//       </main>

//       <div className="games">
//         <h2 className="Games-heading">-Games We Offer</h2>
//         <br /><br />
//         <div className="all-games">
//           <div className="free_fire">
//             <img className="ff-image" src="freefire.jpg" alt="" />
//             <button className="ff-button">Know More➡️</button>
//           </div>
//           <div className="valorant">
//             <img className="valorant-image" src="valorant.jpg" alt="" />
//             <button className="valorant-button">Know More➡️</button>
//           </div>
//           <div className="elden-ring">
//             <img className="elden-ring-image" src="witcher.jpg" alt="" />
//             <button className="elden-ring-button">Know More➡️</button>
//           </div>
//           <div className="witcher">
//             <img className="witcher-image" src="eldenring.jpg" alt="" />
//             <button className="witcher-button">Know More➡️</button>
//           </div>
//         </div>
//       </div>

//       <div className="forms" id="forms">
//         <h2 className="contact_heading">Contact Us</h2>
//         <form className="contact-form" action="https://api.web3forms.com/submit" method="POST">
//           <input type="hidden" name="access_key" value="" />
//           <label htmlFor="first-name">First Name</label>
//           <input type="text" id="first-name" name="first_name" required placeholder="Enter your first name" />

//           <label htmlFor="last-name">Last Name</label>
//           <input type="text" id="last-name" name="last_name" required placeholder="Enter your last name" />

//           <label htmlFor="email">Email</label>
//           <input type="email" id="email" name="email" required placeholder="Enter your email" />

//           <label htmlFor="message">Message</label>
//           <textarea id="message" name="message" required placeholder="Enter your message" rows="5" />

//           <button type="submit" className="submit-button">Submit</button>
//         </form>
//       </div>

//       <footer className="ffooter">
//         <div className="all-elements">
//           <div className="contact">
//             <h4 className="h4heading">Contact</h4>
//             <ul className="contact_ul">
//               <li>
//                 <a className="footer_elements" href="#forms">Tell Us Everything <br />Do you have any question? Feel free to reach out.</a>
//               </li>
//               <li><a className="footer_elements" href="mailto:9063074117rushi@gmail.com">Let's Chat</a></li>
//             </ul>
//           </div>
//           <div className="p0licy">
//             <h4 className="h4heading">Policy</h4>
//             <ul className="policy_ul">
//               <li><a className="footer_elements" href="">Privacy</a></li>
//               <li><a className="footer_elements" href="">Terms Of Use</a></li>
//               <li><a className="footer_elements" href="">Pricing</a></li>
//             </ul>
//           </div>
//           <div className="company">
//             <h4 className="h4heading">Company</h4>
//             <ul className="policy_ul">
//               <li><a className="footer_elements" href="">About</a></li>
//               <li><a className="footer_elements" href="">Blog</a></li>
//               <li><a className="footer_elements" href="">FAQ</a></li>
//             </ul>
//           </div>
//           <div className="social-media">
//             <h4 className="social-media-heading">Follow Us</h4>
//             <ul>
//               <li><a href="https://twitter.com" className="social-icon"><i className="fab fa-twitter"></i></a></li>
//               <li><a href="https://facebook.com" className="social-icon"><i className="fab fa-facebook"></i></a></li>
//               <li>
//                 <a href="https://instagram.com" className="social-icon"><i className="fab fa-instagram"></i></a>
//               </li>
//               <li><a href="https://linkedin.com" className="social-icon"><i className="fab fa-linkedin"></i></a></li>
//             </ul>
//           </div>
//         </div>
//       </footer>
//     </div>
//   );
// }

// import './styles.css';

function HomePage() {
  return (
    <div>

      <Navbar/>

      <main id="main" className="main">
        <div className="main-container">
          <h1 className="main-title">
            Unleash the Ultimate<br />Tournament Experience
          </h1>
          <p className="main-text">
            Create a sleek, professional tournament platform effortlessly.
            <span className="main-text-highlight"> No more DMs, manual payments, or spreadsheets. </span>
            We handle registrations, payments, sponsorships, brackets, and score
            updates, so you can focus on delivering the best competitive gaming experience.
          </p>
          <button className="main-button">Sign Up at No Cost →</button>
        </div>
      </main>

      <section id="games" className="games">
        <div className="games-container">
          <h2 className="games-title">Games We Offer</h2>
          <div className="games-grid">
            {[
              {
                title: "Free Fire",
                image: "https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&w=800&q=80"
              },
              {
                title: "Valorant",
                image: "https://images.unsplash.com/photo-1538481199705-c710c4e965fc?auto=format&fit=crop&w=800&q=80"
              },
              {
                title: "Elden Ring",
                image: "https://images.unsplash.com/photo-1511512578047-dfb367046420?auto=format&fit=crop&w=800&q=80"
              },
              {
                title: "Witcher",
                image: "https://images.unsplash.com/photo-1509198397868-475647b2a1e5?auto=format&fit=crop&w=800&q=80"
              }
            ].map((game) => (
              <div key={game.title} className="game-card">
                <img 
                  src={game.image} 
                  alt={game.title}
                  className="game-image"
                />
                <div className="game-overlay">
                  <div className="game-content">
                    <h3 className="game-title">{game.title}</h3>
                    <button className="game-button">Know More →</button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="contact" className="contact">
        <div className="contact-container">
          <h2 className="contact-title">Contact Us</h2>
          <form className="contact-form">
            <div className="form-grid">
              <div className="form-group">
                <label className="form-label">First Name</label>
                <input
                  type="text"
                  className="form-input"
                  placeholder="Enter your first name"
                />
              </div>
              <div className="form-group">
                <label className="form-label">Last Name</label>
                <input
                  type="text"
                  className="form-input"
                  placeholder="Enter your last name"
                />
              </div>
            </div>
            <div className="form-group">
              <label className="form-label">Email</label>
              <input
                type="email"
                className="form-input"
                placeholder="Enter your email"
              />
            </div>
            <div className="form-group">
              <label className="form-label">Message</label>
              <textarea
                rows={5}
                className="form-textarea"
                placeholder="Enter your message"
              />
            </div>
            <button type="submit" className="form-button">Submit</button>
          </form>
        </div>
      </section>

      <footer className="footer">
        <div className="footer-grid">
          <div>
            <h4 className="footer-title">Contact</h4>
            <ul className="footer-list">
              <li>
                <a href="#contact" className="footer-link">Tell Us Everything</a>
              </li>
              <li>
                <a href="mailto:contact@united.com" className="footer-link">Let's Chat</a>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="footer-title">Policy</h4>
            <ul className="footer-list">
              <li><a href="#" className="footer-link">Privacy</a></li>
              <li><a href="#" className="footer-link">Terms of Use</a></li>
              <li><a href="#" className="footer-link">Pricing</a></li>
            </ul>
          </div>
          <div>
            <h4 className="footer-title">Company</h4>
            <ul className="footer-list">
              <li><a href="#" className="footer-link">About</a></li>
              <li><a href="#" className="footer-link">Blog</a></li>
              <li><a href="#" className="footer-link">FAQ</a></li>
            </ul>
          </div>
          <div>
            <h4 className="footer-title">Follow Us</h4>
            <div className="social-links">
              <a href="#" className="social-icon">
              </a>
              <a href="#" className="social-icon">
              </a>
              <a href="#" className="social-icon">
              </a>
              <a href="#" className="social-icon">
              </a>
            </div>
          </div>
        </div>
        <div className="footer-bottom">
          <p>&copy; 2024 UNITED Gaming. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}

export default HomePage;