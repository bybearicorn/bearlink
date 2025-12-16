// TODO: AR we should probably use somehting like axios
// till then while we use fetch, lets use this processing

export class HttpError extends Error {
  public status: number;
  public name = "HttpError";

  constructor(
    message: string,
    public readonly response: Response,
  ) {
    super(message);
    this.status = response.status;
  }
}

/** Processes error in response and parsees body if JSON, returns with original response*/
export const processFetchWithRes = async <T>(res: Response): Promise<{ res: Response; body: T }> => {
  await processFetchErr(res); // will throw on error

  try {
    if (res.status == 202 || !res.headers.get("content-type")?.includes("application/json")) {
      return { res, body: null as T };
    }
    return { res, body: await res.json() };
  } catch (e) {
    console.error(`Error processing response`, e, res);
    throw new Error(`Error while processing server response`);
  }
};

/** Processes error in response and parsees body if JSON */
export const processFetch = async <T>(res: Response): Promise<T> => {
  const { body } = await processFetchWithRes<T>(res);
  return body;
};

/** Only processes error in response */
export const processFetchErr = async (res: Response): Promise<Response> => {
  if (res.ok) {
    return res;
  }

  if (res.headers.get("content-type")?.includes("application/json")) {
    let body;
    try {
      body = await res.json();
    } catch (e) {
      console.error(`Error parsing JSON response`, e, res);
    }
    if (body?.message) {
      throw new HttpError(Array.isArray(body.message) ? body.message.join(" ") : body.message, res);
    }
  }
  console.error(`Server error`, res);
  throw new HttpError(`Server error. Status: ${res.status}`, res);
};
