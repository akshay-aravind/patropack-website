// Client WhatsApp number in international format, digits only (no +, spaces or dashes).
// ⚠️ Replace with the client's real WhatsApp business number before launch.
export const WHATSAPP_NUMBER = '9715859567276'

// Default message pre-filled when a visitor opens the chat with no context.
export const DEFAULT_MESSAGE =
  "Hi PatroPack, I'd like to enquire about corrugated packaging."

// Build a wa.me click-to-chat URL with an optional pre-filled message.
export function whatsappLink(message = DEFAULT_MESSAGE) {
  const base = `https://wa.me/${WHATSAPP_NUMBER}`
  return message ? `${base}?text=${encodeURIComponent(message)}` : base
}
