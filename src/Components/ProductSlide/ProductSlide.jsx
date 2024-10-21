import React, { useRef } from "react";
import classes from "./productSlide.module.css";

const ProductSlide = ({ productSlide }) => {
  const sliderRef = useRef(null);

  const prev = () => {
    if (sliderRef.current) {
      let width = sliderRef.current.clientWidth;
      sliderRef.current.scrollLeft -= width;
    }
  };

  const next = () => {
    if (sliderRef.current) {
      let width = sliderRef.current.clientWidth;
      sliderRef.current.scrollLeft += width;
    }
  };

  return (
    <div className={classes.productSlideContainer}>
      <div className={classes.prevButton} onClick={prev}>
        <button className={classes.prev}></button>
      </div>
      <div className={classes.slider} ref={sliderRef}>
        <h3 className={classes.sliderHeading}>Trending deals</h3>
        <div className={classes.cards}>
          {productSlide.map((product, i) => (
            <div key={i} className={classes.myCard}>
              <img
                className={classes.sliderImage}
                src={product.image}
                alt=""
              />
              {/* Sales Info */}
              <div className={classes.saleTitle}>
                <span className={classes.percent}>{product.salePercent}</span>
                <span className={classes.saleName}>{product.saleName}</span>
              </div>
              {/*  */}
              <div className={classes.sliderProductName}>{product.name}</div>
            </div>
          ))}
        </div>
      </div>
      <div className={classes.nextButton} onClick={next}>
        <button className={classes.next}></button>
      </div>
    </div>
  );
};

export default ProductSlide;
