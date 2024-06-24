import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server';

import createMiddleware from 'next-intl/middleware';
import { LOCALES, DEFAULT_LOCALE } from './i18n';

// 国际化中间件
const intlMiddleware = createMiddleware({
	locales: LOCALES,
	defaultLocale: DEFAULT_LOCALE,
});

const isPublicRoute = createRouteMatcher([
	'/:locale/sign-in(.*)',
	'/sign-in(.*)',
	'/:locale/sign-up(.*)',
	'/sign-up(.*)',
	'/api/snippet(.*)',
]);

export default clerkMiddleware((auth, request) => {
	if (!isPublicRoute(request)) {
		auth().protect();
	}

	if (!request.url.includes('/api')) {
		return intlMiddleware(request);
	}
});

// 中间件匹配原则，不在这个范围内则不会执行 middleware 逻辑
export const config = {
	// matcher: ['/((?!.*\\..*|_next).*)', '/', '/(api|trpc)(.*)'],
	matcher: ['/((?!.+\\.[\\w]+$|_next).*)', '/', '/(api|trpc)(.*)'],
};
