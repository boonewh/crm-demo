import { test } from 'node:test';
import assert from 'node:assert/strict';
import { generateIcsDownloadUrl } from '../../src/lib/calendarUtils';

test('local calendar files preserve UTC dates, escape text and fold UTF-8 lines', () => {
  const url = generateIcsDownloadUrl({ id: '1\r\nBEGIN:VEVENT', follow_up: '2026-10-30T10:00:00-05:00', summary: 'Review, quote; \\ notes\r\nBEGIN:VEVENT', notes: 'é🙂'.repeat(80), outcome: 'Follow up' });
  assert(url?.startsWith('data:text/calendar;charset=utf-8,'));
  const text = decodeURIComponent(url!.slice(url!.indexOf(',') + 1));
  assert.equal((text.match(/^BEGIN:VEVENT$/gm) || []).length, 1);
  assert(text.endsWith('END:VCALENDAR\r\n'));
  for (const line of text.split('\r\n')) assert(Buffer.byteLength(line, 'utf8') <= 75);
  const unfolded = text.replace(/\r\n /g, '');
  assert.match(unfolded, /DTSTART:20261030T150000Z\r\nDTEND:20261030T153000Z/);
  assert(unfolded.includes('SUMMARY:Review\\, quote\\; \\\\ notes\\nBEGIN:VEVENT'));
  assert(unfolded.includes('é🙂'.repeat(80)));
  assert(!text.replaceAll('\r\n', '').includes('\n'));
});

test('missing or invalid follow-up dates do not create a download', () => {
  for (const follow_up of [null, '', 'invalid']) assert.equal(generateIcsDownloadUrl({ id: 1, follow_up, summary: '', notes: '', outcome: '' }), undefined);
});
