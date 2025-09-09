---
title: CRM Core - Contacts, Tasks, Notes, Timeline
sidebar_label: CRM Core
sidebar_position: 2
tags: []
url: 
date_created: 2025-07-19 13:52
---
# CRM Core - Contacts, Tasks, Notes, Timeline

Foundational CRM functionality for managing contacts, activities, and status across the customer lifecycle — with full history, segmentation, and communication context.

This epic covers the core interaction model between our users and the CRM — how it stores, manages, and acts on information about leads and customers. It’s the brain and memory of the system.

---
## CONTACTS

- A contact is a person or a company.
- Contains metadata (name, email, phone, etc.), and a status (lead, prospect, customer).
- Acts as the central entity to which all other objects are linked.

---
## TASKS

Tasks are actionable items tied to a contact (or sometimes to a deal or opportunity).

**Examples:**
- “Call Mark at 14:00”
- “Prepare onboarding doc for ACME Inc.”
- “Send proposal to Anja by Friday”

**Key Properties:**
- Title + Description
- Due Date & Time
- Status (To do, Done, Overdue)
- Priority (optional)
- Assigned User

**Why it matters:**
Tasks are where sales and support follow-through happens. Without them, users forget what to do next, leads go cold, and sales are lost. Tasks enable workflow continuity and handover clarity between teammates.

---
## NOTES

Notes are freeform entries attached to a contact. They are not time-sensitive (like tasks) and not structured (like fields). They are memory.

**Examples:**
- “Client prefers calls after 5 PM.”
- “Mentioned they might expand team in Q3.”
- “Was annoyed by the billing issue — tread carefully.”

**Typical Functionality:**
- Rich text / plain text
- Date/time stamped
- Author info
- Optional tagging or linking

If we borrow from OS analogy: in UNIX, everything is a file → here, everything is a conversation, and notes are its written memory.

**Why it matters:**
Notes build up context. When another team member picks up the contact later, they immediately see the relationship history. It prevents the “who is this again?” problem.

---
## TIMELINE

The timeline is a chronological, unified view of all interactions with a contact — including tasks, notes, emails, calls, meetings, and changes to contact status.

- A "Facebook feed" for the contact;
- A medical chart for a patient;
- A black box flight recorder for our CRM;

**Includes:**
- Task creation/completion
- Notes
- Call logs
- Emails (if integrated)
- Contact status changes
- File uploads
- Assignment changes

**Why it matters:**
It’s the central hub for understanding the journey of a lead or customer. Before a call or meeting, users glance at the timeline to see:

- What happened last?
- What promises were made?
- Who interacted with this person?

**Design Insight:**
This should feel fast, filterable, and readable. Timeline replaces the need to go hunting across modules or tabs.
