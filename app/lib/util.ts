import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { NextRequest } from 'next/server';

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs));
}

export function getQueryParams<T>(req: NextRequest) {
	return Object.fromEntries(req.nextUrl.searchParams) as T;
}
