"use client";
import React, { useState, useEffect, useMemo, useCallback } from "react";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Input,
  Button,
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  Pagination,
  useDisclosure,
} from "@nextui-org/react";
import { FaSearch, FaChevronDown, FaEllipsisV } from "react-icons/fa";
import axios from "axios";
import { useRouter } from "next/navigation";
import { capitalize } from "../utils/utils";
import WarningModal from "../Warning"; // Import the WarningModal component

// Define columns for the Drug table (excluding status)
const drugColumns = [
  { name: "TABLET NAME", uid: "tabletName", sortable: true },
  { name: "DOSAGE (mg)", uid: "dosageMg" },
  { name: "MANUFACTURER", uid: "manufacturerName" },
  { name: "PRICE ($)", uid: "price" },
  { name: "ACTIONS", uid: "actions" },
];

const INITIAL_VISIBLE_COLUMNS = ["tabletName", "dosageMg", "manufacturerName", "price", "actions"];

export default function DrugsTable() {
  const [drugs, setDrugs] = useState([]);
  const [filterValue, setFilterValue] = useState("");
  const [selectedKeys, setSelectedKeys] = useState(new Set([]));
  const [visibleColumns, setVisibleColumns] = useState(new Set(INITIAL_VISIBLE_COLUMNS));
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [sortDescriptor, setSortDescriptor] = useState({
    column: "tabletName",
    direction: "ascending",
  });
  const [page, setPage] = useState(1);
  const router = useRouter();

  // Modal control state
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [drugToDelete, setDrugToDelete] = useState(null);

  useEffect(() => {
    const fetchDrugs = async () => {
      try {
        const response = await axios.get("/api/drugs");
        if (response.data.success) {
          setDrugs(response.data.drugs);
        } else {
          console.error("Failed to fetch drugs:", response.data);
        }
      } catch (error) {
        console.error("Failed to fetch drugs:", error);
      }
    };

    fetchDrugs();
  }, []);

  // Function to handle the delete action with modal confirmation
  const handleDelete = async () => {
    if (!drugToDelete) return;
    
    try {
      const response = await axios.delete(`/api/drugs/${drugToDelete._id}`);
      if (response.data.success) {
        setDrugs(drugs.filter((drug) => drug._id !== drugToDelete._id));
        setDrugToDelete(null);
      } else {
        console.error("Failed to delete drug:", response.data);
      }
    } catch (error) {
      console.error("Failed to delete drug:", error);
    }
  };

  // Function to trigger the deletion modal
  const handleDeleteClick = (drug) => {
    setDrugToDelete(drug);
    onOpen();
  };

  const handleView = (id) => {
    router.push(`/drugs/${id}`);
  };

  const handleEdit = (id) => {
    router.push(`/drugs/edit/${id}`);
  };

  const filteredDrugs = useMemo(() => {
    return drugs.filter(
      (drug) =>
        drug.tabletName.toLowerCase().includes(filterValue.toLowerCase())
    );
  }, [drugs, filterValue]);

  const items = useMemo(() => {
    const start = (page - 1) * rowsPerPage;
    const end = start + rowsPerPage;
    return filteredDrugs.slice(start, end);
  }, [page, filteredDrugs, rowsPerPage]);

  const sortedItems = useMemo(() => {
    return [...items].sort((a, b) => {
      const first = a[sortDescriptor.column];
      const second = b[sortDescriptor.column];
      const cmp = first < second ? -1 : first > second ? 1 : 0;
      return sortDescriptor.direction === "descending" ? -cmp : cmp;
    });
  }, [sortDescriptor, items]);

  const renderCell = useCallback((drug, columnKey) => {
    const cellValue = drug[columnKey];
    switch (columnKey) {
      case "tabletName":
      case "dosageMg":
      case "manufacturerName":
      case "price":
        return <span>{cellValue}</span>;
      case "actions":
        return (
          <div className="relative flex justify-center items-center gap-2">
            <Dropdown>
              <DropdownTrigger>
                <Button isIconOnly radius="full" size="sm" variant="light">
                  <FaEllipsisV className="text-default-400" />
                </Button>
              </DropdownTrigger>
              <DropdownMenu>
                <DropdownItem onClick={() => handleView(drug._id)}>View</DropdownItem>
                <DropdownItem onClick={() => handleEdit(drug._id)}>Edit</DropdownItem>
                <DropdownItem onClick={() => handleDeleteClick(drug)}>Delete</DropdownItem>
              </DropdownMenu>
            </Dropdown>
          </div>
        );
      default:
        return cellValue;
    }
  }, []);

  const topContent = useMemo(() => {
    return (
      <div className="flex flex-col gap-4">
        <div className="flex justify-between gap-3 items-end">
          <Input
            isClearable
            classNames={{ base: "w-full sm:max-w-[44%]", inputWrapper: "border-1" }}
            placeholder="Search by tablet name..."
            size="sm"
            startContent={<FaSearch className="text-default-300" />}
            value={filterValue}
            variant="bordered"
            onClear={() => setFilterValue("")}
            onValueChange={setFilterValue}
          />
          <div className="flex gap-3">
            <Dropdown>
              <DropdownTrigger>
                <Button
                  endContent={<FaChevronDown className="text-small" />}
                  size="sm"
                  variant="flat"
                >
                  Columns
                </Button>
              </DropdownTrigger>
              <DropdownMenu
                disallowEmptySelection
                aria-label="Table Columns"
                closeOnSelect={false}
                selectedKeys={visibleColumns}
                selectionMode="multiple"
                onSelectionChange={(keys) => setVisibleColumns(new Set(keys))}
              >
                {drugColumns.map((column) => (
                  <DropdownItem key={column.uid} className="capitalize">
                    {capitalize(column.name)}
                  </DropdownItem>
                ))}
              </DropdownMenu>
            </Dropdown>
          </div>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-default-400 text-small">
            Total {filteredDrugs.length} drugs
          </span>
          <label className="flex items-center text-default-400 text-small">
            Rows per page:
            <select
              className="bg-transparent outline-none text-default-400 font-bold"
              onChange={(e) => setRowsPerPage(Number(e.target.value))}
            >
              <option className="bg-background" value={5}>
                5
              </option>
              <option className="bg-background" value={10}>
                10
              </option>
              <option className="bg-background" value={15}>
                15
              </option>
            </select>
          </label>
        </div>
      </div>
    );
  }, [filterValue, visibleColumns, filteredDrugs.length]);

  const bottomContent = (
    <Pagination
      isCompact
      showControls
      showShadow
      color="secondary"
      page={page}
      total={Math.ceil(filteredDrugs.length / rowsPerPage)}
      onChange={setPage}
    />
  );

  return (
    <>
      <Table
        aria-label="Drugs Table"
        bottomContent={bottomContent}
        topContent={topContent}
        classNames={{ wrapper: "min-h-[400px]" }}
        sortDescriptor={sortDescriptor}
        selectedKeys={selectedKeys}
        onSortChange={setSortDescriptor}
        onSelectionChange={setSelectedKeys}
      >
        <TableHeader columns={drugColumns.filter((col) => visibleColumns.has(col.uid))}>
          {(column) => (
            <TableColumn
              key={column.uid}
              align={column.uid === "actions" ? "center" : "start"}
              allowsSorting={column.sortable}
            >
              {column.name}
            </TableColumn>
          )}
        </TableHeader>
        <TableBody items={sortedItems}>
          {(item) => (
            <TableRow key={item._id}>
              {(columnKey) => (
                <TableCell>{renderCell(item, columnKey)}</TableCell>
              )}
            </TableRow>
          )}
        </TableBody>
      </Table>
      <WarningModal
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        onConfirm={handleDelete}
      />
    </>
  );
}
