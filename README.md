## Overview

The Notification Worker sends email notifications to customers based on invoice generation and payment status. It integrates with email services like SendGrid or Mailgun to handle notifications.

## Features

- Send email notifications when invoices are generated.
- Notify customers of successful or failed payments.


## Setup

1. Clone the repository:
   ```bash  
   git clone <REPOSITORY_URL>  
   cd subscription  

2. Install dependencies:
   ```bash
   npm install

## Environment Configuration Variables
Set the following environment variables in your wrangler.toml file or through the Cloudflare dashboard:

INVOICE_WORKER_URL: URL to the Billing Engine Worker.

1. Variables and Secrets:
   - SUBSCRIPTION_WORKER_URL: URL to the Subscription Worker.
   - INVOICE_WORKER_URL: URL to the Billing/Invoice Engine Worker.
   - PAYMENT_WORKER_URL: URL to the Payment Worker.

2. KV Namespace Binding:
   PAYMENT_KV

2. Example for development:
   - WORKER_URL=http://<your-domain.com>:<port>/

## How to Run Locally
1. To run the worker locally, use:
    ```bash
    npm run dev

## How to Run Locally
1. To run the worker locally, use:
   ```bash
   npm run dev  

This will start the worker on a local server. You can test it using a tool like Postman or curl.


## How to Deploy on Production
1. To deploy the worker to production, run:
   ```bash
   npm run deploy  

Ensure you have configured your environment variables correctly in the Cloudflare dashboard.


## API Documentation
Below is the domain where you can see API Docs

https://notification.azam-arid1144.workers.dev/
   