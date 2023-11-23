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

const characterQuery = `
*[ _type == "class"]{
    _id, 
    title, 
    designSide,
    description,
    "mainImage": mainImage.asset->url,
  }
`

export async function GET({ request }){
    const data = await client.fetch(characterQuery)
    console.log(data)
    
    return new Response(JSON.stringify(data))
};