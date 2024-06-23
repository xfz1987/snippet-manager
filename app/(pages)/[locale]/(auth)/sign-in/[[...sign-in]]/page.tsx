import { SignIn } from '@clerk/nextjs';
import { useLocale, useTranslations } from 'next-intl';

export default function Page() {
	const locale = useLocale();
	const t = useTranslations('auth.sign-in');

	// return <SignIn />

	return (
		<div>
			<h1>{t('title')}</h1>
			<SignIn path={`/${locale}${process.env.NEXT_PUBLIC_CLERK_SIGN_IN_URL}`} />;
		</div>
	);
}
