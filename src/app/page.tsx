import Sidebar from "@/components/sidebar";
import Header from "@/components/header";

export default function Home() {
  return (
    <>
        <div className={'bg-secondary flex'}>
            <Sidebar/>
            <div className={'w-full h-screen pl-10 pt-10 pr-2'}>
                <Header/>

            </div>
        </div>
    </>
  );
}
