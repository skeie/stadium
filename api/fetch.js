import queryString from 'query-string';

export const baseURl = __DEV__ ? 'http://localhost:8080' : 'https://zyada.app.iterate.no';

let authorization = '';

function makeid() {
    var text = '';
    var possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

    for (var i = 0; i < 5; i++)
        text += possible.charAt(Math.floor(Math.random() * possible.length));

    return text;
}

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

export const uploadPhoto = localUri => {
    const formData = new FormData();
    const data = {
        uri: localUri,
        name: `${makeid()}.jpg`,
        type: 'image/jpeg',
    };

    formData.append('data', data);

    const options = {
        method: 'POST',
        body: formData,
        headers: {
            Accept: 'application/json',
            'Content-Type': 'multipart/form-data',
        },
    };

    return fetch(`https://api.graph.cool/file/v1/cjdizt45h14ca016541zn4b91`, options)
        .then(response => {
            return response.json();
        })
        .then(image => {
            console.log(image);
            return image;
        })
        .catch(error => console.error(`Error uploading image`));
};

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
