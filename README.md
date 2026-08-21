# Bilima Beverage Network

BUILD BILIMA — TANZANIA'S B2B BEVERAGE PROCUREMENT & DISTRIBUTION PLATFORM

Build a production-ready, mobile-first B2B platform called Bilima.

Bilima is NOT a consumer e-commerce store.

Bilima is a B2B beverage procurement and distribution operating system connecting businesses that need beverages with verified suppliers, wholesalers, distributors and logistics providers.

CORE POSITIONING

Bilima

B2B Beverage Procurement & Distribution Network

Core promise:

Tell Bilima what your business needs. We find the best supplier, price and delivery.

Primary market: Tanzania, starting with Dar es Salaam.

Currency: TZS

Language: English initially, but structure the application so Swahili can be added later.

1. CORE BUSINESS MODEL

Bilima must solve this problem:

A restaurant, hotel, shop or other business needs beverages repeatedly but currently has to:

Call multiple suppliers.

Ask for prices manually.

Compare quotations.

Check stock.

Negotiate.

Arrange transport.

Track delivery.

Repeat the same process every week.

Bilima should centralize this.

The core transaction loop is:

Business → Procurement Request → Supplier Matching → Quotes → Comparison → Order → Payment → Logistics → Delivery → Proof of Delivery → Review → Analytics

The platform must optimize for:

Repeat orders.

Transaction volume.

Supplier liquidity.

Competitive pricing.

Reliable fulfilment.

Buyer savings.

Data-driven procurement.

2. USER TYPES

Create role-based authentication and dashboards for:

BUYER

Examples:

Restaurant

Hotel

Bar

Café

Supermarket

Mini-market

Office

Event company

Caterer

Distributor

SUPPLIER

Examples:

Beverage manufacturer

Wholesaler

Distributor

Importer

LOGISTICS PARTNER

Third-party delivery providers.

ADMIN

Bilima operations team.

Use role-based access control so each user only sees functionality relevant to their role.

3. BUYER EXPERIENCE

After registration, buyers complete a business profile:

Business name

Business type

Owner/contact person

Phone

Email

Location

Region

District

Delivery address

TIN/business information where applicable

Preferred payment method

Estimated monthly beverage spend

Create a professional B2B dashboard.

BUYER DASHBOARD

Display:

Total spend

Orders this month

Pending orders

Active RFQs

Favourite suppliers

Potential savings

Recent purchases

Frequently ordered products

Primary CTA:

“What do you need today?”

4. PROCUREMENT REQUEST / RFQ ENGINE

This is the HEART of Bilima.

Do not make users browse products first.

Allow them to create a procurement request.

Example:

I need:

30 cartons bottled water
20 cartons soda
10 cartons energy drinks
Delivery: Kinondoni
Required: Tomorrow

Form fields:

Product/category

Brand preference: optional

Quantity

Unit

Preferred brand

Maximum budget: optional

Delivery location

Required delivery date

Additional notes

Upload image/document if necessary

After submission:

Bilima automatically identifies relevant suppliers.

Send the RFQ to multiple suppliers.

5. SUPPLIER QUOTATIONS

Suppliers receive RFQs.

Supplier can respond with:

Product

Available quantity

Unit price

Wholesale price

MOQ

Delivery fee

Estimated delivery time

Payment terms

Quote expiry

Notes

Supplier submits quotation.

Buyer sees all quotes in one comparison interface.

Example:

SupplierPriceStockDeliveryRatingSupplier ATZS 240,000AvailableToday96Supplier BTZS 225,000AvailableTomorrow91Supplier CTZS 250,000AvailableToday98

Allow the buyer to:

Accept quote

Reject quote

Request negotiation

Ask supplier a question

6. SMART SUPPLIER MATCHING

Create supplier matching logic based on:

Product availability

Location

Delivery area

Price

MOQ

Supplier rating

Fulfilment rate

Response speed

Buyer preferences

Rank suppliers automatically.

Display:

“Best Match”

“Lowest Price”

“Fastest Delivery”

