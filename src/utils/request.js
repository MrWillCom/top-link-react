export default async function request (param = {}) {
    let baseUrl = "http://127.0.0.1/api/v1";
    let url = `${baseUrl}${param.url}`;
    let method = param.method || "GET";
    let data = param.data || {};
    let headers = param.headers || {"Content-Type": "application/json"};
    let options = {
        method: method,
        headers: headers,
    }
    if (method === "POST" || method === "PUT" || method === "PATCH" || method === "DELETE") {
        options.body = JSON.stringify(data);
    }
    let response = await fetch(url, options);
    let result = await response.json();
    return result;
};