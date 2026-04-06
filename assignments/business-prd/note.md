
Here are the code for ERD, in future I will add more details.

```

customers [icon: user, color: red]{
  id serial pk
  full_name string not null
  instagram_handle string unique not null
  whatsapp_number string not null
  email string unique null
  default_shipping_address text
  created_at timestamp 
}

categories [icon: tag, color: purple]{
  id serial pk
  name string unique not null
  description text
}

products [icon: shopping-bag, color: blue]{
  id serial pk
  category_id int fk not null
  name string not null
  description text
  base_price string not null

  product_type enum('THRIFTED', 'HANDMADE') not null
  condition_note string null

  size string null
  color string null
  is_active boolean [default: true]
  created_at timestamp 
}

inventory [icon: package, color: orange]{
  id serial pk
  product_id int fk unique not null
  stock_quantity int not null [default: 1]
  last_restocked_at timestamp
}

orders [icon: shopping-cart, color: yellow]{
  id serial pk
  customer_id int fk not null
  order_total string not null
  order_status enum('PENDING', 'CONFIRMED', 'SHIPPED', 'DELIVERED', 'CANCELLED')
  order_date timestamp 
}

order_items [icon: list, color: green]{
  id serial pk
  order_id int fk not null
  product_id int fk not null
  quantity int not null default 1
  price_at_purchase string not null
}

payments [icon: credit-card, color: blue]{
  id serial pk
  order_id int fk not null
  payment_method enum('UPI', 'BANK_TRANSFER', 'UPI', 'Credit Card', 'COD')
  payment_amount string not null
  payment_status enum('PENDING', 'SUCCESS', 'FAILED', 'REFUNDED')
  transaction_reference strinf unique
  paid_at timestamp
}

shipping_details [icon: truck, color: red]{
  id serial pk
  order_id int fk unique not null
  shipping_address text not null
  courier_service string null
  tracking_number string null
  shipping_status enum('PREPARING', 'IN_TRANSIT', 'DELIVERED', 'RETURNED')
  shipped_at timestamp
}

customers.id < orders.customer_id
categories.id < products.category_id
products.id - inventory.product_id

orders.id < order_items.order_id
products.id < order_items.product_id

orders.id < payments.order_id
orders.id - shipping_details.order_id
 
```