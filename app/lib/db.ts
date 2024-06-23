import { PrismaClient } from '@prisma/client';

const prismaClientSingleton = () => {
	return new PrismaClient();
};

declare global {
	var DB: undefined | ReturnType<typeof prismaClientSingleton>;
}

const DB = globalThis.DB ?? prismaClientSingleton();

export { DB };

if (process.env.NODE_ENV !== 'production') globalThis.DB = DB;
