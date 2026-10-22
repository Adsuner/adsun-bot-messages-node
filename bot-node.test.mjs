import {test} from 'node:test';
import assert from 'node:assert/strict';
import {messagePayload, requestAd} from './bot-node.mjs';
const ad = {text_html: 'Ad · 18+', button_name: 'Visit', click_url: 'https://example.org', button_reward_name: 'Claim', reward_url: 'https://example.org/reward'};
test('all messages are protected', () => assert.equal(messagePayload(ad, 123).body.protect_content, true));
test('HTML mode is retained', () => assert.equal(messagePayload(ad, 123).body.parse_mode, 'HTML'));
test('image ads use sendPhoto', () => assert.equal(messagePayload({...ad,image_url:'https://example.org/image.jpg'},123).method,'sendPhoto'));
test('204 is no inventory', async () => assert.equal(await requestAd({userId:123,blockId:50001,token:'fixture-only'},async()=>new Response(null,{status:204})),null));
test('invalid IDs fail before network', async () => assert.rejects(requestAd({userId:'abc',blockId:50001,token:'fixture-only'})));
