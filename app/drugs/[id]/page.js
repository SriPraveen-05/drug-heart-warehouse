"use client";

import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import axios from "axios";
import { Card, Divider, Image, Skeleton } from "@nextui-org/react";
import { FaCheckCircle, FaTimesCircle, FaBarcode } from "react-icons/fa";

const DrugPage = () => {
  const { id } = useParams(); // Get the 'id' from the URL parameters
  const [drug, setDrug] = useState(null);
  const [loadingDrug, setLoadingDrug] = useState(true);

  useEffect(() => {
    const getDrug = async () => {
      try {
        const { data } = await axios.get(`/api/drugs/${id}`);
        setDrug(data.drug);
        console.log("Drug fetched:", data.drug);
      } catch (error) {
        console.error("Error fetching drug:", error);
      } finally {
        setLoadingDrug(false);
      }
    };

    getDrug();
    console.log("Drug ID:", id); // Log the ID to the console
  }, [id]);

  if (loadingDrug) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Skeleton className="w-1/2 h-64" />
      </div>
    );
  }

  if (!drug) {
    return <div>Drug not found.</div>;
  }

  const {
    tabletName,
    dosageMg,
    perStripPieces,
    manufacturerName,
    preferablePeriod,
    forChild,
    price,
    manufacturingDate,
    expiryDate,
    storageConditions,
    chemicalComposition,
    needPrescription,
    isGenericMedicine,
    referenceUrl,
  } = drug;

  return (
    <div className="flex justify-center items-center p-4">
      <Card className="w-full max-w-lg p-6 shadow-lg rounded-lg bg-white">
        <h1 className="text-2xl font-bold mb-2">Drug Details</h1>
        <Divider className="mb-4" />
        <div className="mb-4">
          <p>
            <b>Tablet Name:</b> {tabletName}
          </p>
          <p>
            <b>Dosage:</b> {dosageMg} mg
          </p>
          <p>
            <b>Per Strip Pieces:</b> {perStripPieces}
          </p>
          <p>
            <b>Manufacturer:</b> {manufacturerName}
          </p>
          <p>
            <b>Preferable Period:</b> {preferablePeriod}
          </p>
          <p>
            <b>For Child:</b> {forChild ? "Yes" : "No"}
          </p>
          <p>
            <b>Price:</b> ${price.toFixed(2)}
          </p>
          <p>
            <b>Manufacturing Date:</b>{" "}
            {new Date(manufacturingDate).toLocaleDateString()}
          </p>
          <p>
            <b>Expiry Date:</b>{" "}
            {new Date(expiryDate).toLocaleDateString()}
          </p>
          <p>
            <b>Storage Conditions:</b> {storageConditions}
          </p>
          <p>
            <b>Chemical Composition:</b> {chemicalComposition}
          </p>
          <p>
            <b>Need Prescription:</b> {needPrescription ? "Yes" : "No"}
          </p>
          <p>
            <b>Generic Medicine:</b> {isGenericMedicine ? "Yes" : "No"}
          </p>
          <p>
            <b>Reference URL:</b>{" "}
            <a href={referenceUrl} target="_blank" rel="noopener noreferrer">
              {referenceUrl}
            </a>
          </p>
        </div>
        <Divider className="mb-4" />
        <div className="text-center mb-4">
          <h2 className="text-xl font-semibold">Your Ticket</h2>
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

export default DrugPage;
