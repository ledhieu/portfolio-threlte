import {createClient} from "@sanity/client";
// import { SECRET_SANITY_TOKEN } from "$env/dynamic/private"

const client = createClient({
    projectId: "aqkpnts2",
    dataset: "production",
    apiVersion: "2023-07-28",
    // token: SECRET_SANITY_TOKEN,
    useCdn: false
});

export default client