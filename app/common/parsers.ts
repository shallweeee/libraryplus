import type { LoaderFunctionArgs } from "react-router";

import { data } from "react-router";
import { z } from "zod";

type ErrorType = {
  error_code: string;
  message: string;
};

export const parseParams = <T extends z.ZodObject<any>>(
  schema: T,
  params: LoaderFunctionArgs["params"],
  error?: ErrorType
): z.infer<typeof schema> => {
  const { success, data: parsedData } = schema.safeParse(params);
  if (!success) {
    throw data(error || { error_code: "invalid_params", message: "Invalid params" }, {
      status: 400,
    });
  }
  return parsedData;
};

export const parseSearchParams = <T extends z.ZodObject<any>>(
  schema: T,
  request: Request,
  error?: ErrorType
): z.infer<typeof schema> => {
  const url = new URL(request.url);
  const { success, data: parsedData } = schema.safeParse(Object.fromEntries(url.searchParams));
  if (!success) {
    throw data(error || { error_code: "invalid_params", message: "Invalid params" }, {
      status: 400,
    });
  }
  return parsedData;
};

export const parseFormData = async <T extends z.ZodObject<any>>(
  schema: T,
  request: Request
): Promise<
  | {
      error: { formErrors: { [P in keyof z.core.output<T>]?: string[] | undefined } };
      data: undefined;
    }
  | { error: undefined; data: z.infer<typeof schema> }
> => {
  const formData = await request.formData();
  const { success, error, data: parsedData } = schema.safeParse(Object.fromEntries(formData));
  if (!success) {
    return { error: { formErrors: z.flattenError(error).fieldErrors }, data: undefined };
  }
  return { error: undefined, data: parsedData };
};
