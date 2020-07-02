# Cornerstone Template

### Changes
### Choose a font from https://fonts.google.com/ and change the theme font
https://developer.bigcommerce.com/stencil-docs/storefront-customization/using-custom-fonts-and-icons

### Create a custom product template and re-arrange the components (in any way different than the default)
https://developer.bigcommerce.com/stencil-docs/storefront-customization/custom-templates

### Use the Catalog/Checkout Token to create a product with variants. The product must have the following details:
The product name should be your name
There must be at least 2 options
https://developer.bigcommerce.com/api-reference/catalog/catalog-api

### Create a Cart Via the API and add your product to the cart.
https://developer.bigcommerce.com/api-reference/cart-checkout/server-server-cart-api

### Complete your purchase using the checkout Server-to-Server API
https://developer.bigcommerce.com/api-reference/cart-checkout/server-server-checkout-api
Test Credit Card gateway is set up as well as a Check gateway
Test Credit card 4111-1111-1111-1111 with any cvv and date ahead of the current date
If you get an error processing the payment please submit the Cart/Checkout ID.  Orders that have errored out will still show up.
Carts last for 30 days.

### Write a server side script (preferably NodeJS) that automates the creation of a cart and completes the checkout.
