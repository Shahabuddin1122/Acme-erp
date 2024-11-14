"use client"

import { useState } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark,faPlus } from '@fortawesome/free-solid-svg-icons';
import Button from "@/components/Button";

const AddPole = ({toggleModel}:{toggleModel:()=> void}) => {
    const [options, setOptions] = useState<string[]>([]);
    const [newOption, setNewOption] = useState<string>("");

    const handleAddOption = () => {
        if (newOption.trim()) {
            setOptions([...options, newOption]);
            setNewOption("");
        }
    };

    const handleDeleteOption = (index: number) => {
        setOptions(options.filter((_, i) => i !== index));
    };

    const storeToDatabase = ()=>{
        console.log("Clicked")
        toggleModel()
    }

    return (
        <>
            <div className="fixed inset-0 bg-white opacity-30"></div>
            <div className="fixed inset-0 flex items-center justify-center">
                <div className="w-[800px] bg-primary rounded-xl relative">
                    <FontAwesomeIcon
                        icon={faXmark}
                        size="2x"
                        color={"white"}
                        className="absolute top-2 right-2 cursor-pointer"
                        onClick={toggleModel}
                    />
                    <div className={'p-4 text-white'}>
                        <h1 className={'text-2xl font-bold py-6'}>Add a pole</h1>
                        <div className={'flex flex-col gap-y-2'}>
                            <p>Write a question</p>
                            <textarea placeholder={'write a pole question'} className={'px-4 py-2 rounded-md w-1/2 max-h-[200px] min-h-[100px] text-black'}/>
                        </div>
                        <div className={'py-6 flex flex-col gap-y-2'}>
                            <p>Add options</p>
                            {options.map((option, index) => (
                                <div key={index} className="flex items-center w-1/2 mb-2 relative">
                                    <input
                                        value={option}
                                        readOnly
                                        className="px-4 py-2 pr-2 rounded-md w-full text-black"
                                    />
                                    <FontAwesomeIcon
                                        icon={faXmark}
                                        size="lg"
                                        color="red"
                                        className="cursor-pointer ml-2 absolute right-2"
                                        onClick={() => handleDeleteOption(index)}
                                    />
                                </div>
                            ))}
                            <input
                                type="text"
                                value={newOption}
                                onChange={(e) => setNewOption(e.target.value)}
                                placeholder="Write an option"
                                className="px-4 py-2 rounded-md w-1/2 text-black mb-2"
                            />
                            <div
                                onClick={handleAddOption}
                                className={'w-36 h-12 bg-white rounded-md flex justify-center items-center'}>
                                <FontAwesomeIcon icon={faPlus} color={'black'} size={"2x"}/>
                            </div>
                        </div>
                        <div className={'flex gap-x-2 absolute right-4 bottom-5'}>
                            <Button text={"Discard"} onClick={toggleModel}/>
                            <Button text={"Publish"} onClick={storeToDatabase}/>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
export default AddPole;