import Image from "next/image";

const Header = () => {
    return (
        <>
            <div className={'flex items-center justify-between'}>
                <h1 className={'text-white font-bold '}>ACME AI LTD</h1>
                <div className={'shadow-xl border border-primary rounded-full flex gap-x-2 px-2'}>
                    <input placeholder={'Search....'} className={'w-full px-2 py-1 bg-transparent outline-0 text-white'}/>
                    <Image src={'/search.svg'} alt={'search'} width={20} height={20} />
                </div>
                <div className={'flex items-center gap-x-4'}>
                    <Image src={'/message.svg'} alt={'message'} width={20} height={20} />
                    <Image src={'/notification.svg'} alt={'notification'} width={20} height={20} />
                </div>
            </div>
        </>
    )
}
export default Header