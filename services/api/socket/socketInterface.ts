export interface userConnectedPayload {
    socket_id: string;
}

export interface userDisconnectedPayload {
    socket_id: string;
}

export interface connectServerPayload {
    socket_id:string;
    event_name:string;
}