import { Header } from '@/app/components/Header';
import { Nav } from '@/app/components/Nav';

export default function MainLayout({ children }: { children: Readonly<React.ReactNode> }) {
	return (
		<div>
			<Header />
			<div className="flex p-8">
				<Nav />
				<div className="w-full pl-8">{children}</div>
			</div>
		</div>
	);
}
