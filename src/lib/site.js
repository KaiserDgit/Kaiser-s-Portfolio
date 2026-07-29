// Lives in public/ rather than src/pics/ so the URL stays stable and shareable
// instead of getting a build hash. Opened in a new tab and served with
// Content-Disposition: inline (see vercel.json) so it renders in the browser's
// PDF viewer rather than saving. The filename is what the browser falls back to
// if a visitor chooses to save it from that viewer.
// Referenced by both the hero widget and the nav drawer, change it here only.
export const RESUME_URL = '/KaiserDualehResume.pdf'
