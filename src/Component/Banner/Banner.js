import React from 'react';
import './Banner.css';
import Arrow from '../../assets/Arrow'
function Banner() {
  return (
    <div className="bannerParentDiv">
      <div className="bannerChildDiv">
        <div className="menuBar">
          <div className="categoryMenu">
            <span>ALL CATEGORIES</span>
            <Arrow></Arrow>
          </div>
          <div className="otherQuickOptions">
            <span> Mobile Phones</span>
            <span>Cars</span>
            <span>Motorcycles</span>
            <span>Houses</span>
            <span>TV - Video - Audio</span>
            <span>Tablets</span>
            <span>Land & Plots</span>
          </div>
        </div>
        <div className="banner">
          <img
            src="../../../Images/banner copy.png"
            alt=""
          />
        </div>
      </div>

    </div>
  );
}

export default Banner;
