"use client";
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
  RadioGroup,
  Radio,
  Textarea,
} from "@nextui-org/react";
import { useRouter } from "next/navigation";
import { FaInfoCircle } from "react-icons/fa";
import axios from "axios";

export default function DrugForm() {
  const [tabletName, setTabletName] = useState("");
  const [dosageMg, setDosageMg] = useState("");
  const [perStripPieces, setPerStripPieces] = useState("");
  const [manufacturerName, setManufacturerName] = useState("");
  const [preferablePeriod, setPreferablePeriod] = useState("");
  const [forChild, setForChild] = useState(false);
  const [price, setPrice] = useState("");
  const [manufacturingDate, setManufacturingDate] = useState("");
  const [expiryDate, setExpiryDate] = useState("");
  const [storageConditions, setStorageConditions] = useState("");
  const [chemicalComposition, setChemicalComposition] = useState("");
  const [needPrescription, setNeedPrescription] = useState(false);
  const [isGenericMedicine, setIsGenericMedicine] = useState(false);
  const [image, setImage] = useState("");
  const [referenceUrl, setReferenceUrl] = useState("");
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = {
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
      image,
      referenceUrl,
    };

    try {
      const response = await fetch("/api/drugs", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error("Failed to submit drug information");
      }

      alert("Drug information submitted successfully");
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
            <p className="text-md">Drug Inventory</p>
            <p className="text-small text-default-500">Drug Information Form</p>
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
              label="Tablet Name"
              variant="bordered"
              description="Enter the tablet name."
              value={tabletName}
              onChange={(e) => setTabletName(e.target.value)}
              className="max-w-xs"
            />
            <Input
              type="number"
              isRequired
              label="Dosage (mg)"
              variant="bordered"
              description="Enter the dosage in mg."
              value={dosageMg}
              min={1}
              onChange={(e) => setDosageMg(e.target.value)}
              className="max-w-xs"
            />
            <Input
              type="number"
              isRequired
              label="Pieces per Strip"
              variant="bordered"
              description="Enter the number of pieces per strip."
              value={perStripPieces}
              min={1}
              onChange={(e) => setPerStripPieces(e.target.value)}
              className="max-w-xs"
            />
            <Input
              isClearable
              isRequired
              label="Manufacturer Name"
              variant="bordered"
              description="Enter the manufacturer's name."
              value={manufacturerName}
              onChange={(e) => setManufacturerName(e.target.value)}
              className="max-w-xs"
            />
            <RadioGroup
              label="Preferable Period"
              value={preferablePeriod}
              onValueChange={setPreferablePeriod}
              className="max-w-xs"
            >
              <Radio value="before food">Before Food</Radio>
              <Radio value="after food">After Food</Radio>
            </RadioGroup>
            <RadioGroup
              label="Is this for children?"
              value={forChild.toString()}
              onValueChange={(value) => setForChild(value === "true")}
              className="max-w-xs"
            >
              <Radio value="true">Yes</Radio>
              <Radio value="false">No</Radio>
            </RadioGroup>
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
            <Input
              type="date"
              isRequired
              label="Manufacturing Date"
              variant="bordered"
              value={manufacturingDate}
              onChange={(e) => setManufacturingDate(e.target.value)}
              className="max-w-xs"
            />
            <Input
              type="date"
              isRequired
              label="Expiry Date"
              variant="bordered"
              value={expiryDate}
              onChange={(e) => setExpiryDate(e.target.value)}
              className="max-w-xs"
            />
            <RadioGroup
              label="Storage Conditions"
              value={storageConditions}
              onValueChange={setStorageConditions}
              className="max-w-xs"
            >
              <Radio value="cold">Cold</Radio>
              <Radio value="normal">Normal</Radio>
              <Radio value="hot">Hot</Radio>
            </RadioGroup>
            <Textarea
              label="Chemical Composition"
              placeholder="Enter the chemical composition."
              variant="bordered"
              value={chemicalComposition}
              onChange={(e) => setChemicalComposition(e.target.value)}
              className="max-w-xs"
            />
            <RadioGroup
              label="Need Prescription?"
              value={needPrescription.toString()}
              onValueChange={(value) => setNeedPrescription(value === "true")}
              className="max-w-xs"
            >
              <Radio value="true">Yes</Radio>
              <Radio value="false">No</Radio>
            </RadioGroup>
            <RadioGroup
              label="Is Generic Medicine?"
              value={isGenericMedicine.toString()}
              onValueChange={(value) => setIsGenericMedicine(value === "true")}
              className="max-w-xs"
            >
              <Radio value="true">Yes</Radio>
              <Radio value="false">No</Radio>
            </RadioGroup>
            <Input
              isClearable
              isRequired
              label="Reference URL"
              variant="bordered"
              description="Enter a reference URL."
              value={referenceUrl}
              onChange={(e) => setReferenceUrl(e.target.value)}
              className="max-w-xs"
            />
            {image && (
              <div className="flex flex-col items-center mb-4">
                <img
                  src={image}
                  alt="Drug Image"
                  className="rounded-md"
                  height={100}
                  width={100}
                />
                <Button
                  onClick={() => setImage("")}
                  className="mt-2"
                  size="sm"
                  color="danger"
                >
                  Change Image
                </Button>
              </div>
            )}
            <Button color="primary" type="submit">
              Submit Drug Information
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
