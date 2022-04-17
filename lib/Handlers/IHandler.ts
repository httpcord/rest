import type { HandlerRequestData, RouteData } from "../RequestManager.ts";
import type { ParsedResponse } from "../Utils/mod.ts";

export interface IHandler {
  queueRequest: (
    routeId: RouteData,
    url: string,
    options: RequestInit,
    requestData: HandlerRequestData
  ) => Promise<ParsedResponse>;
  // eslint-disable-next-line @typescript-eslint/method-signature-style -- This is meant to be a getter returning a bool
  get inactive(): boolean;
  readonly id: string;
}
