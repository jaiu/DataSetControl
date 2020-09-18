import {IInputs, IOutputs} from "./generated/ManifestTypes";
import { AddressLookup } from './AddressLookup/AddressLookup';
import { Constants } from './Constants/Constants';
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { IAddress, IAddressProps } from './Interfaces/Interfaces';


export class AddressLookupMaterialUI implements ComponentFramework.StandardControl<IInputs, IOutputs> {

	/**
	 * Global PCF Variables
	 */
	private theNotifyOutputChanged: () => void;
	private theContainer: HTMLDivElement;

	/**
	 * Props Interface to pass
	 * on to react Component
	 */
	private AddressProps: IAddressProps = {
		APIKey: Constants.DEFAULT_STRING,
		handleOnChange: this.notifyChange.bind(this)
	}


	/**
	 * Empty constructor.
	 */
	constructor()
	{

	}

	/**
	 * Used to initialize the control instance. Controls can kick off remote server calls and other initialization actions here.
	 * Data-set values are not initialized here, use updateView.
	 * @param context The entire property bag available to control via Context Object; It contains values as set up by the customizer mapped to property names defined in the manifest, as well as utility functions.
	 * @param notifyOutputChanged A callback method to alert the framework that the control has new outputs ready to be retrieved asynchronously.
	 * @param state A piece of data that persists in one session for a single user. Can be set at any point in a controls life cycle by calling 'setControlState' in the Mode interface.
	 * @param container If a control is marked control-type='standard', it will receive an empty div element within which it can render its content.
	 */
	public init(context: ComponentFramework.Context<IInputs>, notifyOutputChanged: () => void, state: ComponentFramework.Dictionary, container:HTMLDivElement)
	{
		// Add control initialization code
		this.theNotifyOutputChanged = notifyOutputChanged;
		this.theContainer = container;
		this.AddressProps.APIKey = context.parameters.APIKey.raw || Constants.DEFAULT_STRING;

	}

	/**
	 * notifyChange to will be called from a
	 * Address Component
	 * @param value 
	 */
	private notifyChange(value: IAddress){

		this.AddressProps.CompleteAddress = value;
		this.theNotifyOutputChanged();
	}

	/**
	 * Called when any value in the property bag has changed. This includes field values, data-sets, global values such as container height and width, offline status, control metadata values such as label, visible, etc.
	 * @param context The entire property bag available to control via Context Object; It contains values as set up by the customizer mapped to names defined in the manifest, as well as utility functions
	 */
	public updateView(context: ComponentFramework.Context<IInputs>): void
	{
		ReactDOM.render(
			React.createElement(
				AddressLookup,
				this.AddressProps
			),
			this.theContainer
		)
	}

	/** 
	 * It is called by the framework prior to a control receiving new data. 
	 * @returns an object based on nomenclature defined in manifest, expecting object[s] for property marked as “bound” or “output”
	 */
	public getOutputs(): IOutputs
	{
		return {
			 AddressLine1: this.AddressProps.CompleteAddress?.Text,
			 City: this.AddressProps.CompleteAddress?.Description.split(Constants.comma_DELIMETER)[0],
			 State: this.AddressProps.CompleteAddress?.Description.split(Constants.comma_DELIMETER)[1],
			 Postcode: this.AddressProps.CompleteAddress?.Description.split(Constants.comma_DELIMETER)[2],
			 Country: Constants.DEFAULT_COUNTRY,
		};
	}

	/** 
	 * Called when the control is to be removed from the DOM tree. Controls should use this call for cleanup.
	 * i.e. cancelling any pending remote calls, removing listeners, etc.
	 */
	public destroy(): void
	{
		// Add code to cleanup control if necessary
	}
}