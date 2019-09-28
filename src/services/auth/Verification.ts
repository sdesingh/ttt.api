let randomize = require('randomatic');

export function generateVerificationKey(): string {
  return randomize('A0', 5);
}