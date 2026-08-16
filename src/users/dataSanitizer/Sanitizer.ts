import { Transform } from 'class-transformer';

export const Trim = () =>
  Transform(({ value }) => (typeof value === 'string' ? value.trim() : value));
export const Lowercase = () =>
  Transform(({ value }) =>
    typeof value === 'string' ? value.toLowerCase() : value,
  );
export const ToNumber = () =>
  Transform(({ value }) => (value === 'number' ? Number(value) : value));
