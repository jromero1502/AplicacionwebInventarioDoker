const { debounce, formatCOP, searchItems } = require('../app');

describe('formatCOP', () => {
  test('formats positive numbers with currency and locale', () => {
    const formatted = formatCOP(1234567.49);
    expect(formatted.startsWith('$')).toBe(true);
    expect(formatted.endsWith('COP')).toBe(true);
  });

  test('defaults to 0 when value is not provided', () => {
    expect(formatCOP()).toBe('$0 COP');
  });
});

describe('searchItems', () => {
  const sample = [
    { id: '1', name: 'Portátil Gamer', desc: 'GPU dedicada' },
    { id: '2', name: 'Mouse', desc: 'inalámbrico' },
    { id: '3', name: 'Teclado', desc: 'Mecánico retroiluminado' }
  ];

  test('matches results by name or description case-insensitively', () => {
    expect(searchItems(sample, 'pOrTÁ')).toHaveLength(1);
    expect(searchItems(sample, 'retroILUMINADO')).toHaveLength(1);
  });

  test('returns empty array when query is blank', () => {
    expect(searchItems(sample, '   ')).toEqual([]);
  });
});

describe('debounce', () => {
  beforeEach(() => {
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  test('delays execution until wait time has elapsed', () => {
    const fn = jest.fn();
    const debounced = debounce(fn, 300);

    debounced('first');
    debounced('second');

    expect(fn).not.toHaveBeenCalled();
    jest.advanceTimersByTime(299);
    expect(fn).not.toHaveBeenCalled();
    jest.advanceTimersByTime(1);
    expect(fn).toHaveBeenCalledTimes(1);
    expect(fn).toHaveBeenCalledWith('second');
  });
});
