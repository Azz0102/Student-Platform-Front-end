import { Header } from "@/components/Header";
import { NavBar } from "@/components/NavBar";
export default function Layout({ children }) {
    return (
        <div className="flex min-h-screen w-full flex-col bg-muted/40">
            <NavBar />
            <div className="flex flex-col sm:gap-4 sm:py-4 sm:pl-14">
                <Header />
                <>{children}</>
            </div>
        </div>
    );
}