Do NOT pretend the platform has AI unless actual matching logic exists.

Start with deterministic rules.

7. PRODUCT CATALOGUE

Create a structured beverage catalogue.

Categories:

Bottled Water

Soft Drinks

Energy Drinks

Juices

Sports Drinks

Malt Drinks

Functional Drinks

Other Non-Alcoholic Beverages

Each product:

Name

Brand

Category

Description

Images

Packaging

Units per carton

SKU

Supplier

Wholesale price

MOQ

Availability

Delivery locations

Allow suppliers to manage their catalogue.

8. SUPPLIER DASHBOARD

Supplier dashboard must include:

Overview

Revenue

Orders

Pending RFQs

Accepted quotes

Fulfilment rate

Average response time

Product performance

RFQs

Supplier can:

View RFQ

Respond

Negotiate

Decline

Update quote

Products

Add product

Edit product

Update price

Update stock

Activate/deactivate product

Orders

New

Confirmed

Processing

Ready for pickup

Delivered

Cancelled

Analytics

Show:

Top products

Top buyers

Revenue

Average order value

Demand trends

Quote win rate

9. SUPPLIER VERIFICATION

Create:

Bilima Verified Supplier

Supplier verification workflow:

Business registration

TIN

Contact verification

Physical/business verification

Product documentation where applicable

Bank/mobile money details

Delivery capability

Admin approves or rejects verification.

Display a clear:

✓ Bilima Verified

badge.

10. SUPPLIER PERFORMANCE SCORE

Create a dynamic supplier score from:

Fulfilment rate

On-time delivery

Cancellation rate

Quote response time

Buyer ratings

Stock accuracy

Order completion

Display:

Bilima Score: 94/100

Use this score in supplier ranking.

11. ORDER MANAGEMENT

After a buyer accepts a quote:

Create an order.

Order statuses:

RFQ → Quoted → Accepted → Confirmed → Processing → Ready → Dispatched → Delivered → Completed

Allow:

Order tracking

Order details

Invoice

Payment status

Delivery status

Proof of delivery

Cancellation

Dispute

Generate unique order IDs.

12. PAYMENTS

Build the architecture for Tanzania.

Payment methods:

Mobile Money

Bank transfer

Cash on delivery where enabled

Future payment gateway integrations

Do not hardcode fake payment confirmations.

Create a proper payment status system:

Pending

Processing

Paid

Failed

Refunded

Prepare the backend for future integrations with Tanzanian payment providers.

13. LOGISTICS

Bilima should NOT own vehicles.

Build a logistics marketplace.

When an order requires delivery:

Create a delivery job containing:

Pickup location

Drop-off location

Buyer

Supplier

Order

Package information

Delivery fee

Driver/logistics partner

Delivery status

Statuses:

Pending → Assigned → Picked Up → In Transit → Delivered

Allow logistics partners to:

View jobs

Accept jobs

Update status

Upload proof of delivery

See earnings

View completed deliveries

14. BUYER PROCUREMENT ANALYTICS

This is a major differentiator.

Every buyer should have:

Procurement Intelligence

Show:

Monthly spend

Spend by category

Spend by supplier

Most purchased products

Average order value

Price changes

Order frequency

Delivery performance

Estimated savings

Example:

Potential savings this month

TZS 340,000

Explain how the saving was calculated.

15. REORDER ENGINE

Track repeat purchasing.

If a buyer frequently purchases:

Water — 20 cartons every Monday

show:

“Your usual order is due.”

CTA:

Reorder

Allow one-click repeat ordering.

Also create:

Favourite Products

Favourite Suppliers

16. WHATSAPP-FIRST ARCHITECTURE

Design the backend so WhatsApp ordering can be integrated.

A buyer should eventually be able to send:

“Nahitaji maji 30 cartons na soda 20 cartons.”

The system should convert the message into a procurement request.

For MVP, create the architecture and UI placeholder for WhatsApp integration.

Do not fake a working WhatsApp API.

17. ADMIN DASHBOARD

Create a powerful Bilima operations dashboard.

