// Page.js
"use client";

import Sidebar from "@/components/sidebar";
import Header from "@/components/header";
import Button from "@/components/Button";
import { useState } from "react";
import AddPole from "@/components/add-pole";
import useSWR from "swr";
import { fetcher } from "@/utils/fetcher";
import PieChartComponent from "@/components/pie-chart-component";
import { baseUrl } from "@/utils/constant";

const Page = () => {
    const [addPoleModel, setAddPoleModel] = useState<boolean>(false);
    const { data, isLoading, error } = useSWR<SurveyData>(`${baseUrl}/manager/get-pole`, fetcher, { refreshInterval: 1000 });

    return (
        <div className="flex bg-secondary">
            <Sidebar />
            <div className="
                flex-1 p-10
                ml-0 md:ml-64 lg:ml-64 xl:ml-72
                transition-all duration-300
                min-h-screen
            ">
                <Header/>
                {addPoleModel && <AddPole toggleModel={() => setAddPoleModel(false)}/>}
                <div className="py-4">
                    <Button text="Add a pole" onClick={() => setAddPoleModel(true)}/>
                    <div className="py-4 flex flex-wrap gap-4">
                        {isLoading && <p className="text-center font-bold text-2xl text-white">Data Loading.......</p>}
                        {!isLoading && !error && data && (data || []).map((value, index) => (
                            <PieChartComponent key={index} data={value}/>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Page;
