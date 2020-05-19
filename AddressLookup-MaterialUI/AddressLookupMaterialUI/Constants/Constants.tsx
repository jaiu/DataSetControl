export class Constants {
    public static readonly DEFAULT_STRING = "";
    public static readonly comma_DELIMETER = ", ";
    public static readonly DEFAULT_COUNTRY ="CANADA";
    public static readonly DEFAULT_HINT = "Lookup Address";
    public static readonly DEFAULT_API_ENDPOINT = "https://ws1.postescanada-canadapost.ca/AddressComplete/Interactive/Find/v2.10/json3.ws";
    public static readonly HTTP_METHOD_POST = "POST";
    public static readonly HTTP_HEADER_CONTENT_FORM_URLENCODED = "application/x-www-form-urlencoded";
    public static readonly AUTOCOMPLETE_SELECT_OPTION = "select-option";

    //method to get request body
    //HE69-PF84-NE95-EN37
    public static getRequestBody = (address: string, apiKey: string): string => {
        return `Key=${apiKey}&SearchTerm=${address}&LastId=\"\"&SearchFor=Everything&Country=CAN&LanguagePreference=en&MaxSuggestions=7&MaxResults=7`
    }
}