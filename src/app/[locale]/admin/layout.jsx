import AdminHeader from "@/components/AdminHeader";
import AdminNavBar from "@/components/AdminNavBar";
export default function Layout({ children }) {
	return (
		<div className='flex min-h-screen w-full flex-col bg-muted/40'>
			<AdminNavBar />
			<div className='flex flex-col sm:gap-4 sm:py-4 sm:pl-14'>
				<AdminHeader />
				<>{children}</>
			</div>
		</div>
	);
}
