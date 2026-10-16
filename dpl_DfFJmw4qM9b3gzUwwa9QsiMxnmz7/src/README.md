# العائدة — Al-'Ā'ida

Pre-order site for the Arabic fantasy novel **العائدة** by **عرسان سلفيتي**.

- Landing with cinematic fade-in → `/`
- Book page with cover, description, price, quantity picker → `/book`
- Checkout form (name, city, phone, message to author) → `/checkout`
- Order confirmation → `/success`
- `POST /api/order` sends the order to `orsan304@gmail.com` as a styled Arabic/RTL email with a one-click **WhatsApp** button to the buyer.

## Setup — email (one-time, ~60s)

Orders are delivered through [Resend](https://resend.com). Free tier is 100 emails/day.

1. Go to <https://resend.com/signup> and sign up **using `orsan304@gmail.com`** (same inbox orders go to). Verify the email.
2. Open <https://resend.com/api-keys> → *Create API Key* → copy it.
3. Paste it where it's needed:
   - **Vercel** → Project → Settings → *Environment Variables* → add `RESEND_API_KEY`.
   - **Local dev** → create a `.env.local` file (copy `.env.example`) and paste the key there.

> By default the email is sent **from** Resend's shared address `onboarding@resend.dev`.
> This works out of the box because the receiving mailbox (`orsan304@gmail.com`) is the one you signed up with.
> To send from a branded sender, verify a domain in Resend and set `FROM_EMAIL`.

## Dev

```bash
npm install
npm run dev    # http://localhost:3000
```

Without `RESEND_API_KEY`, orders are accepted and logged to the server console (no email). This lets you develop freely.

## Deploy to Vercel

```bash
# first time only
vercel login

# deploy — accept defaults; name the project "alaaeda" so the URL becomes alaaeda.vercel.app
vercel

# add the env var, then promote to production
vercel env add RESEND_API_KEY
vercel --prod
```
