import * as React from 'react';
import Autocomplete, { AutocompleteChangeReason, AutocompleteChangeDetails } from '@material-ui/lab/AutoComplete';
import { CircularProgress, TextField } from '@material-ui/core';
import { Constants } from '../Constants/Constants';
import { ListOption } from '../ListOption/ListOption';
import { getAddresses, getFindAddresses, retrieveAddress } from '../Helper/Helper';
import { IAddress } from '../Interfaces/IAddress/IAddress';
import { IAddressProps } from '../Interfaces/IAddressProps/IAddressProps';
import { IAddressState } from '../Interfaces/IAddressState/IAddressState';
import { IRetrieveAddress } from '../Interfaces/IRetrieveAddress/IRetrieveAddress';


//initial addresses
const initialAddresses: IAddress[] = [];

//implement Component
export class AddressLookup extends React.Component<IAddressProps, IAddressState>{
    myRef: React.RefObject<HTMLElement>;
    
    constructor(props: IAddressProps){
        super(props);
        this.myRef = React.createRef();

        //initial addresses set to empty
        this.state = {
            Addresses: initialAddresses,
            isLoading: false,
            isExpandClicked: false,
            expandKey: 0,
        }
    }

    /**
     * when value gets entered into AutoComplete box
     * @param e 
     * @param newValue 
     */
    private handleInputChange = (_event: React.ChangeEvent<{}>, _newValue: string):void =>  {
        
        /**
         * set expand clicked to false if 
         * its true
         */
        if(this.state.isExpandClicked) {
            this.setState({
                isExpandClicked: false,
            });
        }

        //set state to loading
        this.setState({
            isLoading: true,
            Addresses: initialAddresses
        });

        //once data received
        getAddresses(_newValue, this.props.APIKey).then((_addresses: IAddress[]) => {
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
        
        //if next action is find
        if(_newValue.Next === Constants.NEXT.Find)
            return;
        
        //if next action is retrieve
        if(_newValue.Next === Constants.NEXT.Retrieve){
            //retrieve full address
            retrieveAddress(_newValue.Id, this.props.APIKey).then((_addresses: IRetrieveAddress[]) => {
                this.props.handleOnChange(_addresses);    
            });
            
        }
    }

    /**
     * Id to get address range
     * @param id 
     */
    private findAddresses = (_event:React.MouseEvent<HTMLElement>, _id: string) => {
        
        //set state to loading
        this.setState({
            isLoading: true,
            Addresses: initialAddresses,
            isExpandClicked: true,
        });


        //once data received
        getFindAddresses(_id, this.props.APIKey).then((_addresses: IAddress[]) => {
            this.setState({
                Addresses: _addresses,
                isLoading: false,
            });

            this.myRef.current?.focus();
        });
    }

    /**
     * render this textbox with autocomplete
     * @param params 
     */
    private getAutoCompleteRenderTextField = (_paramsprops: any): JSX.Element => {    
        return(
            <TextField inputRef={this.myRef} {..._paramsprops} label={Constants.DEFAULT_HINT} variant="outlined" InputProps={{
                ..._paramsprops.InputProps,
                endAdornment: (
                  <React.Fragment>
                    {this.state.isLoading ? <CircularProgress color="inherit" size={20} /> : null}
                    {_paramsprops.InputProps.endAdornment}
                  </React.Fragment>
                ),
              }}></TextField>
        );
    }

    /**
     * component render method
     */
    public render() : JSX.Element{

        return(
            <div>
                <Autocomplete
                    options={this.state.Addresses} 
                    key={this.state.expandKey}
                    openOnFocus={true}
                    renderOption={(option: IAddress) => ( <ListOption Description={option.Description} Id={option.Id} Next={option.Next} Text={option.Text}
                        findAddresses={this.findAddresses}> </ListOption>)}
                    getOptionLabel={(option:IAddress) => 
                        (option.Text + Constants.comma_DELIMETER + option.Description + Constants.DEFAULT_STRING)
                    }
                    onInputChange={(event: React.ChangeEvent<{}>, newInputValue:string):void => {
                        
                        //if event is not to expand the addresses
                        if(event !== null){
                            if((event.target as HTMLElement).innerText !== Constants.Expand){
                                this.handleInputChange(event, newInputValue);
                            }
                            else{
                                this.setState({
                                    expandKey : this.state.expandKey + 1,
                                });
                            }
                        }
                    }}
                    disableCloseOnSelect={false}
                    loading={this.state.isLoading}
                    onChange={(e: React.ChangeEvent<{}>, value: any, reason: AutocompleteChangeReason, details: AutocompleteChangeDetails<IAddress>|undefined): void => {
                        (reason === Constants.AUTOCOMPLETE_SELECT_OPTION) ? this.onSelectOptionValueChange(value) : console.log(`reason: ${reason} details: ${details}`);
                    }}
                    renderInput={(params:any) => this.getAutoCompleteRenderTextField(params)}
                />
            </div>
        )
    }
}