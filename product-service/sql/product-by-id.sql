SELECT products.*, stocks.count
FROM store.products products, store.stocks stocks
WHERE
	stocks.product_id = products.id and products.id='3f13a379-f693-42a2-b21b-21c0e00520fe'