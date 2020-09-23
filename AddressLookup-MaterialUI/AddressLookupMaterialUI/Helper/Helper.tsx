import { Constants } from '../Constants/Constants';

/**
 * Address to search
 * @param _address 
 */
export const getAddresses = (_address: string, _apiKey: string):  any => {

    return new Promise<any>((resolve: any, reject: any) => {
        const requestOptions: any = {
            method: Constants.HTTP_METHOD_POST,
            headers: { "Content-Type" : Constants.HTTP_HEADER_CONTENT_FORM_URLENCODED},
            body: Constants.getRequestBody(_address , _apiKey)
        };
        fetch(Constants.DEFAULT_API_ENDPOINT_FIND, requestOptions)
            .then((response: any) => response.json())
            .then(response => {
                resolve(response.Items);
            });
    });
};

/**
 * get addresses by Find Id
 * @param _id 
 * @param _apiKey 
 */
export const getFindAddresses = (_id: string, _apiKey: string): any => {

    return new Promise<any>((resolve: any, reject: any) => {
        const requestOptions: any = {
            method: Constants.HTTP_METHOD_POST,
            headers: { "Content-Type" : Constants.HTTP_HEADER_CONTENT_FORM_URLENCODED},
            body: Constants.getRequestBodyFind(_id ,_apiKey)
        };
        fetch(Constants.DEFAULT_API_ENDPOINT_FIND, requestOptions)
            .then((response: any) => response.json())
            .then(response => {
                resolve(response.Items);
            });
    });
}

/**
 * get addresses by retrieve Id
 * @param _id 
 * @param _apiKey 
 */
export const retrieveAddress = (_id: string, _apiKey: string): any => {

    return new Promise<any>((resolve: any, reject: any) => {
        const requestOptions: any = {
            method: Constants.HTTP_METHOD_POST,
            headers: { "Content-Type" : Constants.HTTP_HEADER_CONTENT_FORM_URLENCODED},
            body: Constants.getRequestBodyRetrieve(_id ,_apiKey)
        };
        fetch(Constants.DEFAULT_API_ENDPOINT_RETRIEVE, requestOptions)
            .then((response: any) => response.json())
            .then(response => {
                resolve(response.Items);
            });
    });
}