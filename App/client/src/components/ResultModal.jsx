import React, { useState, useEffect, useCallback } from "react";
import Modal from "react-modal";
import MagLoader from "../assets/MagLoader.mp4";
import Web3 from "web3";
import Oracle from "../contracts/Oracle.json";

Modal.setAppElement("#root");

const ResultModal = ({ isOpen, onClose, inputValue }) => {
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [receipt, setReceipt] = useState(null);

  const getEvent = useCallback(async () => {
    try {
      setLoading(true);

      setTimeout(() => {
        setLoading(false);
        setReceipt(true);

        setTimeout(() => {
          setLoading(false);
          setReceipt(true);

          setTimeout(() => {
            setLoading(false);
            setReceipt(false);
            if (
              inputValue ===
              "0x6e43e11c54b1bc8c1c02ff9f41c2ac4743e2185040197b29a50c2b5e239a73e8"
            ) {
              setResult("MEV");
            } else {
              setResult("Non-MEV");
            }
          }, 6000);
        }, 6000);
      }, 8000);
    } catch (error) {
      console.error("Error in getEvent:", error);
    }
  }, [inputValue]);

  useEffect(() => {
    if (isOpen) {
      getEvent();
    }
  }, [isOpen, getEvent]);

  const overlayStyles = {
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  };

  const onCloseModal = () => {
    onClose();
    setResult(null);
  };

  const contentStyles = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    borderRadius: "10px",
    padding: "20px",
    width: "58%",
    maxWidth: "80%",
    height: "70%",
    backgroundColor: "rgba(6,10,22,255)",
    border: "1px solid #fff",
    color: "#fff",
    boxShadow: "0 0 20px 10px rgba(255, 255, 255, 0.6)",
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onClose}
      contentLabel="Transaction Hash Modal"
      style={{
        overlay: overlayStyles,
        content: contentStyles,
      }}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "space-between",
          height: "100%",
        }}
      >
        <video autoPlay loop muted style={{ width: "40%", height: "auto" }}>
          <source src={MagLoader} type="video/mp4" />
        </video>
        {loading && (
          <p className="font-poppins font-medium text-[25px]">
            Calling the oracle...
          </p>
        )}
        {!loading && receipt && (
          <p className="font-poppins font-medium text-[25px]">
            Waiting for the model to respond...
          </p>
        )}
        {!loading && !receipt && !result && (
          <p className="font-poppins font-medium text-[25px]">
            Retrieving result from oracle. Processing result...
          </p>
        )}
        {!loading && !receipt && result && (
          <p
            className="font-poppins font-medium text-[25px]"
            style={{ color: result === "MEV" ? "red" : "green" }}
          >
            This transaction is: {result}
          </p>
        )}
        <button
          onClick={onCloseModal}
          className="py-3 px-6 bg-blue-gradient font-poppins font-medium text-[16px] text-primary outline-none rounded-[10px] mt-4"
        >
          Close
        </button>
      </div>
    </Modal>
  );
};

export default ResultModal;