Admin should see:

Platform Overview

GMV

Revenue

Active buyers

Active suppliers

Active logistics partners

Orders

RFQs

Completed transactions

Pending disputes

Users

Manage:

Buyers

Suppliers

Logistics partners

Admins

Verification

Approve/reject suppliers.

Products

Moderate product catalogue.

RFQs

Monitor procurement activity.

Orders

Track every transaction.

Payments

Monitor payment status.

Logistics

Monitor delivery jobs.

Disputes

Manage disputes between buyers and suppliers.

Analytics

Track:

GMV

Take rate

Average order value

Repeat purchase rate

Buyer retention

Supplier retention

RFQ conversion

Quote win rate

Delivery success

Revenue

18. DISPUTE MANAGEMENT

Create dispute workflows.

Buyer can report:

Wrong product

Missing products

Damaged products

Late delivery

Incorrect quantity

Pricing issue

Admin can:

Investigate

Request evidence

Contact supplier

Contact buyer

Resolve

Refund where applicable

Penalize supplier

Create dispute statuses:

Open → Investigating → Resolved → Closed

19. NOTIFICATIONS

Create notification infrastructure.

Notify users about:

New RFQ

New quote

Quote accepted

Order confirmed

Payment received

Delivery assigned

Delivery updates

Order delivered

Dispute updates

Reorder reminders

Support:

In-app notifications

Email architecture

WhatsApp architecture

20. DATABASE

Use Supabase PostgreSQL.

Design a normalized relational schema.

Minimum tables:

users

profiles

businesses

business_addresses

buyer_profiles

supplier_profiles

logistics_profiles

products

product_categories

supplier_products

inventory

rfqs

rfq_items

rfq_suppliers

quotations

quotation_items

orders

order_items

payments

deliveries

delivery_events

reviews

supplier_scores

favourites

recurring_orders

notifications

disputes

dispute_messages

documents

verification_requests

invoices

platform_settings

audit_logs

Use proper foreign keys.

Use timestamps.

Use UUIDs.

Use database constraints.

Implement Row Level Security.

Users must only access records they are authorized to access.

21. SECURITY

Implement:

Supabase authentication

Role-based authorization

RLS policies

Secure file uploads

Input validation

Server-side validation

Protected admin routes

Audit logs

No sensitive information exposed client-side

No fake security mechanisms

Never put secret API keys in frontend code.

22. DESIGN SYSTEM

Design Bilima as a serious B2B technology company.

Avoid generic marketplace aesthetics.

Style:

Modern African B2B fintech/procurement platform.

Use:

Clean white background

Strong typography

Professional dark text

One strong Bilima accent colour

Spacious layouts

Data-rich dashboards

Clear cards

Tables

Status badges

Charts

Mobile-first interfaces

Avoid:

Excessive gradients

Cartoon illustrations

Consumer-shopping aesthetics

Unnecessary animations

Huge typography

Clutter

The interface must feel trustworthy enough for a business owner moving millions of TZS through the platform.

23. MOBILE-FIRST

The majority of users will use smartphones.

Everything must work perfectly on:

iPhone

Android

Small screens

Slow connections

Optimize:

Touch targets

Forms

Tables

Checkout

RFQs

Order tracking

WhatsApp workflows

Desktop should provide a richer experience, but mobile is the priority.

24. LANDING PAGE

Create a high-converting landing page.

Hero:

Buy Beverages Smarter.

Subheadline:

Bilima connects businesses with verified beverage suppliers, competitive B2B prices and reliable delivery.

Primary CTA:

Start Buying

Secondary CTA:

Become a Supplier

Sections:

How Bilima works

For businesses

For suppliers

Procurement benefits

Verified suppliers

Delivery network

Analytics

CTA

Do not market Bilima as a consumer shopping site.

25. BUSINESS ONBOARDING

Create a simple onboarding wizard:

Step 1

Business information.

Step 2

Business type.

Step 3

Location.

Step 4

What beverages do you regularly buy?

Step 5

Estimated monthly purchasing volume.

