import test from 'node:test';
import assert from 'node:assert/strict';
import { WISH_TEMPLATES, formatWishLetter, validateWishContent } from './wishes.ts';

test('WISH_TEMPLATES contains all primary recipient categories', () => {
  assert.ok(WISH_TEMPLATES.length >= 5);
  const categories = WISH_TEMPLATES.map(t => t.category);
  assert.ok(categories.includes('mom'));
  assert.ok(categories.includes('lover'));
  assert.ok(categories.includes('teacher'));
  assert.ok(categories.includes('sister'));
  assert.ok(categories.includes('colleague'));
});

test('formatWishLetter applies defaults when no custom data provided', () => {
  const momTemplate = WISH_TEMPLATES.find(t => t.category === 'mom')!;
  const result = formatWishLetter(momTemplate);
  assert.equal(result.recipient, momTemplate.recipientDefault);
  assert.equal(result.content, momTemplate.content);
  assert.equal(result.sender, momTemplate.authorSignature);
});

test('formatWishLetter overrides with custom values', () => {
  const template = WISH_TEMPLATES[0];
  const custom = {
    recipient: 'Mẹ Lan',
    sender: 'Tuấn & Linh',
    content: 'Chúc Mẹ luôn an vui và khỏe mạnh từng ngày!',
  };
  const result = formatWishLetter(template, custom);
  assert.equal(result.recipient, 'Mẹ Lan');
  assert.equal(result.sender, 'Tuấn & Linh');
  assert.equal(result.content, 'Chúc Mẹ luôn an vui và khỏe mạnh từng ngày!');
  // Should keep default quote if not customized
  assert.equal(result.quote, template.quote);
});

test('validateWishContent handles valid and invalid inputs', () => {
  const emptyRes = validateWishContent('');
  assert.equal(emptyRes.isValid, false);
  assert.ok(emptyRes.error);

  const shortRes = validateWishContent('Chúc bạn');
  assert.equal(shortRes.isValid, false);

  const validRes = validateWishContent('Chúc mừng ngày Phụ nữ Việt Nam 20/10 thật hạnh phúc!');
  assert.equal(validRes.isValid, true);
  assert.equal(validRes.error, undefined);
});
