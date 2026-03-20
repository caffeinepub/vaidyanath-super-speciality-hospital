import type { Principal } from "@icp-sdk/core/principal";
export interface Some<T> {
    __kind__: "Some";
    value: T;
}
export interface None {
    __kind__: "None";
}
export type Option<T> = Some<T> | None;
export interface Appointment {
    message: string;
    preferredDate: string;
    timestamp: Time;
    patientName: string;
    phoneNumber: string;
}
export type Time = bigint;
export interface backendInterface {
    getAllAppointments(): Promise<Array<Appointment>>;
    submitAppointment(patientName: string, phoneNumber: string, preferredDate: string, message: string): Promise<void>;
}
