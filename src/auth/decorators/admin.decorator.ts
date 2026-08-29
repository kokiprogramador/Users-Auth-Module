import { SetMetadata } from "@nestjs/common";
import { UserType } from "../../../generated/prisma/enums.js";

export const ADMIN_KEY = 'types';
export const Admin = (...types: [UserType, ...UserType[]]) =>
  SetMetadata(ADMIN_KEY, types);
