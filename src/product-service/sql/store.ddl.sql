CREATE TABLE IF NOT EXISTS store.products (
	id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
	title text NOT NULL,
	description text NULL,
	price int4 NOT NULL
);

CREATE TABLE IF NOT EXISTS store.stocks (
	id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
	product_id uuid NOT NULL,
	count int4 NOT NULL,
	CONSTRAINT stocks_un UNIQUE (product_id),
	CONSTRAINT stocks_fk foreign KEY (product_id) REFERENCES store.products(id)
);