interface Repository<T> {
	getAll(): Promise<T[]>;
	getByID(id: number): Promise<T>;
	create(user: T): Promise<T>;
	update(user: T): Promise<T>;
	delete(user: T): Promise<T>;
}

export default Repository;
