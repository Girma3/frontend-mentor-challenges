import { useState, useRef, useEffect, useCallback } from "react";
import styles from "./AddedToCartNotification.module.css";
import propTypes from "prop-types";

function AddedToCartNotification({ message = "king" }) {
  //adjustable by the slider
  const [timeoutValue, setTimeoutValue] = useState(0);
  const [visible, setVisible] = useState(false);
  const maxValue = 5; // maximum value for the slider(10 sec)
  const intervalRef = useRef(null);

  // memoize the interval function
  const startInterval = useCallback(() => {
    if (intervalRef.current) clearInterval(intervalRef.current);
    // Clear any existing interval first

    intervalRef.current = setInterval(() => {
      setTimeoutValue((prevValue) => {
        const newValue = prevValue + 1;
        if (newValue >= maxValue) {
          clearInterval(intervalRef.current);
          // stop the interval when max value is reached, hide the notification
          setVisible(false);
          //  the state is set to maxValue
          return maxValue;
        }

        return newValue;
      });
    }, 1000); // update every second
  }, [maxValue]);

  // start the interval on component mount and when message changes
  useEffect(() => {
    if (message) {
      setVisible(true);
      setTimeoutValue(0);
      startInterval();
    }
    // cleanup interval on component unmount
    return () => clearInterval(intervalRef.current);
  }, [message, startInterval]);

  // handle slider change
  const handleSliderChange = (e) => {
    const newTimeoutValue = Number(e.target.value);
    setTimeoutValue(newTimeoutValue);
  };
  const handleMouseEnter = () => {
    // console.log("Mouse entered, pausing auto increment.");
    clearInterval(intervalRef.current);
  };

  const handleMouseLeave = () => {
    //console.log("Mouse left, resuming auto increment.");
    startInterval();
  };

  return (
    <>
      {visible && (
        <dialog
          open={visible}
          className={styles.modalHolder}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          <p className={styles.cartMsg}>{message}</p>
          <div className={styles.cartHolder}>
            <div className={styles.cart}></div>
            <input
              type="range"
              name="timeoutValue"
              min={0}
              max={maxValue}
              value={timeoutValue}
              onChange={handleSliderChange}
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
              className={styles.slider}
            />{" "}
          </div>
        </dialog>
      )}
    </>
  );
}

AddedToCartNotification.propTypes = {
  message: propTypes.string,
};

export default AddedToCartNotification;
