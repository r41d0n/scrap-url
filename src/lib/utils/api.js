//Dependencies
import queryString from 'query-string';

//Config
import Config from '../../config';

export function apiFetch(endpoint, options = {}, query = false) {
    let qs;

    if (query) {
        qs = queryString.stringify(query);
    }

    const getPromise = async() => {
        try {
            const fetchOptions = apiOptions(options);
            const fetEndpoint = apiEndpoint(endpoint, qs);
            const response = await fetch(fetEndpoint, fetchOptions);
            return response.json();
        } catch (e) {
            throw e;
        }
    };

    return getPromise();
}


export function apiEndpoint(endpiont, qs) {
    let query = '';
    if (qs) {
        query = `?${qs}`;
    }

    console.log('esta es la ruta', `${Config.api.url}${endpiont}${query}`);
    return `${Config.api.url}${endpiont}${query}`;
}

export function apiOptions(options = {}) {
    const {
        method = 'GET',
            headers = {
                'Content-Type': 'application/json'
            },
            body = false
    } = options;

    const newOptions = {
        method,
        headers,
        credentials: 'include'
    };

    if (body) {
        newOptions.body = body;
    }
    return newOptions;
}