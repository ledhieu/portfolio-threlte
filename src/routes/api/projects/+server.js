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
*[ _type == "projectCategory"] | order("count" desc){
  _id, 
  title, 
  designSide,
  "projects":  *[ _type == 'project' && references(^._id)] | order(date desc){
    _id, title,
    type,
    slug, 
    "mainImage": mainImage.asset->url,
    roles, date,
    url,
    body, weapons[]->,
    projectCategories[]->
  },
  "count": count(*[ _type == 'project' && references(^._id)] )
}
`

export async function GET({ request }){
    const data = await client.fetch(projectsQuery)
    console.log(data)
    
    return new Response(JSON.stringify(data))
};