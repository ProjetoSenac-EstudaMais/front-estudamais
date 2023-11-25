import LoginModal from "../../components/modals/LoginModal";
import RegisterModal from "../../components/modals/RegisterModal";
import Navbar from "../../layout/navbar";

export default function Communities() {
    return (
        <div className="bg-[#F0F2F5] min-h-screen w-full">
            <Navbar />
            <LoginModal />
            <RegisterModal />
            <div className='flex w-full justify-center pt-[140px]'>

            </div>
        </div>
    )
}
