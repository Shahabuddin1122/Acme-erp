"use client";

import Sidebar from "@/components/sidebar";
import Header from "@/components/header";
import useSWR from "swr";
import { fetcher } from "@/utils/fetcher";


const Page = () => {
    const { data, error, isLoading } = useSWR<QueriesType[]>("http://localhost:8000/manager/get-top-queries", fetcher, { refreshInterval: 1000 });


    return (
        <div className={'bg-secondary flex max-w-[2000px] mx-auto w-11/12'}>
            <Sidebar />
            <div className={'w-4/5 h-screen pl-10 pt-10 pr-2'}>
                <Header />
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
