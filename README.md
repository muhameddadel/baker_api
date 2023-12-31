# Bakery Backend API Documentation

## Introduction

It is an application designed for buying and selling homemade cakes and pies. This documentation covers the backend API and provides details on data models and features.

## Data Models

In the CakePals data model, in addition to common data fields such as identifiers, we consider specific attributes for each user type and the items they interact with:

- **Baker's Profile**
  - Location
  - Rating
  - Collection Time Range

- **Products**
  - Baking Time
  - Type (e.g., fruit cake, meat pie)

- **Order Information**
  - Payment Method
  - Collection Time

## Features

### Account Management

- New users have the option to register as either Members or Bakers.

### Authentication

- Both Bakers and Members can authenticate to access their respective accounts.

### Bakers

- Bakers have several capabilities, including:
  - Adding new products for sale.
  - Editing or removing their listed products.
  - Viewing their received orders, accepting, rejecting, and fulfilling them.
  - Managing their profile information, including location and collection time range.

### All Users

- All users, including Guests, Members, and Bakers, can:
  - List available products.
  - Filter products by location and type.

### User Ratings

- Customers have the ability to rate their fulfilled orders.
- These ratings contribute to the overall baker's rating.

