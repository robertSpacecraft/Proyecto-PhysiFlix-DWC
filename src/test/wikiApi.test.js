import { connect } from "../api/apiClient.js";

export async function testConnect() {
    const data = await connect({
        action: "query",
        prop: "extracts",
        titles: "Albert Einstein",
        exintro: "1",
        explaintext: "1",
    });

    console.log("TEST CONNECT OK:", data);
    return data;
}

