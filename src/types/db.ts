import { RowDataPacket } from 'mysql2'

export interface User implements RowDataPacket {
    id: number;
    first_name: number;
    last_name: number;
    email: string;
    password_hash: string;
}

export interface Service implements RowDataPacket {
    id: number;
    admin_id: number;
    name: string;
    timezone: string;
    closed: boolean;
    duration: number;
    description?: string;
}

export interface Schedule implements RowDataPacket {
    service_id
}