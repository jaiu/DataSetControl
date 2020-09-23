import { IRetrieveAddress } from '../IRetrieveAddress/IRetrieveAddress';

export interface IAddressProps {
    CompleteAddress?: IRetrieveAddress;
    APIKey: string;
    handleOnChange: (value:IRetrieveAddress[]) => void;
}