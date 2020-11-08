CREATE TABLE IF NOT EXISTS store.stocks (
	product_id uuid NOT NULL,
	count int4 NOT NULL,
	CONSTRAINT stocks_fk foreign KEY (product_id) REFERENCES store.products(id)
);