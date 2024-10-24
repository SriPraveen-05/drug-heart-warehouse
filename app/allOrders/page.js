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
import {
  FaSearch,
  FaChevronDown,
  FaEllipsisV,
  FaShoppingCart,
  FaBoxOpen,
  FaTruckMoving,
  FaMotorcycle,
  FaCheckCircle,
  FaTimesCircle,
  FaUndoAlt,
  FaHourglassHalf,
  FaQuestionCircle,
  FaShip,
} from "react-icons/fa";
import axios from "axios";
import { useRouter } from "next/navigation";
import WarningModal from "../Warning"; // Ensure this component exists

// Define columns for the Order table
const orderColumns = [
  { name: "TABLET NAME", uid: "tabletName", sortable: true },
  { name: "CUSTOMER NAME", uid: "buyer", sortable: true },
  { name: "TOTAL AMOUNT ($)", uid: "price", sortable: true },
  { name: "STATUS", uid: "status", sortable: true },
  { name: "ACTIONS", uid: "actions" },
];

const INITIAL_VISIBLE_COLUMNS = [
  "tabletName",
  "buyer",
  "price",
  "status",
  "actions",
];

// Status Icons Mapping
const statusIcons = {
  "order placed": <FaShoppingCart className="text-blue-500" />,
  "order packed": <FaBoxOpen className="text-orange-500" />,
  "in-transit": <FaTruckMoving className="text-purple-500" />,
  "out for delivery": <FaMotorcycle className="text-green-500" />,
  pending: <FaHourglassHalf className="text-gray-500" />,
  shipped: <FaShip className="text-blue-500" />,
  delivered: <FaCheckCircle className="text-green-500" />,
  cancelled: <FaTimesCircle className="text-red-500" />,
  returned: <FaUndoAlt className="text-yellow-500" />,
};

