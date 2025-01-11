"use client";
import { useEffect, useState } from "react";
import DropIn from "braintree-web-drop-in";

export default function Payment() {
  const [clientToken, setClientToken] = useState(null);
  const [dropInInstance, setDropInInstance] = useState(null);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  
  const jwtToken = "eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJhbWFuQGdtYWlsLmNvbSIsImlhdCI6MTczNjYwMjQ5MCwiZXhwIjoxNzM2NjA2MDkwfQ.e4TwyoLcgQI1gZ2wsBKCzBoOO_GsVCmeYzJXPCvsFOI"
  // Fetch client token from the backend
  useEffect(() => {
    const fetchClientToken = async () => {
      try {
        const response = await fetch(
          "http://localhost:8080/api/payment/client-token",
          {
            headers : {
              "Authorization": `Bearer ${jwtToken}`, // Add your Bearer token here
            }
          }
        ); // Update with your backend URL
        const token = await response.text();
        setClientToken(token);
      } catch (error) {
        console.error("Error fetching client token:", error);
      }
    };

    fetchClientToken();
  }, []);

  // Initialize Drop-in UI
  useEffect(() => {
    if (clientToken) {
      DropIn.create({
        authorization: clientToken,
        container: "#dropin-container",
      })
        .then((instance) => setDropInInstance(instance))
        .catch((err) => console.error(err));
    }
  }, [clientToken]);

  const handlePayment = async () => {
    if (!dropInInstance) return;

    setLoading(true);
    setMessage("");

    try {
      const { nonce } = await dropInInstance.requestPaymentMethod();
      const response = await fetch(
        "http://localhost:8080/api/payment/process-payment",
        {
          method: "POST",
          headers: {
            "Authorization": `Bearer ${jwtToken}`, // Add your Bearer token here
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            nonce,
            courseId: 4,
          }),
        }
      );

      const result = await response.text();
      setMessage(result);
    } catch (error) {
      console.error("Payment failed:", error);
      setMessage("Payment failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ padding: "20px", fontFamily: "Arial, sans-serif" }}>
      <h1>Course Payment</h1>
      {clientToken ? (
        <div>
          <div id="dropin-container"></div>
          <button
            onClick={handlePayment}
            disabled={loading}
            style={{
              marginTop: "20px",
              padding: "10px 20px",
              fontSize: "16px",
              backgroundColor: "blue",
              color: "white",
              border: "none",
              cursor: "pointer",
            }}
          >
            {loading ? "Processing..." : "Pay Now"}
          </button>
        </div>
      ) : (
        <p>Loading payment gateway...</p>
      )}
      {message && (
        <p style={{ marginTop: "20px", color: "green" }}>{message}</p>
      )}
    </div>
  );
}
