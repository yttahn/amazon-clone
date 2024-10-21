import React, { useState } from "react";
import classes from "./footer.module.css";
import "./footer.css";
import i18n from "../../i18n";
import { useTranslation } from "react-i18next";

const Footer = () => {
  //  ` for language translation

  const [selectedLanguage, setSelectedLanguage] = useState(
    localStorage.getItem("selectedLanguage") || "EN"
  );

  const { t } = useTranslation();

  const handleLanguage = (lng) => {
    setSelectedLanguage(lng);
    i18n.changeLanguage(lng.toLowerCase().substring(0, 2));
    localStorage.setItem("selectedLanguage", lng);
  };

  // ` Back to top functionality

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <div className={classes.footer}>
      <div className={classes.topButton}>
        <button 
        onClick={scrollToTop}
        className={classes.backToTop}>Back to top</button>
      </div>
      {/* Lists */}
      <div className={classes.websiteInfoContainer}>
        <div className="getToKnowUs infoBlocks">
          <ul>
            <li className={classes.infoHeading}>Get to Know Us</li>
            <li className={classes.linkTexts}>Careers</li>
            <li className={classes.linkTexts}>About Amazon</li>
            <li className={classes.linkTexts}>Accessibility</li>
            <li className={classes.linkTexts}>Amazon Devices</li>
          </ul>
        </div>
        <div className="makeMoneyWithUs infoBlocks">
          <ul>
            <li className={classes.infoHeading}>Make Money with Us</li>
            <li className={classes.linkTexts}>Sell on Amazon</li>
            <li className={classes.linkTexts}>Supply to Amazon</li>
            <li className={classes.linkTexts}>Advertise Your Products</li>
            <li className={classes.linkTexts}>Self-Publish with Us</li>
            <li className={classes.linkTexts}>Protect & Build Your Brand</li>
            <li className={classes.linkTexts}>Become an Affiliate</li>
            <li className={classes.linkTexts}>Become a Delivery Driver</li>
          </ul>
        </div>
        <div className="amazonPayment infoBlocks">
          <ul>
            <li className={classes.infoHeading}>Amazon Payment Products</li>
            <li className={classes.linkTexts}>Amazon Visa</li>
            <li className={classes.linkTexts}>Amazon Secured Card</li>
            <li className={classes.linkTexts}>Shop with Points</li>
            <li className={classes.linkTexts}>Gift Cards</li>
          </ul>
        </div>
        <div className="helpList infoBlocks">
          <ul>
            <li className={classes.infoHeading}>Let Us Help You</li>
            <li className={classes.linkTexts}>Your Account</li>
            <li className={classes.linkTexts}>Your Orders</li>
            <li className={classes.linkTexts}>Amazon Prime</li>
            <li className={classes.linkTexts}>Help</li>
          </ul>
        </div>
      </div>
      {/* Language */}
      <hr />
      <div className={classes.footerLanguage}>
        <div className={classes.footerLogo}></div>
        <div className={classes.footerLanguageBtn}>
          <div class="dropdown footerDropDown">
            <button
              class="btn footerDropDownBtn dropdown-toggle"
              type="button"
              id="dropdownMenuButton1"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              <span className={classes.globeLogo}></span>
              <span className={classes.footerDropDownText}> English</span>
              <span className={classes.footerDropDownBtnArrow}></span>
            </button>
            <ul
              className="dropdown-menu"
              aria-labelledby="languageDropDownButton"
            >
              <span className="arrowPoint"></span>
              {/* ENGLISH */}
              <li>
                <button
                  onClick={() => {
                    handleLanguage("EN");
                  }}
                  className="dropdown-item radio-btn txt"
                >
                  <input
                    checked={selectedLanguage === "EN"}
                    onChange={() => handleLanguage("EN")}
                    type="radio"
                  />
                  <span className="checkmark">English - EN</span>
                </button>
                <hr />
              </li>
              {/* AMHARIC */}
              <li>
                <button
                  onClick={() => {
                    handleLanguage("AM");
                  }}
                  className="dropdown-item radio-btn txt"
                >
                  <input
                    checked={selectedLanguage === "AM"}
                    onChange={() => handleLanguage("AM")}
                    type="radio"
                  />
                  <span className="checkmark">Amharic - AM</span>
                </button>
              </li>
              {/* espain */}
              <li>
                <button
                  onClick={() => {
                    handleLanguage("AM");
                  }}
                  className="dropdown-item radio-btn txt"
                >
                  <input
                    checked={selectedLanguage === "AM"}
                    onChange={() => handleLanguage("AM")}
                    type="radio"
                  />
                  <span className="checkmark">Amharic - AM</span>
                </button>
              </li>

              <div className="learnMore">{t("learnMore")}</div>
              <hr />

              {/* language list country flag */}
              <div className="region">
                {/* <img src={flag} alt="" className={classes.regionalFlag} /> */}
                {t("region")}
              </div>
            </ul>
          </div>
        </div>
      </div>
      {/* footer list */}
      <div className={classes.amazonServiceContainer}>
        <div className={classes.amazonServices}>
          <ul>
            <li className={classes.amazonServiceHeading}>Amazon Music</li>
            <li>Stream </li>
            <li>millions</li>
            <li>of songs</li>
          </ul>
          <ul>
            <li className={classes.amazonServiceHeading}>Amazon Fresh</li>
            <li> Groceries & </li>
            <li>More</li>
            <li>Right To Your Door</li>
          </ul>
          <ul>
            <li className={classes.amazonServiceHeading}>AbeBooks</li>
            <li>Books, art</li>
            <li>& collectibles</li>
          </ul>
          <ul>
            <li className={classes.amazonServiceHeading}>Amazon Photos</li>
            <li>Unlimited Photo</li>
            <li>Storage</li>
            <li>Free With Prime </li>
          </ul>
          <ul>
            <li className={classes.amazonServiceHeading}>ACX</li>
            <li>Audiobook </li>
            <li>Publishing</li>
            <li>Made Easy</li>
          </ul>
          <ul>
            <li className={classes.amazonServiceHeading}>Amazon Business</li>
            <li>Everything For</li>
            <li>Your Business</li>
          </ul>
          <ul>
            <li className={classes.amazonServiceHeading}>Woot!</li>
            <li>Deals and</li>
            <li>Shenanigans</li>
          </ul>
        </div>
      </div>
      {/* Terms and Conditions */}
      <div className={classes.termsAndConditions}>
        <ul>
          <li>Conditions of Use & Sale</li>
          <li>Privacy Notice</li>
          <li>Interest-Based Ads</li>
        </ul>
        <span className={classes.workingSince}>© 1996-2024, Amazon.com, Inc. or its affiliates</span>
      </div>
    </div>
  );
};

export default Footer;
