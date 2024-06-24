type Messages = typeof import('./messages/en.json');
declare interface IntlMessages extends Messages {}

declare module '*.png' {
	const src: string;
	export default src;
}
