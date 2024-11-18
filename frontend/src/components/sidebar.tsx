// Sidebar.js
"use client";

import Image from "next/image";
import { usePathname } from "next/navigation";
import NavElement from "@/components/nav-element";
import Button from "@/components/Button";
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {faBars} from "@fortawesome/free-solid-svg-icons";

const Sidebar = () => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const currentRoute = usePathname();

    const navItems = [
        { icon: "/grid.svg", text: "Dashboard", route: '/' },
        { icon: "/users.svg", text: "Administration", route: '/administration' },
        { icon: "/file.svg", text: "Chat Overview", route: '/chat-overview' },
        { icon: "/poles.svg", text: "Poles", route: '/pole' },
    ];

    const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

    return (
        <>
            {/* Small screen nav button */}
            <div className="md:hidden bg-primary p-4 text-white">
                <button onClick={toggleSidebar} className="focus:outline-none">
                    <FontAwesomeIcon
                        icon={faBars}
                        size={"xl"}
                    />
                </button>
            </div>

            {/* Sidebar */}
            <div className={`
                fixed top-0 left-0 h-full bg-primary pl-5 pt-10 flex flex-col justify-between
                transition-transform duration-300
                ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"}
                md:translate-x-0 md:w-64 lg:w-64 xl:w-72
                z-20
            `}>
                <div>
                    <Image src="/logo.svg" alt="logo" height={100} width={150} className="block" />
                    <div className="py-10 text-white">
                        {navItems.map((item, index) => (
                            <NavElement
                                key={index}
                                icon={item.icon}
                                text={item.text}
                                route={item.route}
                                isActive={currentRoute === item.route}
                            />
                        ))}
                    </div>
                </div>
                <div className="flex flex-col justify-center items-center gap-y-4 mb-10">
                    <Button text="Logout" />
                    <p className="font-semibold text-white">&copy; 2023 ACME ERP</p>
                </div>
            </div>

            {/* Overlay for small screens */}
            {isSidebarOpen && (
                <div
                    className="fixed inset-0 bg-black bg-opacity-50 md:hidden z-10"
                    onClick={toggleSidebar}
                ></div>
            )}
        </>
    );
};

export default Sidebar;
