import {Observable} from "rxjs";


interface loadData {
    (qp?: any): Observable<any>;
}

export interface Column {
    title: string;
    sortingKey?: string;
    width?: string;
    dataKey: string | Function
}

export interface DatatableOption {
    loadData: loadData;
    defaultPageSize: number;
    columns: Array<Column>;
    actions?: {
        edit?: boolean,
        view?: boolean,
        other?: Array<{ enable: boolean, action: Function, iconClass: string }>
    };
}
