# Adsun Bot Message Ads — Node.js

Documented advbot integration with protected Telegram messages.

## What this repository contains

Independent educational example code and public documentation only. It contains no existing Adsun application source, SDK implementation, account tokens, environment files or production data.

## Quick start

Requires Node.js 22+. Run `node --test bot-node.test.mjs`. Import `sendAd` from `bot-node.mjs` in your existing command handler; call it only for opted-in users.

## Integration and limitations

Configure ADSUN_TOKEN, ADSUN_BLOCK_ID (numeric block number, without prefix), and TELEGRAM_BOT_TOKEN in your server secret manager. No credentials or environment files are included. Example handler: `await sendAd({ chatId: ctx.chat.id, userId: ctx.from.id, language: ctx.from.language_code || "en" })`. The request returns no message for HTTP 204. Messages preserve HTML, advertiser/reward buttons and protect_content. This is an integration module, not an autonomous bot; wire it to your own authenticated bot command. Never log token-bearing request URLs. Browser SDK is not used by bot messages.

## SDK and public sources

- Canonical Mini App SDK URL: https://api.adsun.io/sdk.js
- Official reference: https://adsun.io/documentation/publisher/telegram-bot
- Testing: https://adsun.io/documentation/publisher/testing
- Adsun: https://adsun.io

## Türkçe

Bu repo sıfırdan hazırlanmış örnek ve herkese açık rehber içerir; mevcut proje kaynakları, SDK kaynak kodu ve .env dosyaları içermez. Bot ve kanal reklamları Mini App SDK’sından farklı akışlardır.

## Search and AI discovery

Descriptive repository metadata, structured headings and llms.txt help readers identify scope. Indexing by search engines or AI systems is not guaranteed.

## Related examples

- [Adsun Bot Message Ads — Python](https://github.com/Adsuner/adsun-bot-messages-python)
- [Adsun Sponsored Bot Message Preview](https://github.com/Adsuner/adsun-bot-message-preview)
- [Adsun Channel Advertising Guide](https://github.com/Adsuner/adsun-channel-ads-guide)
- [Adsun Channel Ad Schedule Demo](https://github.com/Adsuner/adsun-channel-schedule-demo)
- [Adsun SDK Debug Playground](https://github.com/Adsuner/adsun-sdk-debug-playground)
- [Adsun Rewarded Quiz Demo](https://github.com/Adsuner/adsun-rewarded-quiz-demo)
- [Adsun Interstitial Levels Demo](https://github.com/Adsuner/adsun-interstitial-levels-demo)
- [Adsun Task Ad Wall Demo](https://github.com/Adsuner/adsun-task-wall-demo)
- [Adsun Advertising Technology Resource Guide](https://github.com/Adsuner/adsun-adtech-resource-guide)
