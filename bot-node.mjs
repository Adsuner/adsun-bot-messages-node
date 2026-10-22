// Independently authored from Adsun's public bot documentation.
export function messagePayload(ad, chatId) {
  const base = {chat_id: chatId, parse_mode: 'HTML', protect_content: true,
    reply_markup: {inline_keyboard: [
      [{text: ad.button_name, url: ad.click_url}],
      [{text: ad.button_reward_name, url: ad.reward_url}]
    ]}};
  return ad.image_url ? {method: 'sendPhoto', body: {...base, photo: ad.image_url, caption: ad.text_html}}
    : {method: 'sendMessage', body: {...base, text: ad.text_html}};
}
export async function requestAd({userId, blockId, language = 'en', token}, fetcher = fetch) {
  if (!token || !/^\d+$/.test(String(userId)) || !/^\d+$/.test(String(blockId))) throw new Error('Valid numeric user/block IDs and a server-only token are required');
  const url = new URL('https://api.adsun.io/advbot');
  url.search = new URLSearchParams({tgid: String(userId), blockid: String(blockId), language, token}).toString();
  const response = await fetcher(url, {signal: AbortSignal.timeout(15000)});
  if (response.status === 204) return null;
  if (!response.ok) throw new Error(`Adsun request failed: HTTP ${response.status}`); // Never log token-bearing URLs.
  const ad = await response.json();
  for (const key of ['text_html', 'button_name', 'click_url', 'button_reward_name', 'reward_url']) if (typeof ad[key] !== 'string' || !ad[key]) throw new Error(`Missing ad field: ${key}`);
  for (const key of ['click_url', 'reward_url', 'image_url']) if (ad[key] && new URL(ad[key]).protocol !== 'https:') throw new Error('Ad URLs must use HTTPS');
  return ad;
}
export async function sendAd({chatId, userId, language = 'en'}, fetcher = fetch) {
  const token = process.env.ADSUN_TOKEN, botToken = process.env.TELEGRAM_BOT_TOKEN;
  if (!botToken) throw new Error('TELEGRAM_BOT_TOKEN must be configured on the server');
  const ad = await requestAd({userId, blockId: process.env.ADSUN_BLOCK_ID, language, token}, fetcher);
  if (!ad) return {sent: false, reason: 'no-ad'};
  const payload = messagePayload(ad, chatId);
  const response = await fetcher(`https://api.telegram.org/bot${botToken}/${payload.method}`, {
    method: 'POST', headers: {'Content-Type': 'application/json'}, body: JSON.stringify(payload.body), signal: AbortSignal.timeout(15000)
  });
  if (!response.ok) throw new Error(`Telegram request failed: HTTP ${response.status}`);
  const result = await response.json();
  if (!result.ok) throw new Error('Telegram rejected the message');
  return {sent: true, messageId: result.result.message_id};
}
