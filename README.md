# Users

`user_id`

`fullname`

`email`

`phone` 

`role`

`created_at`

# Routes

`route_id`

`route_name`

`pickup_location`

`drop_location` 

`base_price`

`capacity`

`departure_time`

`arrival_time`

`created_by [FK → Users.user_id]`

`created_at`

## RouteStops

`stop_id`

`route_id [FK → Routes.route_id]`

`stop_name`

`stop_order`

# RouteAssignments

`assignment_id`

`route_id [FK → Routes.route_id]`

`driver_id [FK → Users.user_id]`

# RoutePricing

`pricing_id`

`route_id [FK → Routes.route_id]`

`from_stop_id [FK → RouteStops.stop_id]`

`to_stop_id [FK → RouteStops.stop_id]`

`price DECIMAL(10,2))`

# Bookings

`booking_id` 

`user_id [FK → Users.user_id]`

`route_id [FK → Routes.route_id]`

`from_stop_id [FK → RouteStops.stop_id]`

`to_stop_id [FK → RouteStops.stop_id]`

`quantity`

`price DECIMAL(10,2)`

`status`

`booking_date`

# Passengers

`passenger_id
booking_id [FK → Bookings.booking_id]`

`fullname`

`email`

`phone` 

# Payments

`payment_id`

`booking_id [FK → Bookings.booking_id]`

`amount DECIMAL(10,2)`

`payment_status`

`payment_date`
