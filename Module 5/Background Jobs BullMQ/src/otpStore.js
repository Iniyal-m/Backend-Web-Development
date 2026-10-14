
'use strict';

const store = new Map();

function generateOTP() {
  return String(Math.floor(100000 + Math.random() * 900000));
}

function storeOTP(email, otp) {
  store.set(email, {
    otp: otp,
    expiresAt: Date.now() + 10 * 60 * 1000,
    attempts: 0
  });
}

function verifyOTP(email, code) {
  const data = store.get(email);

  if (!data) {
    return { ok: false, reason: 'not_found' };
  }

  if (Date.now() >= data.expiresAt) {
    store.delete(email);
    return { ok: false, reason: 'expired' };
  }

  if (data.attempts >= 3) {
    return { ok: false, reason: 'too_many_attempts' };
  }

  if (data.otp !== code) {
    data.attempts++;
    return { ok: false, reason: 'wrong_code' };
  }

  store.delete(email);
  return { ok: true };
}

function markVerified(email) {
  console.log(`Email verified: ${email}`);
}

module.exports = {
  generateOTP,
  storeOTP,
  verifyOTP,
  markVerified,
  _store: store
};

