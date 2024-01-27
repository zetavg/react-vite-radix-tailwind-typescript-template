import { cn } from '@/lib/utils';

describe('cn', () => {
  it('should concatenate class names', () => {
    const result = cn('class1', 'class2', 'class3');
    expect(result).toBe('class1 class2 class3');
  });

  it('should handle empty inputs', () => {
    const result = cn();
    expect(result).toBe('');
  });

  it('should handle falsy inputs', () => {
    const result = cn('class1', null, undefined, 'class2', false, 'class3');
    expect(result).toBe('class1 class2 class3');
  });

  it('should handle objects', () => {
    const result = cn('class1', { class2: true, class3: false });
    expect(result).toBe('class1 class2');
  });

  it('should remove duplicated Tailwind classes', () => {
    const result = cn('flex', 'flex-col', ['flex'], { 'flex-col': true });
    expect(result).toBe('flex flex-col');
  });
});
