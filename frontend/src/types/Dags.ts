export interface Dag {
    id: number;
    name: string;
    age: number;
    breed: string;
}

export interface DagResponse {
    success: boolean;
    message: string;
    dogs: Dag[];
}