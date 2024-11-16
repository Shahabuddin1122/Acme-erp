"use client";

import { useState } from "react";
import Button from "@/components/Button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark, faPlus } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import {baseUrl} from "@/utils/constant";

const AddPole = ({ toggleModel }: { toggleModel: () => void }) => {
    const [options, setOptions] = useState<string[]>([]);
    const [question, setQuestion] = useState<string>("");

    const handleAddOption = () => {
        setOptions([...options, ""]);
    };

    const handleOptionChange = (index: number, value: string) => {
        const updatedOptions = options.map((option, i) =>
            i === index ? value : option
        );
        setOptions(updatedOptions);
    };

    const handleDeleteOption = (index: number) => {
        setOptions(options.filter((_, i) => i !== index));
    };

    const storeToDatabase = async () => {
        const data = {
            question,
            options,
        };
        await axios.post(`${baseUrl}/manager/create-pole`, data)
            .then((res)=>{
                console.log(res)
                toggleModel()
            })
            .catch(err => console.error(err))
    };

    return (
        <>
            <div className="fixed inset-0 bg-white opacity-30 z-10"></div>
            <div className="fixed inset-0 flex items-center justify-center z-20">
                <div className="w-[800px] bg-primary rounded-xl relative">
                    <FontAwesomeIcon
                        icon={faXmark}
                        size="2x"
                        color="white"
                        className="absolute top-2 right-2 cursor-pointer"
                        onClick={toggleModel}
                    />
                    <div className="p-4 text-white">
                        <h1 className="text-2xl font-bold py-6">Add a pole</h1>
                        <div className="flex flex-col gap-y-2">
                            <p>Write a question</p>
                            <textarea
                                placeholder="write a pole question"
                                className="px-4 py-2 rounded-md w-1/2 max-h-[200px] min-h-[100px] text-black"
                                value={question}
                                onChange={(event) => setQuestion(event.target.value)}
                            />
                        </div>
                        <div className="py-6 flex flex-col gap-y-2">
                            <p>Add options</p>
                            {options.map((option, index) => (
                                <div key={index} className="flex items-center w-1/2 mb-2 relative">
                                    <input
                                        value={option}
                                        autoFocus={true}
                                        onChange={(e) => handleOptionChange(index, e.target.value)}
                                        placeholder="Write an option"
                                        className="px-4 py-2 pr-2 rounded-md w-full text-black"
                                    />
                                    <FontAwesomeIcon
                                        icon={faXmark}
                                        size="lg"
                                        color="red"
                                        className="cursor-pointer ml-2"
                                        onClick={() => handleDeleteOption(index)}
                                    />
                                </div>
                            ))}
                            <div
                                onClick={handleAddOption}
                                className="w-36 h-12 bg-white rounded-md flex justify-center items-center cursor-pointer"
                            >
                                <FontAwesomeIcon icon={faPlus} color="black" size="xl" />
                            </div>
                        </div>
                        <div className="flex gap-x-2 absolute right-4 bottom-5">
                            <Button text="Discard" onClick={toggleModel} />
                            <Button text="Publish" onClick={storeToDatabase} />
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default AddPole;
