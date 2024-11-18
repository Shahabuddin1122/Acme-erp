import Sidebar from "@/components/sidebar";
import Header from "@/components/header";

export default function Administration() {
    return (
        <>
            <div className={'flex bg-secondary'}>
                <Sidebar/>
                <div className="
                flex-1 p-10
                ml-0 md:ml-64 lg:ml-64 xl:ml-72
                transition-all duration-300
                min-h-screen
                ">
                    <Header/>

                </div>
            </div>
        </>
    );
}
