import queryString from 'query-string';

export const baseURl = __DEV__ ? 'http://localhost:8080' : 'https://zyada.app.iterate.no';

let authorization = '';

function _appUrl(url, params) {
    return baseURl + url + '?' + queryString.stringify(params);
}

export function setAuthorizationToken(token) {
    authorization = token;
}

function setHeaders(method, body, optHeader) {
    const headers = Object.assign(
        {
            Accept: 'application/json',
            'Content-Type': 'application/json',
        },
        optHeader,
    );

    if (authorization) {
        headers.authorization = `Bearer ${authorization}`;
    }

    return {
        method,
        headers,
        body,
    };
}

export async function postMultipart(url, uri) {
    const image = {
        uri: uri.path,
        type: 'image/jpeg',
        name: 'temp.jpg',
    };
    // Instantiate a FormData() object
    const imgBody = new FormData();
    // append the image to the object with the title 'image'
    imgBody.append('image', image);
    // Perform the request. Note the content type - very important
    const response = await fetch(baseURl + url, {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'multipart/form-data',
            authorization: `Bearer ${authorization}`,
        },
        body: imgBody,
    });

    return _handleResponse(response);
}

export async function get(url, params) {
    const response = await fetch(_appUrl(url, params), setHeaders('GET'));

    return _handleResponse(response);
}

export async function post(url, obj) {
    const response = await fetch(_appUrl(url), setHeaders('POST', JSON.stringify(obj)));

    return _handleResponse(response);
}

export async function del(url, obj) {
    const response = await fetch(_appUrl(url), setHeaders('DELETE', JSON.stringify(obj)));
    return _handleResponse(response);
}

export async function put(url, obj) {
    const response = await fetch(_appUrl(url), setHeaders('PUT', JSON.stringify(obj)));

    return _handleResponse(response);
}

const _handleResponse = async response => {
    if (response.status === 201 || response.status === 204) return;

    const responseJson = await response.json();

    if (response.status >= 400) {
        const msg = responseJson.msg || responseJson.message;
        throw {
            message: msg,
        };
    }

    return responseJson;
};
