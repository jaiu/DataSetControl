import * as React from 'react';
import Autocomplete, { AutocompleteChangeReason, AutocompleteChangeDetails } from '@material-ui/lab/AutoComplete';
import { TextField } from '@material-ui/core';
import { Constants } from '../Constants/Constants';

//address Interface
export interface IAddress {
    cursor: Number;
    Description: string;
    Highlight: string;
    Id: string;
    Next: string;
    Text: string;
}

//address props interface
export interface IAddressProps {
    CompleteAddress?: IAddress;
    APIKey: string;
    handleOnChange: (value:IAddress) => void;
}

//address State interface
export interface IAddressState {
    Addresses: IAddress[];
}

//initial addresses
const initialAddresses: IAddress[] = [];

//implement Component
export class AddressLookup extends React.Component<IAddressProps, IAddressState>{

    constructor(props: IAddressProps){
        super(props);

        //initial addresses set to empty
        this.state = {
            Addresses: initialAddresses
        }
    }

    /**
     * when valur changes in the autocomplete text
     */
    private handleChange = (e: React.ChangeEvent<{}>, newValue: string):void =>  {
        this.getAddress(newValue);
    }

    /**
     * new selected value change event 
     */ 
    private onSelectOptionValueChange = (newValue: IAddress) : void => {
        this.props.handleOnChange(newValue);
    }

    /**
     * call API and Get addresses
     */
    private getAddress = (_address: string):  void => {

        const requestOptions: any = {
          method: Constants.HTTP_METHOD_POST,
          headers: { "Content-Type" : Constants.HTTP_HEADER_CONTENT_FORM_URLENCODED},
          body: Constants.getRequestBody(_address ,this.props.APIKey)
        };
        fetch(Constants.DEFAULT_API_ENDPOINT, requestOptions)
            .then((response: any) => response.json())
            .then(response => {
                this.setState({
                    Addresses: response.Items
                })
            });
    }

    /**
     * component render method
     */
    public render() : JSX.Element{
        return(
            <div>
                <Autocomplete
                    options={this.state.Addresses} 
                    getOptionLabel={(option:IAddress) => (option.Text + Constants.comma_DELIMETER + option.Description)}
                    onInputChange={(event: React.ChangeEvent<{}>, newInputValue:string):void => {
                        this.handleChange(event, newInputValue);
                    }}
                    onChange={(e: React.ChangeEvent<{}>, value: any, reason: AutocompleteChangeReason, details: AutocompleteChangeDetails<IAddress>|undefined): void => {
                        (reason === Constants.AUTOCOMPLETE_SELECT_OPTION) ? this.onSelectOptionValueChange(value) : console.log(`reason: ${reason} details: ${details}`);
                    }}
                    renderInput={(params:any) => <TextField  {...params} label={Constants.DEFAULT_HINT} variant="outlined"></TextField>}
                />
            </div>
        )
    }
}