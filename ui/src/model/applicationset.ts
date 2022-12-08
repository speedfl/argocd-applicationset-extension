import * as models from "./commons"

interface ItemsList<T> {
    /**
     * APIVersion defines the versioned schema of this representation of an object.
     * Servers should convert recognized schemas to the latest internal value, and may reject unrecognized values.
     */
    apiVersion?: string;
    items: T[];
    /**
     * Kind is a string value representing the REST resource this object represents.
     * Servers may infer this from the endpoint the client submits requests to.
     */
    kind?: string;
    metadata: models.ListMeta;
}

export interface ApplicationSetList extends ItemsList<ApplicationSet> {}

export interface SecretRef {
    secretName: string;
    key: string;
}

export interface ApplicationSet {
    apiVersion?: string;
    kind?: string;
    metadata: models.ObjectMeta;
    spec: ApplicationSetSpec;
    status?: ApplicationSetStatus;
}

export interface ApplicationSetSpec {
    goTemplate?: boolean;
    generators: ApplicationSetGenerator[];
    template: ApplicationSetTemplate;
    syncPolicy?: ApplicationSetSyncPolicy;
}

export interface ApplicationSetSyncPolicy {
    preserveResourcesOnDeletion?: boolean;
}

export interface ApplicationSetTemplate {
    spec: { [key: string]: any};
}

export interface ApplicationSetTemplateMeta {
    name?: string;
    namespace?: string;
    labels?: { [key: string]: string};
    annotations?: { [key: string]: string};
    finalizers?: string[];
}

export interface ApplicationSetGenerator {
    list?: ListGenerator;
    clusters?: ClusterGenerator;
    git?: GitGenerator;
    scmProvider?: SCMProviderGenerator;
    clusterDecisionResource?: DuckTypeGenerator;
    pullRequest?: PullRequestGenerator;
    matrix?: MatrixGenerator;
    merge?: MergeGenerator;
    selector?: { [key: string]: string};
}

export interface ApplicationSetNestedGenerator {
    list?: ListGenerator;
    clusters?: ClusterGenerator;
    git?: GitGenerator;
    scmProvider?: SCMProviderGenerator;
    clusterDecisionResource?: DuckTypeGenerator;
    pullRequest?: PullRequestGenerator;
    matrix?: { [key: string]: string};
    merge?: { [key: string]: string};
    selector?: { [key: string]: string};
}

export interface ApplicationSetTerminalGenerator {
    list?: ListGenerator;
    clusters?: ClusterGenerator;
    git?: GitGenerator;
    scmProvider?: SCMProviderGenerator;
    clusterDecisionResource?: DuckTypeGenerator;
    pullRequest?: PullRequestGenerator;
}

export interface ListGenerator {
    elements: { [key: string]: string}[];
    template?: ApplicationSetTemplate;
}

export interface MatrixGenerator {
    generators: ApplicationSetNestedGenerator[];
    template?: ApplicationSetTemplate;
}

export interface NestedMatrixGenerator {
    generators: ApplicationSetTerminalGenerator[];
}

export interface MergeGenerator {
    generators: ApplicationSetNestedGenerator[];
    mergeKeys: string[];
    template?: ApplicationSetTemplate;
}

export interface NestedMergeGenerator {
    generators: ApplicationSetTerminalGenerator[];
    mergeKeys: string[];
}

export interface ClusterGenerator {
    selector?: { [key: string]: string};
    template?: ApplicationSetTemplate;
    values?: { [key: string]: string};
}

export interface DuckTypeGenerator {
    configMapRef: string;
    name?: string;
    requeueAfterSeconds?: number;
    labelSelector?: { [key: string]: string};
    template?: ApplicationSetTemplate;
    values?: { [key: string]: string};
}

export interface GitGenerator {
    repoURL: string;
    directories?: GitDirectoryGeneratorItem[];
    files?: GitFileGeneratorItem[];
    revision: string;
    requeueAfterSeconds?: number;
    template?: ApplicationSetTemplate;
}

