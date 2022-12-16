export type HealthStatus =  'Healthy' | 'Degraded' | 'Progressing' | 'Unknown' | 'Suspended' | 'Missing';

export interface Health {
    status: HealthStatus;
}

export interface NodeBase {
    group: string;
    kind: string;
    namespace: string;
    name: string;
    uid: string;
}

export interface Node extends NodeBase {
    version: string;
    parentRefs?: Node[];
    resourceVersion: string;
    health: Health;
    createdAt: string;
}

export interface Tree {
    nodes: Node[];
}