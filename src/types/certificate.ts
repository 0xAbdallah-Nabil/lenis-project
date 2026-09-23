export interface Certificate {
    id: string;
    title: string;
    issuer: string;
    date: string;        // e.g. "Mar 2024"
    credentialUrl?: string;
    image?: string;      // badge/logo image, optional
    skills?: string[];   // short tags shown on the card
}