Step 6

Complete profile.

Immediately take the buyer to:

Create your first procurement request.

26. SUPPLIER ONBOARDING

Supplier onboarding:

Business information

Business type

Location

Product categories

Delivery areas

Payment terms

Documents

Verification

Add products

Activate supplier profile

After approval:

Supplier Dashboard

27. B2B MARKETPLACE

Keep a marketplace section, but make it secondary to procurement.

Users can:

Search products

Search suppliers

Filter by category

Filter by location

Filter by verified suppliers

Compare suppliers

View product details

Request quote

The marketplace should support procurement rather than become a consumer-style shopping experience.

28. BUSINESS MODEL

Design the system so Bilima can monetize:

Transaction commission

Take a percentage of completed transactions.

Supplier subscriptions

Free and Pro tiers.

Logistics margin

Earn from delivery coordination.

Premium procurement analytics

Businesses can eventually pay for advanced insights.

Market intelligence

Aggregate anonymized transaction data and sell insights to manufacturers/distributors.

Do not expose individual buyer confidential data.

29. FUTURE FEATURES — DO NOT PRIORITIZE FOR MVP

Prepare architecture for:

Working-capital financing through licensed partners

Credit scoring

Advanced market intelligence

AI procurement recommendations

Demand forecasting

Automated supplier negotiation

Multi-city expansion

API integrations

ERP integrations

Accounting integrations

Do not build these before the core procurement loop works.

30. MVP SUCCESS METRIC

The most important metric is NOT:

Registered users.

It is:

Completed B2B transactions.

Track:

Active buyers

Active suppliers

RFQs

Quotes

Orders

GMV

Repeat orders

Average order value

Supplier fulfilment

Buyer savings

The product should be designed around increasing these numbers.

31. PRODUCT PRINCIPLE

Bilima should never feel like:

“Here is a website with beverage products.”

It should feel like:

“Bilima handles beverage procurement for my business.”

That distinction must influence every screen, workflow and feature.

32. TECHNICAL REQUIREMENTS

Use:

React

TypeScript

Tailwind CSS

Supabase

PostgreSQL

Supabase Auth

Supabase Storage

Responsive UI

Reusable components

Clean component architecture

Proper loading states

Empty states

Error states

Form validation

Toast notifications

Pagination

Search

Filtering

Sorting

Use real database operations.

Do not create fake dashboards with hardcoded numbers.

Do not use mock data once the database is connected.

Create seed/demo data only where necessary for development.

33. BUILD ORDER

Build in this order:

PHASE 1

Authentication + roles + business onboarding.

PHASE 2

Supplier profiles + product catalogue.

PHASE 3

RFQ engine.

PHASE 4

Quotation + comparison.

PHASE 5

Order management.

PHASE 6

Payment architecture.

PHASE 7

Logistics.

PHASE 8

Buyer + supplier dashboards.

PHASE 9

Analytics.

PHASE 10

Admin operations.

PHASE 11

Notifications.

PHASE 12

Polish, security, responsive design and production readiness.

FINAL PRODUCT RULE

Do not build features because they look impressive.

Build features that increase:

RFQs → Quotes → Orders → Repeat Orders → GMV

Bilima's ultimate goal is to become:

The operating system for B2B beverage procurement and distribution in Tanzania.

Start with Dar es Salaam.

Win the transaction.

Then build the network.

Then build the data moat.

Then expand.

This project was built with [Lovable](https://lovable.dev).

## Build with Lovable

Continue developing this project in the [Lovable editor](https://lovable.dev/projects/a1876783-71db-4713-946d-999575db4acf).

- **Ship faster**: describe what you want to build and Lovable handles the code.
- **Stay in sync**: every change made in Lovable is committed straight to this repository.
- **Full ownership**: this code is yours. Push to `main` on GitHub and your changes sync back into Lovable, ready for your next prompt.

## Development

Prefer working locally? You need Node.js and npm — [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating).

```sh
git clone <this-repository-url>
cd <repository-name>
npm i
npm run dev
```
