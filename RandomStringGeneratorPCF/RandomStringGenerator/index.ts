import {IInputs, IOutputs} from "./generated/ManifestTypes";
import {Constants} from "./constants";
import { timingSafeEqual } from "crypto";

export class RandomStringGenerator implements ComponentFramework.StandardControl<IInputs, IOutputs> {

	//all HTML tags
	private eleMainDiv: HTMLDivElement;
	private eleTextAreaDiv: HTMLDivElement;
	private eleTextbox: HTMLTextAreaElement;
	private eleButtonDiv: HTMLDivElement;
	private eleButton: HTMLButtonElement;
	private thenotifyOutputChanged: () => void;
	private keyMaxLenght: number;

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
		//assign notifyoutputchanged to private initialize event
		this.thenotifyOutputChanged = notifyOutputChanged;

		//assign keyMaxLenght to class propety
		this.keyMaxLenght = context.parameters.InputLength.raw || Constants.DEFAULT_INPUT_LENGTH;

		//UI Creation
		this.eleMainDiv = document.createElement("div");
		this.eleMainDiv.setAttribute("class", "mainDiv")
		
		//text area to add characters
		this.eleTextAreaDiv = document.createElement("div");
		this.eleTextAreaDiv.setAttribute("class", "textAreaDiv");
		this.eleTextbox = document.createElement("textarea");
		this.eleTextbox.setAttribute("rows", "4");
		this.eleTextbox.readOnly = true;
		this.eleTextbox.value = context.parameters.EncryptionKey.raw || Constants.DEFAULT_STRING;
		this.eleTextbox.maxLength = context.parameters.InputLength.raw || Constants.DEFAULT_INPUT_LENGTH;
		this.eleTextAreaDiv.appendChild(this.eleTextbox);
		
		//button which triggers the generate character
		this.eleButtonDiv = document.createElement("div");
		this.eleButtonDiv.setAttribute("class", "btnDiv");
		this.eleButton = document.createElement("button");
		this.eleButton.innerHTML = Constants.BUTTON_TEXT;
		this.eleButton.addEventListener("click", this.OnClick.bind(this));
		this.eleButtonDiv.appendChild(this.eleButton);

		//append controls to eleMainDiv
		this.eleMainDiv.appendChild(this.eleTextAreaDiv);
		this.eleMainDiv.appendChild(this.eleButtonDiv);
		
		//add eleMainDiv to PCF Container
		container.appendChild(this.eleMainDiv);

		/*set the PCF control enable/disable based
		on form control*/
		this.eleTextbox.disabled = context.mode.isControlDisabled;
		this.eleButton.disabled = context.mode.isControlDisabled;

	}


	/**
	 * Called when any value in the property bag has changed. This includes field values, data-sets, global values such as container height and width, offline status, control metadata values such as label, visible, etc.
	 * @param context The entire property bag available to control via Context Object; It contains values as set up by the customizer mapped to names defined in the manifest, as well as utility functions
	 */
	public updateView(context: ComponentFramework.Context<IInputs>): void
	{
		// Add code to update control view
		this.eleTextbox.value = context.parameters.EncryptionKey.raw || "";
	}

	/** 
	 * It is called by the framework prior to a control receiving new data. 
	 * @returns an object based on nomenclature defined in manifest, expecting object[s] for property marked as “bound” or “output”
	 */
	public getOutputs(): IOutputs
	{
		return {
			EncryptionKey: this.eleTextbox.value
		};
	}

	/*
	 * onClick
	 */
	private OnClick(event: Event) : void {
		//generate string and assign
		this.eleTextbox.value = this.generateRandomString(this.keyMaxLenght);
		this.thenotifyOutputChanged();
	}

	/*
	* generate random characters 
	* based on input length
	*/
	private generateRandomString(length: number) : string {
		
		//generate random string
		let result : string = Constants.DEFAULT_STRING;
		let charatersScope : string = Constants.KEY_CHAR_SCOPE;
		let chractersScopeLenght : number = charatersScope.length;

		for(let _i:number = 0; _i < length; _i++){
			result += charatersScope.charAt(Math.floor(Math.random() * chractersScopeLenght));
		}
		return result;
	}


	/** 
	 * Called when the control is to be removed from the DOM tree. Controls should use this call for cleanup.
	 * i.e. cancelling any pending remote calls, removing listeners, etc.
	 */
	public destroy(): void
	{
		this.eleButton.removeEventListener("click", this.OnClick);
		// Add code to cleanup control if necessary
	}
}