export interface GitDirectoryGeneratorItem {
    path: string;
    exclude?: boolean;
}

export interface GitFileGeneratorItem {
    path: string;
}

export interface SCMProviderGenerator {
    github?: SCMProviderGeneratorGithub;
    gitlab?: SCMProviderGeneratorGitlab;
    bitbucket?: SCMProviderGeneratorBitbucket;
    bitbucketServer?: SCMProviderGeneratorBitbucketServer;
    gitea?: SCMProviderGeneratorGitea;
    azureDevOps?: SCMProviderGeneratorAzureDevOps;
    filters?: SCMProviderGeneratorFilter[];
    cloneProtocol?: string;
    requeueAfterSeconds?: number;
    template?: ApplicationSetTemplate;
}

export interface SCMProviderGeneratorGitea {
    owner: string;
    api: string;
    tokenRef?: SecretRef;
    allBranches?: boolean;
    insecure?: boolean;
}

export interface SCMProviderGeneratorGithub {
    organization: string;
    api?: string;
    tokenRef?: SecretRef;
    appSecretName?: string;
    allBranches?: boolean;
}

export interface SCMProviderGeneratorGitlab {
    group: string;
    includeSubgroups?: boolean;
    api?: string;
    tokenRef?: SecretRef;
    allBranches?: boolean;
}

export interface SCMProviderGeneratorBitbucket {
    owner: string;
    user: string;
    appPasswordRef?: SecretRef;
    allBranches?: boolean;
}

export interface SCMProviderGeneratorBitbucketServer {
    project: string;
    api: string;
    basicAuth?: BasicAuthBitbucketServer;
    allBranches?: boolean;
}

export interface SCMProviderGeneratorAzureDevOps {
    organization: string;
    api?: string;
    teamProject: string;
    accessTokenRef?: SecretRef;
    allBranches?: boolean;
}

export interface SCMProviderGeneratorFilter {
    repositoryMatch?: string;
    pathsExist?: string[];
    pathsDoNotExist?: string[];
    labelMatch?: string;
    branchMatch?: string;
}

export interface PullRequestGenerator {
    github?: PullRequestGeneratorGithub;
    gitlab?: PullRequestGeneratorGitLab;
    gitea?: PullRequestGeneratorGitea;
    bitbucketServer?: PullRequestGeneratorBitbucketServer;
    filters?: PullRequestGeneratorFilter[];
    requeueAfterSeconds?: number;
    template?: ApplicationSetTemplate;
}

export interface PullRequestGeneratorGitea {
    owner: string;
    repo: string;
    api: string;
    tokenRef?: SecretRef;
    insecure?: boolean;
}

export interface PullRequestGeneratorGithub {
    owner: string;
    repo: string;
    api?: string;
    tokenRef?: SecretRef;
    appSecretName?: string;
    labels?: string[];
}

export interface PullRequestGeneratorGitLab {
    project: string;
    api?: string;
    tokenRef?: SecretRef;
    labels?: string[];
    pullRequestState?: string;
}

export interface PullRequestGeneratorBitbucketServer {
    project: string;
    repo: string;
    api: string;
    basicAuth?: BasicAuthBitbucketServer;
}

export interface BasicAuthBitbucketServer {
    username: string;
    passwordRef?: SecretRef;
}

export interface PullRequestGeneratorFilter {
    branchMatch?: string;
}

export interface ApplicationSetStatus {
    conditions?: ApplicationSetCondition[];
}

export type ApplicationSetConditionType = 'ErrorOccurred' | 'ParametersGenerated' | 'ResourcesUpToDate';

export type ApplicationSetConditionStatus = 'True' | 'False' | 'Unknown'

export interface ApplicationSetCondition {
    type: ApplicationSetConditionType;
    message: string;
    lastTransitionTime?: string;
    status: ApplicationSetConditionStatus;
    reason: string;
}