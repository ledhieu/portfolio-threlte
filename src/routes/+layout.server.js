import {createClient} from "@sanity/client";
import { SECRET_SANITY_TOKEN } from "$env/dynamic/private"

export function load(){
    const client = createClient({
        projectId: "aqkpnts2",
        dataset: "production",
        apiVersion: "2023-07-28",
        token: SECRET_SANITY_TOKEN,
        useCdn: false
    });

    return {
    }
}