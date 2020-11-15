SELECT products.*, stocks.count
FROM store.products products, store.stocks stocks
WHERE
	stocks.product_id = products.id