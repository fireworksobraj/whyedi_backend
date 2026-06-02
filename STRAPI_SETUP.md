# Strapi CMS Setup Guide

This guide will help you configure the Strapi backend for your multi-state mortgage application. It details how to set up Content Types, configure API tokens, and connect submissions to **n8n** via webhooks.

---

## 1. Running Strapi

To start Strapi in development mode, run the following commands inside the `backend/` directory:

```bash
cd backend
npm run develop
```

This will launch the development server on [http://localhost:1337](http://localhost:1337).

The first time you access the dashboard, you will be prompted to create an **Administrator Account**.

---

## 2. Creating Content Types

Use the Strapi **Content-Type Builder** (accessible from the left sidebar) to create the following collection types.

### A. Referrals (Collection Type)
Create a collection type named `Referral` (plural: `referrals`) with the following fields:

| Field Name | Type | Options | Description |
| :--- | :--- | :--- | :--- |
| `firstName` | Text (Short) | Required | First name of referred person |
| `lastName` | Text (Short) | Required | Last name of referred person |
| `phone` | Text (Short) | Required | Phone number of referred person |
| `email` | Text (Short) | - | Email address of referred person |
| `loanPurpose` | Enumeration | Required (values: `purchase`, `refinance`) | Loan type goal |
| `referralFirstName` | Text (Short) | Required | First name of the referrer |
| `referralLastName` | Text (Short) | Required | Last name of the referrer |
| `referralPhone` | Text (Short) | Required | Phone number of the referrer |
| `referralEmail` | Text (Short) | Required | Email address of the referrer |

### B. Bookings (Collection Type)
Create a collection type named `Booking` (plural: `bookings`) with the following fields:

| Field Name | Type | Options | Description |
| :--- | :--- | :--- | :--- |
| `name` | Text (Short) | Required | Full name of the applicant |
| `email` | Text (Short) | Required | Email address of the applicant |
| `phone` | Text (Short) | Required | Format-validated phone number |
| `date` | Date | Required (format: `date` only) | Preferred meeting date |
| `time` | Time | Required | Preferred meeting time |

### C. Articles (Collection Type - for Blog)
Create a collection type named `Article` (plural: `articles`) with the following fields:

| Field Name | Type | Options | Description |
| :--- | :--- | :--- | :--- |
| `title` | Text (Short) | Required | Title of the blog post |
| `slug` | UID | Required (attached to `title`) | URL friendly identifier |
| `description` | Text (Long) | Required | Short summary of the article |
| `content` | Rich Text (Markdown/HTML) | Required | Main article content |
| `author` | Text (Short) | Default: "Edi Shek" | Name of the author |
| `readTime` | Text (Short) | e.g. "4 min read" | Read time estimate |
| `image` | Media (Single Image) | Optional | Cover photo |

---

## 3. Configuring API Permissions

To allow your Next.js frontend to read posts and create submissions:

1. In the Strapi Dashboard, navigate to **Settings** > **Users & Permissions Plugin** > **Roles**.
2. Click on the **Public** role.
3. Scroll down to permissions:
   - **Referral**: Check **create** (to allow form submissions).
   - **Booking**: Check **create** (to allow form bookings).
   - **Article**: Check **find** and **findOne** (to allow the frontend to fetch articles).
4. Click **Save** at the top right.

*Note: In production, you can generate an API Token under **Settings** > **API Tokens** and add it as `STRAPI_API_TOKEN` in your Next.js `.env` variables to lock down create access.*

---

## 4. Connecting Webhooks to n8n

When a new referral or booking is created, Strapi can automatically trigger a webhook to send the data directly to your **n8n** automation flow.

1. In the Strapi Dashboard, navigate to **Settings** > **Webhooks**.
2. Click **Create new webhook**.
3. Configure the settings:
   - **Name**: `Referrals to n8n` / `Bookings to n8n`
   - **Url**: Enter the webhook URL provided by your n8n webhook node (e.g., `https://n8n.yourdomain.com/webhook/...`).
   - **Headers**: Add any authorization headers required by your n8n workflow.
   - **Events**: Under **Entry**, check the **Create** box.
4. Click **Save**.

Now, whenever a user submits a referral or books a call:
1. The frontend proxies the request to Next.js API.
2. Next.js validates reCAPTCHA and saves the entry to Strapi.
3. Strapi stores it in SQLite (dev) / PostgreSQL (prod) database.
4. Strapi immediately triggers the webhook, passing the full submission payload to **n8n**!
