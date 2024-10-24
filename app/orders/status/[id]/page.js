"use client";

import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import axios from "axios";
import { Card, Divider, Image, Skeleton } from "@nextui-org/react";
import { FaCheckCircle,FaBarcode, FaTimesCircle, FaTruck, FaBoxOpen, FaShippingFast, FaClipboardCheck } from "react-icons/fa";

const OrderPage = () => {
  const { id } = useParams(); // Get the 'id' from the URL parameters
  const [order, setOrder] = useState(null);
  const [loadingOrder, setLoadingOrder] = useState(true);

  useEffect(() => {
    const getOrder = async () => {
      try {
        const { data } = await axios.get(`/api/orders/${id}`);
        setOrder(data.order);
        console.log("Order fetched:", data.order);
      } catch (error) {
        console.error("Error fetching order:", error);
      } finally {
        setLoadingOrder(false);
      }
    };

    getOrder();
    console.log("Order ID:", id); // Log the ID to the console
  }, [id]);

  if (loadingOrder) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Skeleton className="w-1/2 h-64" />
      </div>
    );
  }

  if (!order) {
    return <div>Order not found.</div>;
  }

  const {
    tabletName,
    dosageMg,
    manufacturerName,
    quantity,
    buyer,
    address,
    status,
    transportHistory,
  } = order;

  // Determine the icon based on the status
  const statusIcons = {
    'order placed': <FaClipboardCheck className="text-yellow-500 mr-2" />,
    'order packed': <FaBoxOpen className="text-blue-500 mr-2" />,
    'in-transit': <FaTruck className="text-orange-500 mr-2" />,
    'out for delivery': <FaShippingFast className="text-purple-500 mr-2" />,
    'shipped': <FaTruck className="text-green-500 mr-2" />,
    'delivered': <FaCheckCircle className="text-green-500 mr-2" />,
    'cancelled': <FaTimesCircle className="text-red-500 mr-2" />,
    'returned': <FaTimesCircle className="text-red-500 mr-2" />,
  };

  return (
    <div className="flex justify-center items-center p-4">
      <Card className="w-full max-w-lg p-6 shadow-lg rounded-lg bg-white">
        <h1 className="text-2xl font-bold mb-2">Order Details</h1>
        <Divider className="mb-4" />
        <div className="mb-4">
          <p>
            <b>Tablet Name:</b> {tabletName}
          </p>
          <p>
            <b>Dosage:</b> {dosageMg} mg
          </p>
          <p>
            <b>Manufacturer:</b> {manufacturerName}
          </p>
          <p>
            <b>Quantity:</b> {quantity}
          </p>
          <p>
            <b>Buyer:</b> {buyer}
          </p>
          <p>
            <b>Shipping Address:</b> {address}
          </p>
          <p className="flex items-center">
            <b>Status:</b> {statusIcons[status]} {status}
          </p>
        </div>
        <Divider className="mb-4" />
        <div className="text-center mb-4">
          <h2 className="text-xl font-semibold">Track Your Order</h2>
          <div className="border-2 border-dashed p-4">
            <Image
              width={300}
              alt="QR Code"
              src={`https://quickchart.io/qr?text=${id}`}
              className="mx-auto"
            />
            <p className="mt-2 text-gray-600 flex justify-center items-center">
              <FaBarcode className="mr-2" />
              Scan Here
            </p>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default OrderPage;
