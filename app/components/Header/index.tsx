'use client';

import { UserButton, useAuth } from '@clerk/nextjs';
import Image from 'next/image';
import Link from 'next/link';
import logoPng from '/public/logo.png';
import { useLocale } from 'next-intl';
import { TbWorld } from 'react-icons/tb';
import { usePathname, useRouter } from 'next/navigation';

export function Header() {
	const locale = useLocale();
	const router = useRouter();
	const pathname = usePathname();
	const { userId } = useAuth();

	const toggleLanguage = () => {
		router.replace(`${locale === 'en' ? '/cn' : '/en'}${pathname.split('/' + locale)[1]}`);
	};

	return (
		<header className="bg-main-700 p-8 flex justify-between items-center">
			<Link href="/">
				<Image
					src={logoPng}
					alt="Logo"
					width={192}
					priority
				/>
			</Link>
			<div className="flex items-center justify-center space-x-12">
				<TbWorld
					onClick={toggleLanguage}
					className="text-white hover:text-white/80 cursor-pointer"
				/>
				{userId && <UserButton afterSignOutUrl={`/${locale}${process.env.NEXT_PUBLIC_CLERK_SIGN_IN_URL}`} />}
			</div>
		</header>
	);
}
