import * as React from 'react';
import Autocomplete, { AutocompleteChangeReason, AutocompleteChangeDetails } from '@material-ui/lab/AutoComplete';
import { TextField, Button, Box } from '@material-ui/core';
import { Constants } from '../Constants/Constants';
import { IAddressProps, IAddressState, IAddress } from '../Interfaces/Interfaces';
import { ListOption } from '../ListOption/ListOption';


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
                    renderOption={(option: IAddress) => ( <ListOption Description={option.Description} Id={option.Id} Next={option.Next} Text={option.Text}> </ListOption>)}
                    getOptionLabel={(option:IAddress) => (option.Text + Constants.comma_DELIMETER + option.Description + Constants.DEFAULT_STRING)}
                    onInputChange={(event: React.ChangeEvent<{}>, newInputValue:string):void => {
                        this.handleChange(event, newInputValue);
                    }}
                    onChange={(e: React.ChangeEvent<{}>, value: any, reason: AutocompleteChangeReason, details: AutocompleteChangeDetails<IAddress>|undefined): void => {
                        console.log(e.target);
                        (reason === Constants.AUTOCOMPLETE_SELECT_OPTION) ? this.onSelectOptionValueChange(value) : console.log(`reason: ${reason} details: ${details}`);
                    }}
                    renderInput={(params:any) => <TextField  {...params} label={Constants.DEFAULT_HINT} variant="outlined"></TextField>}
                />
            </div>
        )
    }
}