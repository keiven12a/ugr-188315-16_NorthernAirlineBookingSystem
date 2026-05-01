# Airline Booking System

A web-based airline booking system built with PHP, JavaScript, HTML, and CSS. It provides passenger authentication, flight search, bookings management, payment handling, and admin dashboards.

## Features/web pages
        Core Functionality/web pages
              1. Main Menu (home screen)
              2. About us modal(modal with extensive context)
              3. About System Modal (modal with extensive content)
              4. Passenger Registration
              5. Passenger Login
              6. Admin Login
              7. Passenger Dashboard (with 3 sub-sections)
              8. Admin Dashboard (with 4 sub-sections)
             

##  User Roles
            Passenger Features/sub web page
                   1. Search flights by route
                   2. Book flights with payment simulation
                   3. View personal booking history
         

        Admin Features/sub web pages
                 1. Add new flights
                 2. Manage flights
                 3. View all bookings
                4. System statistics and analytics


 ##  Admin Credentials
           -Username: RESPECT_WORLD
          -Password: keiven12

## Tech Stack
     - PHP (API endpoints)
     - MySQL (database)
     - JavaScript (frontend logic)
     - HTML/CSS (UI)
     - XAMPP/Apache (local server)


## Responsive Design
            The application is fully responsive and works on:
                                -  Desktop computers
                                -  Mobile phones
                                -  Tablets
                                -  Large screens
## Language Support
                Available Languages
                        - English (Default)
                        - Amharic (አማርኛ)
                Language Features
                        - Dynamic text switching
                        - Amharic font support (Noto Sans Ethiopic)
                        - Right-to-left text compatibility
                        - Bilingual form placeholders

## Project Structure

- api/: Backend endpoints grouped by domain
- includes/: Shared auth and helper functions
- index.html: Main UI entry point
- script.js: Frontend logic
- style.css: UI styling
- schema.sql: Database schema
- test_db.php: Database connection test

## Setup

1. Install XAMPP and start Apache + MySQL.
2. Create a database and import schema.sql.
3. Update database credentials in api/config/database.php.
4. Open http://localhost/airline_booking_system/ in your browser.


## Usage Instructions
                For Passengers
                        1. Register: Create a new passenger account
                        2. Login: Access your dashboard
                        3. Browse Flights: View available flights
                        4. Search: Find specific routes
                        5. Book: Select and pay for flights
                        6. Manage: View booking history
            For Administrators
                    1. Login: Use admin credentials
                    2. Add Flights: Create new flight routes
                    3. Manage: Update seat availability
                    4. Monitor: View all system bookings
                    5. Analyze: Check system statistics

## API Endpoints (Examples)

    - api/passengers/register.php
    - api/passengers/login.php
    - api/flights/search.php
    - api/bookings/create.php
    - api/payments/process.php
    - api/admin/dashboard.php

##Demo
       -Link: https://ethiopian-airline-booking-system.netlify.app

##Individual Assignment
    - Name: kibrealem gebretnsae    ugr/188315/16   section 2


