const BD_URL = process.env.BD_URL;

if (!BD_URL) {
    throw new Error('BD_URL environment variable is not set');
}

const settings = {
    dbUrl: BD_URL,
};

export { settings };