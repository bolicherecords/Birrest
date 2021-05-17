export interface Order {
	id: string;
	client_name: string;
	client_phone: string;
	client_email: string;
	product_name: string;
	status: OrderStatus;
}

export enum OrderStatus {
	CREATED = "CREADA",
	IN_PROGRESS = "PREPARACION",
	TRANSIT = "TRANSITO",
	DONE = "FINALIZADA",
}
