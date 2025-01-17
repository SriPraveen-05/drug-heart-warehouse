"use client";
import React, { useState, useEffect, useRef } from "react";
import { Html5QrcodeScanner } from "html5-qrcode";
import { useRouter } from "next/navigation";
import Head from "next/head";
import Link from "next/link";
import axios from "axios";

export default function Scan() {
  const router = useRouter();
  const [data, setData] = useState("No result");
  const [showModal, setShowModal] = useState(false);
  const [status, setStatus] = useState("");
  const [place, setPlace] = useState("");
  const [note, setNote] = useState("");
  const [orderId, setOrderId] = useState(null);
  const [order, setOrder] = useState(null);
  const [loadingOrder, setLoadingOrder] = useState(false);
  const scannerRef = useRef(null);

  // Scanner setup
  useEffect(() => {
    const scanner = new Html5QrcodeScanner("reader", { fps: 10, qrbox: 250 });

    const onScanSuccess = (decodedText, decodedResult) => {
      setData(decodedText);
      setOrderId(decodedText); // Assuming QR contains the order ID
      setShowModal(true);

      // Trigger order fetching after scanning
      setLoadingOrder(true);
    };

    const onScanFailure = (error) => {
      console.warn(`QR scan failed: ${error}`);
    };

    scanner.render(onScanSuccess, onScanFailure);

    return () => {
      scanner.clear().catch((error) => console.error("Failed to clear scanner", error));
    };
  }, []);

  // Fetch order data when orderId changes
  useEffect(() => {
    if (orderId) {
      const getOrder = async () => {
        try {
          const { data } = await axios.get(`/api/orders/${orderId}`);
          setOrder(data.order);
          setStatus(data.order.status || ""); // Set the fetched status
          setPlace(data.order.transportHistory?.[0]?.place || ""); // Set the fetched place if available
          setNote(data.order.transportHistory?.[0]?.notes || ""); // Set the fetched notes if available
          console.log("Order fetched:", data.order);
        } catch (error) {
          console.error("Error fetching order:", error);
        } finally {
          setLoadingOrder(false);
        }
      };

      getOrder();
    }
  }, [orderId]);

  const handleCloseModal = () => {
    setShowModal(false);
    setStatus("");
    setPlace("");
    setNote("");
    setOrderId(null);
  };

  const handleUpdate = async () => {
    try {
      const response = await axios.patch(`/api/orders/${orderId}`, {
        status,
        transportHistory: [{ place, notes: note }],
      });

      if (response.data.success) {
        alert("Order updated successfully");
        handleCloseModal();
      } else {
        alert("Failed to update order");
      }
    } catch (error) {
      console.error("Error updating order:", error);
      alert("Error updating order");
    }
  };

  return (
    <>
      <Head>
        <title>Drug Tester</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="flex flex-col mt-[5rem] justify-center items-center">
        <div className="flex flex-col justify-center items-center">
          <h1 className="text-4xl font-bold mb-4">QR Scanner</h1>
          <div id="reader" className="lg:h-[400px] lg:w-[400px] h-[300px] w-[300px]" />
          <Link
            href={`/`}
            className="bg-yellow-200 m-4 text-md rounded-md px-4 py-2 hover:underline"
          >
            Back to home..
          </Link>
          {showModal && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
              <div className="bg-white rounded-md p-4">
                {loadingOrder ? (
                  <p>Loading...</p>
                ) : (
                  <>
                    <p className="text-xl font-bold mb-2">Order ID: {orderId}</p>

                    <div className="mt-4">
                      <label className="block mb-2">Select Status:</label>
                      <select
                        value={status}
                        onChange={(e) => setStatus(e.target.value)}
                        className="border p-2 rounded w-full"
                      >
                        <option value="">Select Status</option>
                        <option value="order placed">Order Placed</option>
                        <option value="order packed">Order Packed</option>
                        <option value="in-transit">In-Transit</option>
                        <option value="out for delivery">Out for Delivery</option>
                        <option value="pending">Pending</option>
                        <option value="shipped">Shipped</option>
                        <option value="delivered">Delivered</option>
                        <option value="cancelled">Cancelled</option>
                        <option value="returned">Returned</option>
                      </select>
                    </div>

                    <div className="mt-4">
                      <label className="block mb-2">Place:</label>
                      <input
                        type="text"
                        value={place}
                        onChange={(e) => setPlace(e.target.value)}
                        className="border p-2 rounded w-full"
                      />
                    </div>

                    <div className="mt-4">
                      <label className="block mb-2">Note:</label>
                      <input
                        type="text"
                        value={note}
                        onChange={(e) => setNote(e.target.value)}
                        className="border p-2 rounded w-full"
                      />
                    </div>

                    <div className="flex justify-end mt-4">
                      <button
                        className="bg-gray-200 text-gray-800 px-4 py-2 rounded-md hover:bg-gray-300"
                        onClick={handleCloseModal}
                      >
                        Close
                      </button>
                      <button
                        className="bg-blue-500 text-white px-4 py-2 rounded-md mx-4 hover:bg-blue-600"
                        onClick={handleUpdate}
                      >
                        Update
                      </button>
                    </div>
                  </>
                )}
              </div>
            </div>
          )}
        </div>
      </main>
    </>
  );
}
