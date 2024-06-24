// INSERT INTO Snippet (userId,title,language,technology,content) VALUES ("user_2iB1K44D95bzc3Q2QVAhRkTVDFY","Display hello in python", "python", "python", "print(""Hello World!"");" )

const { db } = require('@vercel/postgres');

async function seedSnippets(client) {
	const userId = 'user_2iB1K44D95bzc3Q2QVAhRkTVDFY';
	const title = 'Display hello in python';
	const language = 'python';
	const technology = 'python';
	const content = 'print(""Hello World!"");';
	try {
		return client.sql`
        INSERT INTO Snippet (userId, title, language, technology, content)
        VALUES (${userId}, ${title}, ${language}, ${technology}, ${content})
        ON CONFLICT (id) DO NOTHING;
    `;
	} catch (error) {
		console.error('Error seeding snippets:', error);
		throw error;
	}
}

async function main() {
	const client = await db.connect();

	await seedSnippets(client);

	await client.end();
}

main().catch(err => {
	console.error('An error occurred while attempting to seed the database:', err);
});
