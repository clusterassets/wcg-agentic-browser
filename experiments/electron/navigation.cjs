'use strict';
function normalizeNavigation(value) {
  if (typeof value !== 'string') return null;
  const input = value.trim();
  if (!input || input.length > 2048 || /[\u0000-\u001f\u007f]/.test(input)) return null;
  let url;
  try { url = new URL(/^[a-z][a-z\d+.-]*:/i.test(input) ? input : `https://${input}`); }
  catch { return null; }
  if (!['http:', 'https:'].includes(url.protocol) || !url.hostname || url.username || url.password) return null;
  return url.href;
}
module.exports = { normalizeNavigation };
