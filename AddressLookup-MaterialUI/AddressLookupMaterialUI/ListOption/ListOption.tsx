import * as React from 'react';
import { Button, Box } from '@material-ui/core';
import { Constants } from '../Constants/Constants';
import { IListOptionProps } from '../Interfaces/Interfaces';
import { FunctionComponent } from 'react';


export const ListOption: FunctionComponent<IListOptionProps> = ({Description, Id, Next, Text, findAddresses}) => 
{
    /**
     * event to send Id to AddressLookup Component
     * @param event 
     */
    const handleOnChange = (event: React.MouseEvent<HTMLElement>) => {
        findAddresses(event, Id);
    }

    /**
     * block to decide if expand button 
     * has to render or not
     */
    if(Next === Constants.NEXT.Find){
        return(<Box component="div" display="inline">
                    {Text + Constants.comma_DELIMETER + Description + Constants.DEFAULT_STRING}
                    <Box p={2} component="div" display="inline">
                        <Button size="small" color="secondary" onClick={handleOnChange}>Expand</Button>
                    </Box>
                </Box>);   
    }
    else{
        return(<Box component="div" display="inline">
                    {Text + Constants.comma_DELIMETER + Description + Constants.DEFAULT_STRING}
                </Box>);   
    }
}





