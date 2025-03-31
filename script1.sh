#!/bin/bash

# Database credentials
DB_HOST="191.101.230.154"
DB_USER="u747016719_property"
DB_PASS="~rXHj4h0=R"
DB_NAME="u747016719_propertyease"

# Set timezone to IST and get current date in YYYY-MM-DD HH:MM:SS format
CURRENT_DATE=$(TZ="Asia/Kolkata" date '+%Y-%m-%d %H:%M:%S')

# SQL query to update plan_status where plan_validity_end is less than current IST date
SQL_QUERY="UPDATE login_module SET plan_status = 3 WHERE plan_validity_end < '$CURRENT_DATE';"

# Execute the update query
mysql -h "$DB_HOST" -u "$DB_USER" -p"$DB_PASS" "$DB_NAME" -e "$SQL_QUERY"

# Log the result
if [ $? -eq 0 ]; then
    echo "Plan status updated successfully: Set to 3 for expired plans at $(date)" >> /home/propertyease/htdocs/propertyease/cron.log
else
    echo "Error updating plan status at $(date)" >> /home/propertyease/htdocs/propertyease/cron.log
fi