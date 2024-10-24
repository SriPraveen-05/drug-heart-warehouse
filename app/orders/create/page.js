"use client"
import React, { useState } from "react";
import {
  Input,
  Button,
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Divider,
  Link,
} from "@nextui-org/react";
import { useRouter } from "next/navigation";
import { FaInfoCircle } from "react-icons/fa";

export default function PurchaseForm() {
  const [drugId, setDrugId] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [buyer, setBuyer] = useState("");
  const [address, setAddress] = useState("");
  const [price, setPrice] = useState(0);

  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = {
      drugId,
      quantity,
      buyer,
      address,
      price,
    };

    try {
      const response = await fetch("/api/orders", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error("Failed to submit purchase information");
      }

      alert("Purchase information submitted successfully");
      router.push("/thank-you");
    } catch (error) {
      console.error("Error:", error);
      alert("Submission failed");
    }
  };

  return (
    <div className="flex justify-center align-middle">
      <Card className="card">
        <CardHeader className="flex gap-3">
          <div className="flex flex-col">
            <p className="text-md">Drug Purchase</p>
            <p className="text-small text-default-500">Purchase Information Form</p>
          </div>
        </CardHeader>
        <Divider />
        <CardBody className="m-10">
          <form
            className="flex flex-col align-middle gap-3 p-10"
            onSubmit={handleSubmit}
          >
            <Input
              isClearable
              isRequired
              label="Drug ID"
              variant="bordered"
              description="Enter the drug ID."
              value={drugId}
              onChange={(e) => setDrugId(e.target.value)}
              className="max-w-xs"
            />
            <Input
              type="number"
              isRequired
              label="Quantity"
              variant="bordered"
              description="Enter the quantity."
              value={quantity}
              min={1}
              onChange={(e) => setQuantity(e.target.value)}
              className="max-w-xs"
            />
            <Input
              isClearable
              isRequired
              label="Buyer Name"
              variant="bordered"
              description="Enter the buyer's name."
              value={buyer}
              onChange={(e) => setBuyer(e.target.value)}
              className="max-w-xs"
            />
            <Input
              isClearable
              isRequired
              label="Address"
              variant="bordered"
              description="Enter the buyer's address."
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              className="max-w-xs"
            />
            <Input
              type="number"
              isRequired
              label="Price"
              variant="bordered"
              description="Enter the price."
              value={price}
              min={0}
              onChange={(e) => setPrice(e.target.value)}
              className="max-w-xs"
            />
            <Button color="primary" type="submit">
              Submit Purchase Information
            </Button>
          </form>
        </CardBody>
        <Divider />
        <CardFooter>
          <p>
            Need help? <FaInfoCircle className="inline-block ml-1" />
          </p>
          <span>
            <Link
              className="text-blue-600"
              showAnchorIcon
              onClick={() => {
                router.push("/help");
              }}
            >
              Contact Support
            </Link>
          </span>
        </CardFooter>
      </Card>
    </div>
  );
}
