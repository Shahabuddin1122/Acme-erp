"use client"
import Image from "next/image";
import PieChart from "@/components/piechart";
import axios, {AxiosRequestConfig} from "axios";
import {baseUrl} from "@/utils/constant";
import {useState} from "react";
import Confirmation from "@/components/confirmation";

const PieChartComponent = ({data}: {data: QuestionData}) => {
    const [showModal, setShowModal] = useState(false);

    const optionsArray = data.options;
    const voteCountsArray = optionsArray.map(option => data.option_counts[option]);

    const delete_pole = async ()=>{
        const val = {
            "question": data.question
        }
        const config: AxiosRequestConfig = {
            data: val
        };
        await axios.delete(`${baseUrl}/manager/delete-pole`, config)
            .then((res)=>{
                console.log(res)
                setShowModal(false)
            })
            .catch((err)=>{
                console.error(err)
            })
    }
    return (
        <>
            <div className={'lg:w-2/5 w-full bg-primary rounded-xl relative'}>
                <p className={'text-white font-semibold m-4 w-5/6'}>{data.question}</p>
                <Image
                    src={'/cross.svg'}
                    alt={'cross'}
                    height={10}
                    width={20}
                    className={'absolute top-2 right-2 cursor-pointer'}
                    onClick={()=> setShowModal(true)}
                />
                <div className={'w-full flex justify-center'}>
                    <PieChart labels={optionsArray} value={voteCountsArray}/>
                </div>
            </div>
            {showModal && (
                <Confirmation delete_pole={delete_pole} cancel_delete={()=> setShowModal(false)}/>
            )}
        </>
    )
}
export default PieChartComponent