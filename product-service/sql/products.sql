CREATE TABLE IF NOT EXISTS store.products (
	id uuid NOT NULL,
	title text NOT NULL,
	description text NULL,
	price int4 NOT NULL,
	CONSTRAINT products_pk PRIMARY KEY (id)
);