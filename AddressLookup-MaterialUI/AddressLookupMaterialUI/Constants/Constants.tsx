export class Constants {
    public static readonly DEFAULT_STRING = "";
    public static readonly comma_DELIMETER = ", ";
    public static readonly DEFAULT_COUNTRY ="CANADA";
    public static readonly DEFAULT_HINT = "Lookup Address";
    public static readonly DEFAULT_API_ENDPOINT = "https://ws1.postescanada-canadapost.ca/AddressComplete/Interactive/Find/v2.10/json3.ws";
    public static readonly HTTP_METHOD_POST = "POST";
    public static readonly HTTP_HEADER_CONTENT_FORM_URLENCODED = "application/x-www-form-urlencoded";
    public static readonly AUTOCOMPLETE_SELECT_OPTION = "select-option";
    public static readonly NEXT = {
        Retrieve: "Retrieve",
        Find: "Find",
    }

    /**
     * Get request body for search call
     * @param address 
     * @param apiKey 
     */
    public static getRequestBody = (_address: string, _apiKey: string): string => {
        return `Key=${_apiKey}&SearchTerm=${_address}&LastId=\"\"&SearchFor=Everything&Country=CA&LanguagePreference=en&MaxSuggestions=20&MaxResults=20`
    }

    public static getRequestBodyFind = (_id: string, _apiKey: string): string => {
        return `Key=${_apiKey}&LastId=${_id}`;
    }




}