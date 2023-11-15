export enum TrendType {
    None = 0,
    Increasing = 1,
    Decreasing = 2,
}

// Dataclass
export interface Trend {
    start: number;
    end: number;
    type: TrendType;
    line: number[];
}


export enum QueryType {
    CITATION_RECOMMENDATION = 1,
    TREND_ANALYSIS = 2,
    ALL = 3,
}

export enum QueryProgress {
    Queued = 1,
    DataRetrieval = 2,
    AnalysingTrends = 3,
    GeneratingDescription = 4,
    DiscoveringTopics = 5,
    ClusteringTopics = 6,
    CitationRetrieval = 7,
    Finished = 8,
    Failed = 9
}

// export interfaces/Types
export interface QueryRequest {
    query_type: QueryType;
    topics: string[];
    start_year: number;
    end_year: number;
    distance?: number;
}

export interface SearchResults {
    raw: number[];
    adjusted: number[];
    pub_types: { [type: string]: number };
}

export interface TrendResults {
    breakpoints: number[];
    global_trend: Trend;
    sub_trends: Trend[];
    trend_description: string | null;
}

export interface Publication {
    title: string;
    doi: string;
    authors: string[];
    year: number;
    type: string;
    abstract: string;
    distance: number;
    citations: number;
}

interface DiscoveredTopic {
    id: number;
    words: string[][];
    frequencies: number[];
    timestamps: number[];
}

interface ClusteringResults {
    points_x: number[];
    points_y: number[];
    points_z: number[];
    topic_labels: number[];
}

interface TopicDiscoveryResults {
    topics: { [key: string]: string };
    clusters: ClusteringResults;
    topics_over_time: DiscoveredTopic[];
}

export interface AnalysisResults {
    search_results?: SearchResults | null;
    trend_results?: TrendResults | null;
    topic_discovery_results?: TopicDiscoveryResults | null;
    citation_results?: CitationRecommendationResults | null;
}

export interface CitationRecommendationResults {
    publications: Publication[];
}

export interface QueryEntry {
    uuid: string;
    type: QueryType;
    progress: QueryProgress;
    topics: string[];
    start_year: number;
    end_year: number;
    distance: number;
    results: AnalysisResults;
}

export type QuerySummary = Pick<QueryEntry, 'uuid' | 'type' | 'progress' | 'topics' | 'start_year' | 'end_year' | 'distance'>;

export interface DataStatistics {
    total_publications: number;
    publications_per_year: { [year: number]: number };
}