export default function OrdersTable() {
  const [orders, setOrders] = useState([]);
  const [filterValue, setFilterValue] = useState("");
  const [selectedKeys, setSelectedKeys] = useState(new Set([]));
  const [visibleColumns, setVisibleColumns] = useState(
    new Set(INITIAL_VISIBLE_COLUMNS)
  );
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [sortDescriptor, setSortDescriptor] = useState({
    column: "tabletName",
    direction: "ascending",
  });
  const [page, setPage] = useState(1);
  const router = useRouter();

  // Modal control state
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [orderToDelete, setOrderToDelete] = useState(null);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await axios.get("/api/orders");
        if (response.data.success) {
          setOrders(response.data.orders);
        } else {
          console.error("Failed to fetch orders:", response.data);
        }
      } catch (error) {
        console.error("Failed to fetch orders:", error);
      }
    };

    fetchOrders();
  }, []);

  // Function to handle the delete action with modal confirmation
  const handleDelete = async () => {
    if (!orderToDelete) return;

    try {
      const response = await axios.delete(`/api/orders/${orderToDelete._id}`);
      if (response.data.success) {
        setOrders(orders.filter((order) => order._id !== orderToDelete._id));
        setOrderToDelete(null);
        setIsModalOpen(false);
      } else {
        console.error("Failed to delete order:", response.data);
      }
    } catch (error) {
      console.error("Failed to delete order:", error);
    }
  };

  // Function to trigger the deletion modal
  const handleDeleteClick = (order) => {
    setOrderToDelete(order);
    setIsModalOpen(true);
  };

  const handleView = (id) => {
    router.push(`/orders/${id}`);
  };

  const handleEdit = (id) => {
    router.push(`/orders/edit/${id}`);
  };

  const filteredOrders = useMemo(() => {
    return orders.filter((order) =>
      order.drugId.tabletName.toLowerCase().includes(filterValue.toLowerCase())
    );
  }, [orders, filterValue]);

  const items = useMemo(() => {
    const start = (page - 1) * rowsPerPage;
    const end = start + rowsPerPage;
    return filteredOrders.slice(start, end);
  }, [page, filteredOrders, rowsPerPage]);

  const sortedItems = useMemo(() => {
    return [...items].sort((a, b) => {
      let first;
      let second;

      if (sortDescriptor.column === "tabletName") {
        first = a.drugId.tabletName.toLowerCase();
        second = b.drugId.tabletName.toLowerCase();
      } else {
        first = a[sortDescriptor.column];
        second = b[sortDescriptor.column];
      }

      const cmp = first < second ? -1 : first > second ? 1 : 0;
      return sortDescriptor.direction === "descending" ? -cmp : cmp;
    });
  }, [sortDescriptor, items]);

  const renderCell = useCallback((order, columnKey) => {
    switch (columnKey) {
      case "tabletName":
        return <span>{order.drugId.tabletName}</span>;

      case "buyer":
        return <span>{order.buyer}</span>;

      case "price":
        return <span>${order.price.toFixed(2)}</span>;

      case "status":
        return (
          <div className="flex items-center gap-2">
            {statusIcons[order.status] || <FaQuestionCircle className="text-gray-500" />}
            <span className="capitalize">{order.status}</span>
          </div>
        );

      case "actions":
        return (
          <div className="flex justify-center items-center gap-2">
            <Dropdown>
              <DropdownTrigger>
                <Button isIconOnly radius="full" size="sm" variant="light">
                  <FaEllipsisV className="text-default-400" />
                </Button>
              </DropdownTrigger>
              <DropdownMenu aria-label="Actions">
                <DropdownItem onClick={() => handleView(order._id)}>
                  View
                </DropdownItem>
                <DropdownItem onClick={() => handleEdit(order._id)}>
                  Edit
                </DropdownItem>
                <DropdownItem
                  color="danger"
                  onClick={() => handleDeleteClick(order)}
                >
                  Delete
                </DropdownItem>
              </DropdownMenu>
            </Dropdown>
          </div>
        );

      default:
        return <span>{order[columnKey]}</span>;
    }
  }, []);

  const topContent = useMemo(() => {
    return (
      <div className="flex flex-col gap-4">
        <div className="flex justify-between gap-3 items-end">
          <Input
            isClearable
            classNames={{
              base: "w-full sm:max-w-[44%]",
              inputWrapper: "border-1",
            }}
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
                {orderColumns.map((column) => (
                  <DropdownItem key={column.uid} className="capitalize">
                    {column.name}
                  </DropdownItem>
                ))}
              </DropdownMenu>
            </Dropdown>
          </div>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-default-400 text-small">
            Total {filteredOrders.length} orders
          </span>
          <label className="flex items-center text-default-400 text-small">
            Rows per page:
            <select
              className="bg-transparent outline-none text-default-400 font-bold ml-2"
              value={rowsPerPage}
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
  }, [filterValue, visibleColumns, filteredOrders.length, rowsPerPage]);

  const bottomContent = (
    <Pagination
      isCompact
      showControls
      showShadow
      color="secondary"
      page={page}
      total={Math.ceil(filteredOrders.length / rowsPerPage)}
      onChange={setPage}
    />
  );

  return (
    <>
      <Table
        aria-label="Orders Table"
        bottomContent={bottomContent}
        topContent={topContent}
        classNames={{ wrapper: "min-h-[400px]" }}
        sortDescriptor={sortDescriptor}
        selectedKeys={selectedKeys}
        onSortChange={setSortDescriptor}
        onSelectionChange={setSelectedKeys}
      >
        <TableHeader
          columns={orderColumns.filter((col) => visibleColumns.has(col.uid))}
        >
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

      {/* Warning Modal for Delete Confirmation */}
      {isModalOpen && (
        <WarningModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          onConfirm={handleDelete}
          title="Delete Order"
          description="Are you sure you want to delete this order? This action cannot be undone."
        />
      )}
    </>
  );
}
