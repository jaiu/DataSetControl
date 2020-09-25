/*
*This is auto generated from the ControlManifest.Input.xml file
*/

// Define IInputs and IOutputs Type. They should match with ControlManifest.
export interface IInputs {
    AddressInput: ComponentFramework.PropertyTypes.StringProperty;
    AddressLine1: ComponentFramework.PropertyTypes.StringProperty;
    AddressLine2: ComponentFramework.PropertyTypes.StringProperty;
    City: ComponentFramework.PropertyTypes.StringProperty;
    State: ComponentFramework.PropertyTypes.StringProperty;
    Postcode: ComponentFramework.PropertyTypes.StringProperty;
    Country: ComponentFramework.PropertyTypes.StringProperty;
    APIKey: ComponentFramework.PropertyTypes.StringProperty;
}
export interface IOutputs {
    AddressInput?: string;
    AddressLine1?: string;
    AddressLine2?: string;
    City?: string;
    State?: string;
    Postcode?: string;
    Country?: string;
}
