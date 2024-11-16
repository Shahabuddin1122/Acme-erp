"use client"

import Sidebar from "@/components/sidebar";
import Header from "@/components/header";
import Button from "@/components/Button";
import {useState} from "react";
import AddPole from "@/components/add-pole";
import useSWR from "swr";
import {fetcher} from "@/utils/fetcher";
import PieChartComponent from "@/components/pie-chart-component";
import {baseUrl} from "@/utils/constant";

const Page = () => {
    const [addPoleModel, setAddPoleModel] = useState<boolean>(false)
    const { data, isLoading, error} = useSWR<SurveyData>(`${baseUrl}/manager/get-pole`, fetcher, { refreshInterval: 1000 })

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
                            {isLoading && <p className={"text-center font-bold text-2xl text-white"}>Data Loading.......</p>}
                            {!isLoading && !error && data && (data || []).map((value, index)=>(
                                <PieChartComponent key={index} data={value}/>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
export default Page;