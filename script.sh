#!/bin/bash

# Database credentials
DB_HOST="191.101.230.154"
DB_USER="u747016719_property"
DB_PASS="~rXHj4h0=R"
DB_NAME="u747016719_propertyease"


# Fetch the max_free_listing_val from the max_free_listing table
MAX_FREE_LISTING_VAL=$(mysql -h "$DB_HOST" -u "$DB_USER" -p"$DB_PASS" "$DB_NAME" -se "SELECT max_free_listing_val FROM max_free_listing LIMIT 1;")

# Check if the value was retrieved successfully
if [ -z "$MAX_FREE_LISTING_VAL" ]; then
    echo "Error: Could not retrieve max_free_listing_val at $(date)" >> /home/propertyease/htdocs/propertyease/cron.log
    exit 1
fi

# SQL query to update the login_module table with the retrieved value
SQL_QUERY="UPDATE login_module SET free_listings_remaining = $MAX_FREE_LISTING_VAL;"

# Execute the update query
mysql -h "$DB_HOST" -u "$DB_USER" -p"$DB_PASS" "$DB_NAME" -e "$SQL_QUERY"

# Log the result
if [ $? -eq 0 ]; then
    echo "Database updated successfully: free_listings_remaining set to $MAX_FREE_LISTING_VAL at $(date)" >> /home/propertyease/htdocs/propertyease/cron.log
else
    echo "Error updating database at $(date)" >> /home/propertyease/htdocs/propertyease/cron.log
fi