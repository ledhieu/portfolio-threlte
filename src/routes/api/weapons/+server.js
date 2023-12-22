import {createClient} from "@sanity/client";
import { SECRET_SANITY_TOKEN } from "$env/static/private"
import { json } from '@sveltejs/kit';

const client = createClient({
    projectId: "aqkpnts2",
    dataset: "production",
    apiVersion: "2023-07-28",
    token: SECRET_SANITY_TOKEN,
    useCdn: false
});

const projectsQuery = `
*[ _type == "weaponCategory"]{
    _id, 
    title,
    designSide,
    "weapons": *[ _type == 'weapon' && references(^._id)]
    | order(title) {
        _id, title,
        slug,
        familiarity,
        fondness,
        description,
        "mainImage": mainImage.asset->url,
        "projects": *[ _type == 'project' && references(^._id)]{
            _id, title,
            "mainImage": mainImage.asset->url
        }
    }
  }
`

export async function GET({ request }){
    const data = await client.fetch(projectsQuery)
    console.log(data)
    
    return new Response(JSON.stringify(data))
};