export interface Content {
    id: number;
    name: string;
    contact: string;
    address: string;
}

export interface CodeInfo {
    id?: number;
    name?: string;
    address?: string;
    action?: string;
    contact?: string;
}

export interface AlertContent {
    message?: string;
    title?: string;
    type?: string;
}