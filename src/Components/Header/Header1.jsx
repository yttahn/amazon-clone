import React, { useContext, useEffect, useRef, useState } from 'react';
import amazonLogo from "../../assets/images/amazonLogo.png";
import flag from "../../assets/images/flag.png";
import { SlLocationPin } from "react-icons/sl";
import { BsSearch, BsCart } from "react-icons/bs";
import classes from "./header.module.css";
import LowerHeader from './LowerHeader';
import { auth } from '../../Utility/firebase';
import { Link } from 'react-router-dom';
import { DataContext } from '../DataProvider/DataProvider';
import "./dropDown.css"; 

import axios from "axios"

// ` for i18n  language
import i18n from '../../i18n';
import { useTranslation } from 'react-i18next';

const Header1 = () => {
  // ` for the dropDown
  const [selectedItem,setSelectedItem] = useState("All")

// ` so we can see the clicked drop down list
  const handleDropDownClick = (item) => {
    setSelectedItem(item)
  }

//` For the search bar
 const [boxShadow, setBoxShadow] = useState("none")
 const inputRef = useRef(null)

//* The handleClick function adds a shadow to the search bar, making it stand out.
 const handleClick = () =>{
   setBoxShadow("0 0 1px 3px #ffab3d")
 }

//  * The handleClickOutside function removes the shadow, returning the search bar to its normal appearance.
 const handleClickOutside = (e) => {
  if(inputRef.current && !inputRef.current.contains(e.target)){
    setBoxShadow("none")
  }
 }

 useEffect(()=>{
  document.addEventListener("click", handleClickOutside)

  return () =>{
    document.removeEventListener("click", handleClickOutside)
  }
 },[])


//  ` for language translation

const [selectedLanguage, setSelectedLanguage] = useState(
  localStorage.getItem("selectedLanguage") || "EN"
)

  const { t } = useTranslation();

  const handleLanguage = (lng) => {
    setSelectedLanguage(lng);
    i18n.changeLanguage(lng.toLowerCase().substring(0,2)); 
    localStorage.setItem("selectedLanguage", lng);
  };

// ` for the cart
 // * access the state but we want the basket so destructure it
  // * after setting up sign in page now we can access the user from DataContext
  const [{basket, user},dispatch] = useContext(DataContext)
  // * to access how many buttons are clicked we can use .length 
  // console.log(basket.length)

// ` for the cart count
 const totalItem = basket.reduce((amount,item)=>
  {
    return amount + item.amount
  },0)
  // console.log(totalItem);

  // ` for the location

  const [location,setLocation] = useState("Your Location")

  useEffect(() => {
    const getLocation = () => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(async (position) => {
          const { latitude, longitude } = position.coords;
          try {
            const response = await axios.get(`https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=AIzaSyCaV1BuPZEyV3NYoiwBY2uAl05aau-rLQI`);
            const addressComponents = response.data.results[0].address_components;
            
            let city = '';
            let state = '';

            for (let component of addressComponents) {
              if (component.types.includes('locality')) {
                city = component.long_name;
              } else if (component.types.includes('administrative_area_level_1')) {
                state = component.short_name;
              }
            }

            const location = `${city}, ${state}`;
            setLocation(location);
          } catch (error) {
            console.error("Error fetching location:", error);
            setLocation("Location unavailable");
          }
        }, (error) => {
          console.error("Error getting geolocation:", error);
          setLocation("Location unavailable");
        });
      } else {
        setLocation("Geolocation not supported");
      }
    };

    getLocation();
  }, []);


  return (
    <>
  <div className={classes.header}>
  
    <nav class="navbar navbar-expand-lg ">
        <div class="container-fluid">
          <div className={classes.leftSection}>
            <div className={classes.logoContainer}>
              {/* amazon logo */}
              <div className={classes.logoBox}>
                <Link to="/">
                  <img 
                  className={classes.header_logo}
                  src={amazonLogo} alt="amazonLogo" />
                </Link> 
              </div>
            </div>

            {/* Location */}
            <div className={classes.location_container}>
                <div className={classes.location_Icon}>
                  <SlLocationPin 
                  style={{marginTop:"23px"}}/>
                </div>
                <div className={classes.userInfoBox}>
                  <span className={classes.deliverTo}>{t("header.deliverTo")}
                  <p style={{fontWeight:"bold", paddingRight:"4px"}}>{user?.email?.split("@")[0]}</p></span>
                  <span className={classes.deliveryLocation}>
                    {location}
                  </span>
                </div>
            </div>
          </div>

          {/* search BAR */}
          <div className={classes.searchBar} style={{boxShadow:boxShadow}}>
          <div class="dropdown categories-dropDown">
          <button 
          class="btn  dropdown-toggle" 
          type="button" 
          data-bs-toggle="dropdown" 
          aria-expanded="false">
            {selectedItem} &nbsp;
          </button>
  <ul class="dropdown-menu">
      <li>
        <a class="dropdown-item" href="#" onClick={()=>handleDropDownClick("All")}>
          All
        </a> 
      </li>
      <li>
        <a class="dropdown-item" href="#" onClick={()=>handleDropDownClick("Alexa ")}>
          {t("header.Alexa")}
        </a>
      </li>
      <li> 
        <a class="dropdown-item" href="#" onClick={()=>handleDropDownClick("Amazon Clinic")}>
          {t("header.Amazon Clinic")}
        </a> 
      </li>
      <li>
        <a class="dropdown-item" href="#" onClick={()=>handleDropDownClick("Amazon Devices")}>
          {t("header.amazonDevices")}
        </a> 
      </li>
      <li>
        <a class="dropdown-item" href="#" onClick={()=>handleDropDownClick("Beauty & Personal Care")}>
          {t("header.Beauty & Personal Care")}
        </a>
      </li>
      <li>
        <a class="dropdown-item" href="#" onClick={()=>handleDropDownClick("Clothing")}>
          {t("header.Clothing")}
        </a>
      </li>
  </ul>
</div>
{/* search bar input */}
            <input 
            className={classes.searchInput}
             type="text"
              name='id'
               placeholder='Search Amazon'
               onClick={handleClick}
               ref={inputRef}/>
            <BsSearch size={40} />
            
          </div>
          {/* rightSection */}
     <div className={classes.rightSection}>
      {/* Language container */}
          <div className="LanguageContainer">
                <div className="languageDropDown">
                   <div className="language-dropDown language">
                       <button className='btn dropdown-toggle languageBtn' type='button' aria-expanded = "false">
                         <img 
                         className={classes.flagImg}
                         src={flag} alt="flag" />
                         <span className={classes.languageCode}>{selectedLanguage}</span>
                       </button>
                       {/* language option drop down list */}
                       <ul className='dropdown-menu' aria-labelledby='languageDropDownButton'>
                        <span className={classes.arrowPoint}></span>
                        {/* ENGLISH */}
                      <li>
                        <button 
                        onClick={()=>{
                          handleLanguage("EN")
                        }}
                        className='dropdown-item radio-btn txt'>
                          <input 
                          checked={selectedLanguage === "EN"}
                          onChange={()=>handleLanguage("EN")}
                          type="radio"/>
                            <span className='checkmark'>
                              English - EN
                            </span>
                        </button>
                      <hr />
                      </li>
                      {/* AMHARIC */}
                      <li>
                        <button
                         onClick={()=>{
                          handleLanguage("AM")
                        }}
                         className='dropdown-item radio-btn txt'>
                          <input 
                          checked={selectedLanguage === "AM"}
                          onChange={()=>handleLanguage("AM")}
                          type="radio" />
                            <span className='checkmark'>
                              Amharic - AM
                            </span>
                        </button>
                      </li>
                      {/* espain */}
                      <li>
                        <button
                         onClick={()=>{
                          handleLanguage("AM")
                        }}
                         className='dropdown-item radio-btn txt'>
                          <input 
                          checked={selectedLanguage === "AM"}
                          onChange={()=>handleLanguage("AM")}
                          type="radio" />
                            <span className='checkmark'>
                              Amharic - AM
                            </span>
                        </button>
                      </li>
                      
                      
                        <div className={classes.learnMore}>
                          {t("learnMore")}
                        </div>
                        <hr />

                        {/* language list country flag */}
                        <div className={classes.region}>
                          {/* <img src={flag} alt="" className={classes.regionalFlag} /> */}
                          {t("region")}
                        </div>
                    </ul>
                </div>
            </div>
         </div>
            {/* account */}
            <Link to={!user &&"/auth"}>
              <div className={classes.accountContainer}>
                {
                  user?(
                    <>
                     <span className={classes.blockOne}>Hello,{user?.email?.split("@")[0]}</span>
            <span 
             onClick={()=>auth.signOut()}
            className={classes.blockTwo}> Sign Out</span>
                    </>
                  ) : (
                    <>
                    <span className={classes.blockOne}>{t("header.greeting")}</span>
            <span className={classes.blockTwo}> {t("header.accountLists")}</span>
                    </>
                  )
                }
           
          </div>
            </Link>
          {/* order */}

          <Link to = "/orders">
            <div className={classes.ordersContainer}>
          <span className={classes.blockOne}>{t("header.returns")}</span>
            <span className={classes.blockTwo}>{t("header.orders")}</span>
          </div>
          </Link>

          
          {/* cart */}

         <Link to ="/cart">
          <div className={classes.cartContainer}>
            <div className={classes.cartContent}>
              <span className={classes.cartCount}>{totalItem}</span>
              <span className={classes.cartIcon}>
              </span>
            </div>
            <div className={classes.cartTextContainer}>
              <span className={classes.cartText}>{t("header.cart")}</span>
            </div>
        </div>
         </Link>
        

      </div>
        </div>
    </nav>
  </div>
  <LowerHeader/>
    
    </>
  );
};

export default Header1;
