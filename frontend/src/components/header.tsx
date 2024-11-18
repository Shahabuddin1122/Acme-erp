"use client";
import { useState } from "react";
import Image from "next/image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";

const Header = () => {
    const [isSearchOpen, setIsSearchOpen] = useState(false);

    return (
        <div className="flex items-center justify-between bg-secondary">
            <h1 className="text-white font-bold text-lg md:text-xl lg:text-2xl">ACME AI LTD</h1>
            <div className={`flex items-center ${isSearchOpen ? "w-full" : "w-auto"} transition-all duration-300`}>
                {isSearchOpen || (
                    <div className="hidden md:flex items-center shadow-xl border border-primary rounded-full gap-x-2 px-2 w-[18rem] lg:w-[30rem]">
                        <input
                            placeholder="Search...."
                            className="w-full px-2 py-1 bg-transparent outline-none text-white placeholder-gray-300"
                        />
                        <Image src="/search.svg" alt="search" width={20} height={20} />
                    </div>
                )}
                {isSearchOpen && (
                    <div className="flex items-center shadow-xl border border-primary rounded-full gap-x-2 px-2 w-full md:hidden">
                        <input
                            placeholder="Search...."
                            className="w-full px-2 py-1 bg-transparent outline-none text-white placeholder-gray-300"
                        />
                        <button onClick={() => setIsSearchOpen(false)}>
                            <FontAwesomeIcon icon={faArrowLeft} color="white" />
                        </button>
                    </div>
                )}
            </div>

            <div className="flex items-center gap-x-4">
                {!isSearchOpen && (
                    <button onClick={() => setIsSearchOpen(true)} className="md:hidden">
                        <Image src="/search.svg" alt="search" width={24} height={24} />
                    </button>
                )}

                {!isSearchOpen && (
                    <>
                        <Image src="/message.svg" alt="message" width={20} height={20} />
                        <Image src="/notification.svg" alt="notification" width={20} height={20} />
                    </>
                )}
            </div>
        </div>
    );
};

export default Header;
