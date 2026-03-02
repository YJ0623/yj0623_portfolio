import GithubGrassUI from "./GithubGrassUI";

export default async function GithubGrass() {
    let contributions = [];

    try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/github`, {
            cache: 'no-store',
        });
        const data = await res.json();
        contributions = data.levels;
    } catch (error) {
        console.error("Failed to fetch GitHub contributions:", error);
    }

    return <GithubGrassUI contributions={contributions} />;
}