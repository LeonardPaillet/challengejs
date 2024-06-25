import { describe, it, expect } from 'vitest';

import { formatDate } from './services/utils';

describe('formatDate', () => {
    it('should format a valid date correctly', () => {
        const date = new Date('2024-06-24T13:43:05.678Z');
        const formattedDate = formatDate(date);
        expect(formattedDate).toBe('13:43:05 24/06/2024');
    });

    it('should format another valid date correctly', () => {
        const date = new Date('2023-12-01T08:15:30.123Z');
        const formattedDate = formatDate(date);
        expect(formattedDate).toBe('08:15:30 01/12/2023');
    });
});
