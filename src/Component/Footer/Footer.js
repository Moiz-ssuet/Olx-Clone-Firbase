import React from 'react';

import './Footer.css';

function Footer() {
  return (
    <div className="footerParentDiv">
      <div className="content">
        <div>
          <div className="heading">
            <p>POPULAR CATEGORIES</p>
          </div>
          <div className="list">

            <p>
              Cars<br />
              Flats for rent<br />
              Mobile Phones<br />
              Jobs<br />
            </p>

          </div>
        </div>
        <div>
          <div className="heading">
            <p>ABOUT US</p>
          </div>
          <div className="list">
            <p>About EMPG<br />
              OLX Blog<br />
              Contact Us<br />
              OLX for Businesses<br />
            </p>
          </div>
        </div>
        <div>
          <div className="heading">
            <p>OLX</p>
          </div>
          <div className="list">
            <p>
              Help
              Sitemap<br />
              Terms of use<br />
              Privacy Policy<br />
            </p>

          </div>
        </div>
      </div>
      <div className="footer">
        <p></p>
        <p>Free Classifieds in Pakistan . © 2006-2022 OLX</p>
      </div>
    </div>
  );
}

export default Footer;
