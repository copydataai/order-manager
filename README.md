# Order manager

## Problem
As a chef with high level of orders, we tend to confuse what is the priority for that moment, and what would be the next order.
before collapse the system and managing to the waiters.

## TODO
- [ ] Create an API to manager and chef roles
- [ ] chef role can read orders and see if its done
- [ ] manager role can add orders but just modify in less than 2 min before the order
- [ ] Add whisper to read the orders
- [ ] Add whisper to interact with priority of orders

## Stack 
1. _Supabase_ the best think :love:
2. _Python and FastAPI_ to show an easy mockup 
3. _Next_ to perform knowledge with react
4. _Tailwindcss_ waiting for v4 :love:

## Backend

### Endpoints

- `/orders`
    - GET, POST
    - get all the orders based on the token to get the organization id
    - create and order based on the token to get the organization id

- `/orders/:id`
    - GET, PATCH, PUT
    - retrieve an order by id
    - edit or edit full an order by id

- `/products`
    - GET, POST
    - get all the product by the token
    - create a product to the specific product organization

- `/products/:id`
    - GET, PUT, PATCH
    - get an specific product by id
    - update and partial update for a product

- `/organizations/:id`
  - GET, PATCH, PUT
  - just admin has access to modify
  - Auth: id == organization.id get 404 not found(not a 403 forbidden)
  - show organization id

- `/organizations`
    - POST 
    - Create a new organization that is different from the user or admin to manage the account
    
    

## License
Licensed under the MIT License.
