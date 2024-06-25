export function formatDate(dateInput: Date | undefined): string {
    if (!dateInput) {
        return ''; // ou retournez une chaîne vide ou un message approprié
    }
    const date = new Date(dateInput);

    const hours = String(date.getUTCHours()).padStart(2, '0');
    const minutes = String(date.getUTCMinutes()).padStart(2, '0');
    const seconds = String(date.getUTCSeconds()).padStart(2, '0');
    
    const day = String(date.getUTCDate()).padStart(2, '0');
    const month = String(date.getUTCMonth() + 1).padStart(2, '0'); // Les mois commencent à 0
    const year = date.getUTCFullYear();

    return `${hours}:${minutes}:${seconds} ${day}/${month}/${year}`;
}
