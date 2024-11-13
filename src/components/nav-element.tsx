"use client";

import Image from "next/image";

const NavElement = ({ icon, text, isActive, onClick }:{icon:string, text:string, isActive:boolean, onClick:()=> void}) => {
    return (
        <div
            className={`flex gap-x-4 py-2 cursor-pointer ${isActive ? 'rounded-l-full bg-secondary' : ''} px-4 my-4`}
            onClick={onClick}
        >
            <Image src={icon} alt={text} width={25} height={25} />
            <h1 className="text-lg">{text}</h1>
        </div>
    );
};

export default NavElement;
