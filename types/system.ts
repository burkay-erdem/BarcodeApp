import React from "react";

export interface IChildren {
    children: JSX.Element[] | JSX.Element | React.ReactNode;
}

export interface IMessage {
    type: string;
    msg: string;
    field?: string;
}

export interface IBaseResponse<T = {}> {
    errorMessages: IMessage[];
    warningMessages: IMessage[];
    data: T | null;
}

export interface IReadList {
    page?: number;
    limit?: number;
    searchTerm?: string;
    sortBy?: string;
    groupBy?: string | number
}