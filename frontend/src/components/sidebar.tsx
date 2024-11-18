// Sidebar.js
"use client";

import Image from "next/image";
import { usePathname } from "next/navigation";
import NavElement from "@/components/nav-element";
import Button from "@/components/Button";

const Sidebar = () => {
    const currentRoute = usePathname();

    const navItems = [
        { icon: "/grid.svg", text: "Dashboard", route: '/' },
        { icon: "/users.svg", text: "Administration", route: '/administration' },
        { icon: "/file.svg", text: "Chat Overview", route: '/chat-overview' },
        { icon: "/poles.svg", text: "Poles", route: '/pole' },
    ];

    return (
        <div className="
            fixed top-0 left-0 h-full bg-primary pl-5 pt-10 flex flex-col justify-between
            w-0 md:w-64 lg:w-64 xl:w-72 transition-all duration-300
        ">
            <div>
                <Image src="/logo.svg" alt="logo" height={100} width={150} />
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
    );
};

export default Sidebar;
