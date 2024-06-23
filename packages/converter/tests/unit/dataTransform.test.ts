import { describe, it } from 'vitest';

describe('Date transform', () => {
	it('Should transform timestamp date', ({ expect }) => {
		const timestamp = 993204000000
		const date = new Date(timestamp);

    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Les mois commencent à 0
    const year = date.getFullYear();

    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    const seconds = String(date.getSeconds()).padStart(2, '0');

		expect(`${day}/${month}/${year} ${hours}:${minutes}:${seconds}`).toBe("22/06/2001 12:00:00")
	});
});
