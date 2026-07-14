import { draftMode } from "next/headers";

export async function PreviewBanner() {
  const { isEnabled } = await draftMode();
  if (!isEnabled) return null;

  return (
    <aside className="preview-banner" role="status">
      <span>You are viewing draft content.</span>
      <form action="/api/draft-mode/disable" method="post">
        <button type="submit">Exit preview</button>
      </form>
    </aside>
  );
}
