---
title: Offers, Invoicing, Fiscalization
sidebar_label: Offers, Invoicing, Fiscalization
tags: []
url: ""
date_created: 2025-07-19 13:52
---
# Offers, Invoicing & Fiscalization

This epic covers the commercial layer of the CRM — from generating offers to issuing invoices and ensuring compliance with fiscal regulations (Croatia-specific or broader EU frameworks).

It brings structure and traceability to how money is discussed, approved, and collected inside the system.

---
## OFFERS (QUOTATIONS)

Structured documents sent to leads or customers, usually before closing a deal.

- Line items (services, products)
- Pricing, VAT, discounts
- Validity period (e.g., “valid until July 31st”)
- Status (Draft, Sent, Accepted, Rejected)
- PDF generation and emailing

**Why it matters:**  
Offers are often the first formal artifact in the sales cycle. Well-formatted, traceable offers boost professionalism and close rates.

---
## INVOICES

Created based on accepted offers or directly.

- Invoice number (auto-generated)
- Customer info
- Itemized charges
- VAT + Total
- Payment due date
- Status (Draft, Issued, Paid, Overdue, Cancelled)

**Features:**

- PDF export
- Email delivery
- Status tracking
- Links to offers & contacts

---
## FISCALIZATION *(Croatian compliance)*

Invoices must be fiscalized via official service (e.g., FINA):

- Send invoice data to fiscal service
- Receive & embed JIR
- Retry or flag if failed

**Why it matters:**  
Non-optional legal requirement — must be reliable and automated.

---
## PAYMENTS & BALANCE TRACKING *(Optional)*

- Manually mark as paid
- Store payment date/method/amount
- Show outstanding balance
- Trigger reminders

---
## Why it matters

It connects money flow to the rest of the CRM — helping users see what was promised, what was billed, and what remains unpaid. A clear and compliant billing system reduces errors, speeds up revenue collection, and builds trust with clients.
