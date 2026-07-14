# Publishing setup

## Draft preview

1. Create a Sanity Viewer token and set it as `SANITY_API_READ_TOKEN` in the deployed Next.js environment.
2. Set `NEXT_PUBLIC_SITE_URL` to the deployed blog origin, for example `https://blog.rhodamuya.dev`.
3. Add the blog origin as a credentialed CORS origin in Sanity Manage.
4. Open the Presentation tool in Studio. It enables `/api/draft-mode/enable` and displays the preview banner until the editor exits preview.

## On-demand revalidation

Create a Sanity webhook with:

- URL: `https://blog.rhodamuya.dev/api/revalidate`
- Trigger: create, update, delete
- Filter: `_type in ["article", "category"]`
- Projection: `{_type, "slug": slug.current}`
- Secret: the same value configured as `SANITY_REVALIDATE_SECRET`

Enable signed webhook requests. The route immediately invalidates article, homepage, topic, sitemap, and RSS caches.

## Newsletter

Create a Buttondown API key and set it as `BUTTONDOWN_API_KEY`. New subscribers are added through Buttondown's subscriber API with double opt-in and the `engineering-notes` tag.
