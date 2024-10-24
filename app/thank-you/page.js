"use client"; // Ensures client-side rendering

import React, { useState } from "react";
import { Card, Button, Spacer, Link, Divider } from "@nextui-org/react";
import { FaCheckCircle, FaHome, FaStar, FaArrowRight, FaTwitter, FaFacebook } from "react-icons/fa";
import Confetti from "react-confetti";
import { useWindowSize } from "react-use";
import { useRouter } from "next/navigation";
import Lottie from 'lottie-react';
import successAnimation from '../../public/success.json'; // Ensure this path is correct

export default function ThankYouPage() {
  const [rating, setRating] = useState(null);
  const { width, height } = useWindowSize();
  const router = useRouter();

  const handleRating = (value) => {
    setRating(value);
    alert(`Thanks for rating us ${value} stars!`);
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <Confetti width={width} height={height} />
      <Card className="shadow-lg p-10 max-w-lg">
        <div className="flex justify-center mb-4">
          <Lottie animationData={successAnimation} loop={false} style={{ height: 200, width: 200 }} />
        </div>
        <div className="flex flex-col items-center">
          <FaCheckCircle size={50} color="green" />
          <Spacer y={1} />
          <h1>Thank You!</h1>
          <p className="text-default-500 text-center">
            Your purchase was successful. We appreciate your trust in us!
          </p>
          <Spacer y={2} />
          <Button
            color="primary"
            icon={<FaHome />}
            onClick={() => router.push("/")}
          >
            Go to Homepage
          </Button>
          <Spacer y={0.5} />
          <Button
            color="secondary"
            iconRight={<FaArrowRight />}
            onClick={() => router.push("/order-details")}
          >
            View Order Details
          </Button>
          <Divider className="my-6" />
          <h5>Rate Your Experience</h5>
          <div className="flex gap-2">
            {[1, 2, 3, 4, 5].map((star) => (
              <FaStar
                key={star}
                size={30}
                color={rating >= star ? "gold" : "gray"}
                onClick={() => handleRating(star)}
                style={{ cursor: "pointer" }}
              />
            ))}
          </div>
          <Spacer y={2} />
          <p className="text-small text-default-500">
            Share your experience with friends:
          </p>
          <div className="flex gap-4 mt-4">
            <Link
              href="https://twitter.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-400"
            >
              <FaTwitter size={24} />
            </Link>
            <Link
              href="https://facebook.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600"
            >
              <FaFacebook size={24} />
            </Link>
          </div>
        </div>
      </Card>
    </div>
  );
}
