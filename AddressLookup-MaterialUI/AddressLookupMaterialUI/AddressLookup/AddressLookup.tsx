import * as React from 'react';
import Autocomplete, { AutocompleteChangeReason, AutocompleteChangeDetails } from '@material-ui/lab/AutoComplete';
import { CircularProgress, TextField } from '@material-ui/core';
import { Constants } from '../Constants/Constants';
import { IAddressProps, IAddressState, IAddress } from '../Interfaces/Interfaces';
import { ListOption } from '../ListOption/ListOption';
import { getAddresses, getFindAddresses } from '../Helper/Helper';


//initial addresses
const initialAddresses: IAddress[] = [];

//implement Component
export class AddressLookup extends React.Component<IAddressProps, IAddressState>{

    constructor(props: IAddressProps){
        super(props);

        //initial addresses set to empty
        this.state = {
            Addresses: initialAddresses,
            isLoading: false
        }
    }

    /**
     * when value gets entered into AutoComplete box
     * @param e 
     * @param newValue 
     */
    private handleInputChange = (e: React.ChangeEvent<{}>, _newValue: string):void =>  {
        
        //set state to loading
        this.setState({
            isLoading: true
        });

        //once data received
        getAddresses(_newValue, this.props.APIKey).then((_addresses: any) => {
            this.setState({
                Addresses: _addresses,
                isLoading: false
            })
        });
    }

    /**
     * new address value
     * @param newValue 
     */ 
    private onSelectOptionValueChange = (_newValue: IAddress) : void => {
        this.props.handleOnChange(_newValue);
    }

    /**
     * Id to get address range
     * @param id 
     */
    private findAddresses = (event:React.MouseEvent<HTMLElement>, _id: string) => {
        
        //set state to loading
        this.setState({
            isLoading: true,
        });

        //once data received
        getFindAddresses(_id, this.props.APIKey).then((_addresses: any) => {
            this.setState({
                Addresses: _addresses,
                isLoading: false,
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
                    renderOption={(option: IAddress) => ( <ListOption Description={option.Description} Id={option.Id} Next={option.Next} Text={option.Text}
                        findAddresses={this.findAddresses}> </ListOption>)}
                    getOptionLabel={(option:IAddress) => (option.Text + Constants.comma_DELIMETER + option.Description + Constants.DEFAULT_STRING)}
                    onInputChange={(event: React.ChangeEvent<{}>, newInputValue:string):void => {
                        this.handleInputChange(event, newInputValue);
                    }}
                    disableCloseOnSelect
                    loading={true}
                    onChange={(e: React.ChangeEvent<{}>, value: any, reason: AutocompleteChangeReason, details: AutocompleteChangeDetails<IAddress>|undefined): void => {
                        (reason === Constants.AUTOCOMPLETE_SELECT_OPTION) ? this.onSelectOptionValueChange(value) : console.log(`reason: ${reason} details: ${details}`);
                    }}
                    renderInput={(params:any) => <TextField  {...params} label={Constants.DEFAULT_HINT} variant="outlined" InputProps={{
                        ...params.InputProps,
                        endAdornment: (
                          <React.Fragment>
                            {this.state.isLoading ? <CircularProgress color="inherit" size={20} /> : null}
                            {params.InputProps.endAdornment}
                          </React.Fragment>
                        ),
                      }}></TextField>}
                />
            </div>
        )
    }
}