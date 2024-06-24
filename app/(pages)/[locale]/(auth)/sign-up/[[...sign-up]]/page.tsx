import { SignUp } from '@clerk/nextjs';
import { useLocale } from 'next-intl';

export default function Page() {
	const locale = useLocale();
	// return <SignUp />;
	return <SignUp path={`/${locale}${process.env.NEXT_PUBLIC_CLERK_SIGN_UP_URL}`} />;
}
