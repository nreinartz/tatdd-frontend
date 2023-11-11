import { QueryType, type QueryEntry, type QuerySummary } from "@/types/api-models";

export async function createSession(type: QueryType, topics: string[], startYear: number,
    endYear: number, distance: number, minCitations: number): Promise<QueryEntry> {
    const response = await fetch('http://localhost:8000/api/queries', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            query_type: type,
            topics,
            start_year: startYear,
            end_year: endYear,
            distance,
            min_citations: minCitations
        })
    });

    return await response.json();
}

export async function getSession(uuid: string): Promise<QueryEntry> {
    const response = await fetch("http://127.0.0.1:8000/api/queries/" + uuid);
    return response.json();
}

export async function getSessionSummary(uuid: string): Promise<QuerySummary> {
    const response = await fetch(`http://127.0.0.1:8000/api/queries/${uuid}/summary`);
    return response.json();
}