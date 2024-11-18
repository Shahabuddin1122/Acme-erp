"use client";

import Sidebar from "@/components/sidebar";
import Header from "@/components/header";
import useSWR from "swr";
import { fetcher } from "@/utils/fetcher";
import {baseUrl} from "@/utils/constant";


const Page = () => {
    const { data, error, isLoading } = useSWR<QueriesType[]>(`${baseUrl}/manager/get-top-queries`, fetcher, { refreshInterval: 1000 });


    return (
        <div className={'flex bg-secondary'}>
            <Sidebar />
            <div className="
                flex-1 p-10
                ml-0 md:ml-64 lg:ml-64 xl:ml-72
                transition-all duration-300
                min-h-screen
                ">
                <Header/>
                <div className={'py-4 text-white'}>
                    <h1 className={'text-xl font-bold'}>Top User Prompts</h1>
                    <div className="overflow-x-auto py-4">
                        <table className="min-w-full border border-gray-300">
                            <thead>
                            <tr className="bg-primary">
                                <th className="px-4 py-2 border text-center">No</th>
                                <th className="px-4 py-2 border text-left">Prompt</th>
                            </tr>
                            </thead>
                            <tbody>
                            {isLoading && (
                                <tr>
                                    <td colSpan={2} className="px-4 py-2 border text-center">Loading...</td>
                                </tr>
                            )}
                            {error && (
                                <tr>
                                    <td colSpan={2} className="px-4 py-2 border text-center">Error loading data</td>
                                </tr>
                            )}
                            {!isLoading && !error && data && (data || []).map((query, index) => (
                                <tr key={query._id}>
                                    <td className="px-4 py-2 border text-center">{index + 1}</td>
                                    <td className="px-4 py-2 border">{query.name}</td>
                                </tr>
                            ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Page;
