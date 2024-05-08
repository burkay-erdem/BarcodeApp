import { IRoleAttributes } from "../model/role.interface";
import { IBaseResponse } from "../system";

export interface IRoleReadListResponse extends IBaseResponse<IRoleAttributes[]> {
}

