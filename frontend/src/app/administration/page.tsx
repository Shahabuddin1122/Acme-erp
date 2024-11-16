import Sidebar from "@/components/sidebar";
import Header from "@/components/header";

export default function Administration() {
    return (
        <>
            <div className={'bg-secondary flex max-w-[2000px] mx-auto w-11/12'}>
                <Sidebar/>
                <div className={'w-4/5 h-screen pl-10 pt-10 pr-2'}>
                    <Header/>

                </div>
            </div>
        </>
    );
}
