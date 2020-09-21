import { Constants } from '../Constants/Constants';
import { IAddress } from '../Interfaces/Interfaces';


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
        fetch(Constants.DEFAULT_API_ENDPOINT, requestOptions)
            .then((response: any) => response.json())
            .then(response => {
                resolve(response.Items);
            });
    });
};