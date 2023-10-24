interface Repository<T> {
	list(): Promise<T[]>;
}

export default Repository;
