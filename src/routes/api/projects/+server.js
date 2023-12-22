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
*[ _type == "projectCategory"]{
    _id, 
    title, 
    designSide,
    "projects":  *[ _type == 'project' && references(^._id)] | order(date desc){
      _id, title,
      slug, 
      "mainImage": mainImage.asset->url,
      roles, date,
      url,
      body, weapons[]->,
      projectCategories[]->
    }
  }
`

export async function GET({ request }){
    const data = await client.fetch(projectsQuery)
    console.log(data)
    
    return new Response(JSON.stringify(data))
};