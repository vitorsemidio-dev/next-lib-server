declare namespace Express {
	export interface Request {
		user: {
			id: string;
		};
		library: {
			id: string;
		};
	}
}
