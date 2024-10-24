"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  NavbarMenuToggle,
  NavbarMenu,
  NavbarMenuItem,
  Link,
} from "@nextui-org/react";
import { SignInButton, SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
import {
  FaHome,
  FaBoxes,
  FaCoins,
  FaBox,
  FaUsers,
  FaEnvelope,
} from "react-icons/fa";
import { GiMedicines,GiMedicinePills } from "react-icons/gi";
import { GrUpdate } from "react-icons/gr";
import { MdVerifiedUser} from "react-icons/md";
export default function Header() {
  const router = useRouter();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(); // State for tracking active menu item

  const menuItems = [
    { name: "Home", icon: <FaHome />, path: "/" },
    { name: "place order", icon: <FaBox />, path: "/orders/create" },
    { name: "orders", icon: <FaBoxes />, path: "/allOrders" },
    { name: "Add drug", icon: <GiMedicinePills />, path: "/drugs/create" },
    { name: "drugs", icon: <GiMedicines />, path: "/allDrugs" },
    { name: "verification", icon: <MdVerifiedUser />, path: "/verify" },
    { name: "update status", icon: <GrUpdate />, path: "/orders/status" },
    { name: "Team Page", icon: <FaUsers />, path: "/team" },
    { name: "Contact Us", icon: <FaEnvelope />, path: "/contact_us" },
  ];

  const handleNavigation = (path, index) => {
    setActiveIndex(index); // Set the active index when a menu item is clicked
    router.push(path);
  };

  return (
    <Navbar className="z-50" onMenuOpenChange={setIsMenuOpen}>
      <NavbarContent>
        <NavbarMenuToggle
          aria-label={isMenuOpen ? "Close menu" : "Open menu"}
          className="sm:hidden"
        />
        <NavbarBrand>
          <img src="logo.png" alt="Logo" className="h-12 w-10" />
          <p className="font-bold text-inherit ml-1">DRUG HEART</p>
        </NavbarBrand>
      </NavbarContent>

      <NavbarContent justify="end">
        <NavbarItem className="lg:flex">
          <SignedOut>
            <SignInButton mode="modal" />
          </SignedOut>
          <SignedIn>
            <UserButton />
          </SignedIn>
        </NavbarItem>
      </NavbarContent>
      <NavbarMenu>
        {menuItems.map((item, index) => (
          <NavbarMenuItem key={`${item.name}-${index}`}>
            <Link
              color={activeIndex === index ? "primary" : "foreground"} // Apply primary color to the active item
              className="w-full flex items-center cursor-pointer"
              onClick={() => handleNavigation(item.path, index)}
              size="lg"
            >
              {item.icon}
              <span className="ml-2">{item.name}</span>
            </Link>
          </NavbarMenuItem>
        ))}
      </NavbarMenu>
    </Navbar>
  );
}
