import app from './index';

const SERVER_PORT = 3333;

app.listen(SERVER_PORT, () =>
	console.log(`Server is running on port ${SERVER_PORT}`),
);
