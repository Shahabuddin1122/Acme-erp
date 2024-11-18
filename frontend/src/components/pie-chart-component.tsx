import Image from "next/image";
import PieChart from "@/components/piechart";

const PieChartComponent = ({data}: {data: QuestionData}) => {
    const optionsArray = data.options;
    const voteCountsArray = optionsArray.map(option => data.option_counts[option]);

    return (
        <>
            <div className={'lg:w-2/5 w-full bg-primary rounded-xl relative'}>
                <p className={'text-white font-semibold m-4 w-5/6'}>{data.question}</p>
                <Image src={'/cross.svg'} alt={'cross'} height={10} width={20} className={'absolute top-2 right-2'}/>
                <div className={'w-full flex justify-center'}>
                    <PieChart labels={optionsArray} value={voteCountsArray}/>
                </div>
            </div>
        </>
    )
}
export default PieChartComponent