interface Repository<T> {
	getAll(): Promise<T[]>;
	getByID(id: number): Promise<T>;
	create(obj: T): Promise<T>;
	update(obj: T): Promise<T>;
	delete(id: number): Promise<T>;
}

export default Repository;
