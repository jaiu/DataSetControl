import * as React from 'react';
import { TextField, Button, Box } from '@material-ui/core';
import { Constants } from '../Constants/Constants';
import { IListOptionProps } from '../Interfaces/Interfaces';
import { FunctionComponent } from 'react';


export const ListOption: FunctionComponent<IListOptionProps> = ({Description, Id, Next, Text }) => 
{
    if(Next === Constants.NEXT.Find){
        return(<Box component="div" display="inline">
                    {Text + Constants.comma_DELIMETER + Description + Constants.DEFAULT_STRING}
                    <Box p={2} component="div" display="inline">
                        <Button color="secondary">Expand</Button>
                    </Box>
                </Box>);   
    }
    else {
        return(<Box component="div" display="inline">
                    {Text + Constants.comma_DELIMETER + Description + Constants.DEFAULT_STRING}
                </Box>);   
    }
}

