export interface ServerToClientEvents {
    comment: (data: any) => void;
    typing: (data: any) => void;
}

export interface ClientToServerEvents {
    comment: (data: any) => void;
    typing: (data: any) => void;
}

export interface InterServerEvents {
    ping: () => void;
    // comment: (data: any) => void;
}

export interface SocketData {
    name: string;
    age: number;
    time: any;
}
