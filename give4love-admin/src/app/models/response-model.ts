export interface ResponseModel {
    data: any[];
    links: any;
    meta: any;
}

export interface ResponseModelById {
    data: any;
    links: any;
    meta: any;
}

export interface ResponseLogin {
    message: any;
    token: any;
    type: any;
    user: any;
}