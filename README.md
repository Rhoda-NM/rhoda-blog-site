This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Local development

Run the website and Sanity Studio as separate development servers. Keeping the
Studio on its native Vite server avoids the slow, memory-heavy embedded Studio
compilation in Next.js.

```bash
# Terminal 1 — website
npm run dev

# Terminal 2 — authoring Studio
npm run studio
```

Open:

- Website: [http://localhost:3000](http://localhost:3000)
- Studio: [http://localhost:3333](http://localhost:3333)

During development, `/studio` redirects to the standalone Studio. The embedded
route remains available in production as a deployment fallback.

If either server becomes sluggish after dependency changes, stop all old
development processes with `Ctrl+C` before starting these two commands again.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
