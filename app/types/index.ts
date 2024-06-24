export type ApiResponse<T> =
	| {
			data: null;
			message?: string;
			status?: number;
			success: false;
	  }
	| { data: T | null; message?: string; sucess?: true; status?: number };
