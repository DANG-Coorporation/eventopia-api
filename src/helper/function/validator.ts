import Validator from "fastest-validator";
import { BadRequestException } from "../Error/BadRequestException/BadRequestException";

export async function validate<T>(schema: any, data: unknown): Promise<T> {
  try {
    const v = new Validator();
    const check = v.compile(schema);
    const result = check(data);
    if (result !== true) {
      throw new BadRequestException("Invalid data1", result);
    }
    return data as T;
  } catch (error) {
    console.log(error);
    throw new BadRequestException("Invalid data2", error);
  }
}
