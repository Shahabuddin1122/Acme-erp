"use client";

import Image from "next/image";
import Link from "next/link";

const NavElement = ({ icon, text, isActive, route }:{icon:string, text:string, isActive:boolean, route:string}) => {
    return (
        <Link href={route}>
            <div
                className={`flex gap-x-4 py-2 cursor-pointer px-4 my-4 ${
                    isActive ? 'rounded-l-full bg-secondary' : ''
                }`}
            >
                <Image src={icon} alt={text} width={25} height={25} />
                <h1 className="text-lg">{text}</h1>
            </div>
        </Link>
    );
};

export default NavElement;
