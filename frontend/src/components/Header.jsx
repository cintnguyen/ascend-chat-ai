import React from "react";
import {Navbar, NavbarBrand, NavbarContent, NavbarItem, Link} from "@nextui-org/react";
import Skull from "../assets/skull.png"

export default function Header() {

    const navStyling = {
        background: "#ed1c24",
        color: "#FFFFFF"
    }

    const navLinks= [
        {title: "Home", href: "#"},
        {title: "Login", href: "#"}
    ]
    return(
        <Navbar style={navStyling} className="resilient-font w-screen">
        <NavbarBrand>
            <img src={Skull} alt="Resilient Coder's trademark skull logo" className="w-12" />
            <span className="px-1 mx-1">Resilient Ascend</span>
        </NavbarBrand>
        <NavbarContent className="flex justify-center">
            {navLinks.map((link) => (
                <NavbarItem key={link.title} className="mx-10">
                    <Link href={link.href} style={{color: "#FFFFFF"}}>{link.title}</Link>
                </NavbarItem>
            ))}
        </NavbarContent>
    </Navbar>
    )
    
}