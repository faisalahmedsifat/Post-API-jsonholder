
export class CustomError extends Error {
    constructor(public status: number, message?: string) {
        super(message);
        this.name = 'CustomError';
    }
}

export function removeQuotationMarks(str: string): string {
    if(str.includes('"') || str.includes("'")) return str.replace(/['"]+/g, '');
    return str;
        
}
