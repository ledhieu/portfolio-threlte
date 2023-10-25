import {createClient} from "@sanity/client";
import { SECRET_SANITY_TOKEN } from "$env/static/private"

const client = createClient({
    projectId: "aqkpnts2",
    dataset: "production",
    apiVersion: "2023-07-28",
    token: SECRET_SANITY_TOKEN,
    useCdn: false
});

const weaponsQuery = `
*[ _type == "weaponCategory"]{
    _id, title,
    "weapons":  *[ _type == 'weapon' && references(^._id)]{
      _id, title,
      weaponCategories[]->
    }
  }
`

export async function load({ params }) {
    const data = await client.fetch(`
    *[_type == "weapon"]{
        name
    }`
    );
    
    return {
        weapons: data
    }

    // if (data) {
    //     console.log(data)
    //     return {
    //         weapons: data
    //     };
    // }
    // return {
    //     status: 500,
    //     body: new Error("Internal Server Error")
    // };
}