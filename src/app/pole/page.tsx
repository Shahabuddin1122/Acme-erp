"use client"

import Sidebar from "@/components/sidebar";
import Header from "@/components/header";
import Button from "@/components/Button";
import PieChart from "@/components/piechart";
import Image from "next/image";
import {useState} from "react";
import AddPole from "@/components/add-pole";

const Page = () => {
    const [addPoleModel, setAddPoleModel] = useState<boolean>(false)
    return (
        <>
            <div className={'bg-secondary flex max-w-[2000px] mx-auto w-11/12'}>
                <Sidebar/>
                {addPoleModel && <AddPole toggleModel={()=> setAddPoleModel(false)}/>}
                <div className={'w-4/5 pl-10 pt-10 pr-2'}>
                    <Header/>
                    <div className={'py-4'}>
                        <Button text={'Add a pole'} onClick={()=> setAddPoleModel(true)}/>
                        <div className={'py-4 flex flex-wrap gap-4'}>
                            <div className={'w-[500px] bg-primary rounded-xl flex flex-col items-end'}>
                                <Image src={'/cross.svg'} alt={'cross'} height={10} width={20} className={'m-2'}/>
                                <div className={'w-4/5 flex justify-center'}>
                                    <PieChart/>
                                </div>
                            </div>
                            <div className={'w-[500px] bg-primary rounded-xl flex flex-col items-end'}>
                                <Image src={'/cross.svg'} alt={'cross'} height={10} width={20} className={'m-2'}/>
                                <div className={'w-4/5 flex justify-center'}>
                                    <PieChart/>
                                </div>
                            </div>
                            <div className={'w-[500px] bg-primary rounded-xl flex flex-col items-end'}>
                                <Image src={'/cross.svg'} alt={'cross'} height={10} width={20} className={'m-2'}/>
                                <div className={'w-4/5 flex justify-center'}>
                                    <PieChart/>
                                </div>
                            </div>
                            <div className={'w-[500px] bg-primary rounded-xl flex flex-col items-end'}>
                                <Image src={'/cross.svg'} alt={'cross'} height={10} width={20} className={'m-2'}/>
                                <div className={'w-4/5 flex justify-center'}>
                                    <PieChart/>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
export default Page;