import { IAddress } from '../IAddress/IAddress';

export interface IAddressState {
    Addresses: IAddress[];
    isLoading: boolean;
    isExpandClicked: boolean,
    expandKey: number,
}