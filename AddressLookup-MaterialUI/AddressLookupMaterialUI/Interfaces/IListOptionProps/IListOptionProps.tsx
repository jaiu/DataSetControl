export interface IListOptionProps {
    Description: string;
    Id: string;
    Next: string
    Text: string;
    findAddresses: (event:React.MouseEvent<HTMLElement>, Id: string) => void;
}