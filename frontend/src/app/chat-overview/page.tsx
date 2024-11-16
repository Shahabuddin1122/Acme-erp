
import Sidebar from "@/components/sidebar";
import Header from "@/components/header";
import axios from "axios";

const page = () => {
    axios.get('http://localhost:8000/manager/get-top-queries')
        .then((res)=>{
            console.log(res)
        })
        .catch((err)=>{
            console.log(err)
        })
    return (
        <>
            <div className={'bg-secondary flex max-w-[2000px] mx-auto w-11/12'}>
                <Sidebar/>
                <div className={'w-4/5 h-screen pl-10 pt-10 pr-2'}>
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
                                <tr>
                                    <td className="px-4 py-2 border text-center">1</td>
                                    <td className="px-4 py-2 border">Sample prompt text here</td>
                                </tr>
                                <tr>
                                    <td className="px-4 py-2 border text-center">2</td>
                                    <td className="px-4 py-2 border">Another prompt text example</td>
                                </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
export default page;