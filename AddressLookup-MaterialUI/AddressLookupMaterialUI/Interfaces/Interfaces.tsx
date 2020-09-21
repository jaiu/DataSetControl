//#region AddressLookup Interfaces
export interface IAddress {
    cursor: Number;
    Description: string;
    Highlight: string;
    Id: string;
    Next: string;
    Text: string;
}

export interface IAddressProps {
    CompleteAddress?: IAddress;
    APIKey: string;
    handleOnChange: (value:IAddress) => void;
}

export interface IAddressState {
    Addresses: IAddress[];
    isLoading: boolean;
}
//#endregion

//#region LisOption Interfaces
export interface IListOptionProps {
    Description: string;
    Id: string;
    Next: string
    Text: string;
    findAddresses: (event:React.MouseEvent<HTMLElement>, Id: string) => void;
}
//#endregion
