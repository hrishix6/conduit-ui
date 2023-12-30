import { LoaderFunction } from "react-router-dom";
import { loadArticals } from "..";

export const articleListLoader: LoaderFunction = async ({ request }) => {

    const url = new URL(request.url);
    const offset = url.searchParams.get("offset");
    const tag = url.searchParams.get("tag");

    const offsetparsed = offset ? parseInt(offset) : 0;

    const articles = await loadArticals(offsetparsed, 20, tag);

    return { articles: articles || [] };
} 
