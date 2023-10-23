/* eslint-disable */
/* tslint:disable */
/*
 * ---------------------------------------------------------------
 * ## THIS FILE WAS GENERATED VIA SWAGGER-TYPESCRIPT-API        ##
 * ##                                                           ##
 * ## AUTHOR: acacode                                           ##
 * ## SOURCE: https://github.com/acacode/swagger-typescript-api ##
 * ---------------------------------------------------------------
 */

export type ObjectId = object;

export interface User {
  /**
   * L'avatar de l'utilisateur'
   * @example "https://pbs.twimg.com/profile_images/1143032401108578305/8IYSjofV_400x400.jpg"
   */
  avatar: string;
  /**
   * Le nom de l'auteur'
   * @example "Lady Gaga"
   */
  nickname: string;
  /**
   * Le nom d'utilisateur
   * @example "@ladygaga"
   */
  username: string;
  /**
   * Le mot de passe de l'utilisateur
   * @example "motdepasse1234"
   */
  password: string;
  /**
   * La description d'utilisateur
   * @example "Nouveau sur Gazouilleur"
   */
  description?: string;
  /**
   * La liste des personnes que l'utilisateur suit
   * @example ["3b44424280af93cab4312c3","63b4442c280af93cab4312c5"]
   */
  following?: ObjectId[];
  /**
   * Le nombre personnes qui suivent l'utilisateur
   * @example 573864923
   */
  followers?: number;
  /**
   * Le nombre de j'aime que l'utilisateur a récoltés
   * @example 573864923
   */
  liked?: number;
}

export type BadRequestException = object;

export interface CreateTweetDto {
  /**
   * L'auteur du gazouilli'
   * @example "@ladygaga"
   */
  author: string;
  /**
   * Le contenu du gazouilli'
   * @example "Rah rah ra-a-ah"
   */
  content: string;
}

export interface Comment {
  /**
   * L'auteur du commentaire'
   * @example "@beyonce"
   */
  author: string;
  /**
   * La date du commentaire'
   * @example "2023-01-03T15:05:08.382Z"
   */
  date: string;
  /**
   * Le contenu du commentaire'
   * @example "Amazing"
   */
  content: string;
}

export interface Tweet {
  /**
   * L'auteur du gazouilli'
   * @example "@ladygaga"
   */
  author: string;
  /**
   * La date du gazouilli'
   * @format date-time
   * @example "2023-01-03T15:05:08.382Z"
   */
  date: string;
  /**
   * Le contenu du gazouilli'
   * @example "Rah rah ra-a-ah"
   */
  content: string;
  /**
   * Le nombre de j'aimes du gazouilli'
   * @example 678245
   */
  likes?: number;
  /**
   * Les commentaires du gazouilli'
   * @example ["trop bien","j'adore"]
   */
  comments?: Comment[];
}

export interface TweetResponseDto {
  /**
   * L'id du gazouilli'
   * @example "52759375932457"
   */
   _id: string;
  /**
   * L'auteur du gazouilli'
   * @example "@ladygaga"
   */
  author: string;
  /**
   * La date du gazouilli'
   * @format date-time
   * @example "2023-01-03T15:05:08.382Z"
   */
  date: string;
  /**
   * Le contenu du gazouilli'
   * @example "Rah rah ra-a-ah"
   */
  content: string;
  /**
   * Le nombre de j'aimes du gazouilli'
   * @example 678245
   */
  likes?: number;
  /**
   * Les commentaires du gazouilli'
   * @example ["trop bien","j'adore"]
   */
  comments?: Comment[];
  tweet_user: User[];
}

export type NotFoundException = object;

export interface CreateCommentDto {
  /**
   * L'auteur du commentaire'
   * @example "@beyonce"
   */
  author: string;
  /**
   * Le contenu du commentaire'
   * @example "Amazing !"
   */
  content: string;
}

export interface CreateUserDto {
  /**
   * Le nom de l'auteur'
   * @example "Lady Gaga"
   */
  nickname: string;
  /**
   * Le nom d'utilisateur
   * @example "@ladygaga"
   */
  username: string;
  /** @minLength 8 */
  password: string;
  roles?: string[];
}

export interface UpdateUserDto {
  /**
   * Le nom de l'auteur'
   * @example "Lady Gaga"
   */
  nickname?: string;
  /**
   * Le nom d'utilisateur
   * @example "@ladygaga"
   */
  username?: string;
  /** @minLength 8 */
  password?: string;
  roles?: string[];
}

export type QueryParamsType = Record<string | number, any>;
export type ResponseFormat = keyof Omit<Body, "body" | "bodyUsed">;

export interface FullRequestParams extends Omit<RequestInit, "body"> {
  /** set parameter to `true` for call `securityWorker` for this request */
  secure?: boolean;
  /** request path */
  path: string;
  /** content type of request body */
  type?: ContentType;
  /** query params */
  query?: QueryParamsType;
  /** format of response (i.e. response.json() -> format: "json") */
  format?: ResponseFormat;
  /** request body */
  body?: unknown;
  /** base url */
  baseUrl?: string;
  /** request cancellation token */
  cancelToken?: CancelToken;
}

export type RequestParams = Omit<FullRequestParams, "body" | "method" | "query" | "path">;

export interface ApiConfig<SecurityDataType = unknown> {
  baseUrl?: string;
  baseApiParams?: Omit<RequestParams, "baseUrl" | "cancelToken" | "signal">;
  securityWorker?: (securityData: SecurityDataType | null) => Promise<RequestParams | void> | RequestParams | void;
  customFetch?: typeof fetch;
}

export interface HttpResponse<D extends unknown, E extends unknown = unknown> extends Response {
  data: D;
  error: E;
}

type CancelToken = Symbol | string | number;

export enum ContentType {
  Json = "application/json",
  FormData = "multipart/form-data",
  UrlEncoded = "application/x-www-form-urlencoded",
  Text = "text/plain",
}

export class HttpClient<SecurityDataType = unknown> {
  public baseUrl: string = "";
  private securityData: SecurityDataType | null = null;
  private securityWorker?: ApiConfig<SecurityDataType>["securityWorker"];
  private abortControllers = new Map<CancelToken, AbortController>();
  private customFetch = (...fetchParams: Parameters<typeof fetch>) => fetch(...fetchParams);

  private baseApiParams: RequestParams = {
    credentials: "same-origin",
    headers: {},
    redirect: "follow",
    referrerPolicy: "no-referrer",
  };

  constructor(apiConfig: ApiConfig<SecurityDataType> = {}) {
    Object.assign(this, apiConfig);
  }

  public setSecurityData = (data: SecurityDataType | null) => {
    this.securityData = data;
  };

  protected encodeQueryParam(key: string, value: any) {
    const encodedKey = encodeURIComponent(key);
    return `${encodedKey}=${encodeURIComponent(typeof value === "number" ? value : `${value}`)}`;
  }

  protected addQueryParam(query: QueryParamsType, key: string) {
    return this.encodeQueryParam(key, query[key]);
  }

  protected addArrayQueryParam(query: QueryParamsType, key: string) {
    const value = query[key];
    return value.map((v: any) => this.encodeQueryParam(key, v)).join("&");
  }

  protected toQueryString(rawQuery?: QueryParamsType): string {
    const query = rawQuery || {};
    const keys = Object.keys(query).filter((key) => "undefined" !== typeof query[key]);
    return keys
      .map((key) => (Array.isArray(query[key]) ? this.addArrayQueryParam(query, key) : this.addQueryParam(query, key)))
      .join("&");
  }

  protected addQueryParams(rawQuery?: QueryParamsType): string {
    const queryString = this.toQueryString(rawQuery);
    return queryString ? `?${queryString}` : "";
  }

  private contentFormatters: Record<ContentType, (input: any) => any> = {
    [ContentType.Json]: (input: any) =>
      input !== null && (typeof input === "object" || typeof input === "string") ? JSON.stringify(input) : input,
    [ContentType.Text]: (input: any) => (input !== null && typeof input !== "string" ? JSON.stringify(input) : input),
    [ContentType.FormData]: (input: any) =>
      Object.keys(input || {}).reduce((formData, key) => {
        const property = input[key];
        formData.append(
          key,
          property instanceof Blob
            ? property
            : typeof property === "object" && property !== null
            ? JSON.stringify(property)
            : `${property}`,
        );
        return formData;
      }, new FormData()),
    [ContentType.UrlEncoded]: (input: any) => this.toQueryString(input),
  };

  protected mergeRequestParams(params1: RequestParams, params2?: RequestParams): RequestParams {
    return {
      ...this.baseApiParams,
      ...params1,
      ...(params2 || {}),
      headers: {
        ...(this.baseApiParams.headers || {}),
        ...(params1.headers || {}),
        ...((params2 && params2.headers) || {}),
      },
    };
  }

  protected createAbortSignal = (cancelToken: CancelToken): AbortSignal | undefined => {
    if (this.abortControllers.has(cancelToken)) {
      const abortController = this.abortControllers.get(cancelToken);
      if (abortController) {
        return abortController.signal;
      }
      return void 0;
    }

    const abortController = new AbortController();
    this.abortControllers.set(cancelToken, abortController);
    return abortController.signal;
  };

  public abortRequest = (cancelToken: CancelToken) => {
    const abortController = this.abortControllers.get(cancelToken);

    if (abortController) {
      abortController.abort();
      this.abortControllers.delete(cancelToken);
    }
  };

  public request = async <T = any, E = any>({
    body,
    secure,
    path,
    type,
    query,
    format,
    baseUrl,
    cancelToken,
    ...params
  }: FullRequestParams): Promise<HttpResponse<T, E>> => {
    const secureParams =
      ((typeof secure === "boolean" ? secure : this.baseApiParams.secure) &&
        this.securityWorker &&
        (await this.securityWorker(this.securityData))) ||
      {};
    const requestParams = this.mergeRequestParams(params, secureParams);
    const queryString = query && this.toQueryString(query);
    const payloadFormatter = this.contentFormatters[type || ContentType.Json];
    const responseFormat = format || requestParams.format;

    return this.customFetch(`${baseUrl || this.baseUrl || ""}${path}${queryString ? `?${queryString}` : ""}`, {
      ...requestParams,
      headers: {
        ...(requestParams.headers || {}),
        ...(type && type !== ContentType.FormData ? { "Content-Type": type } : {}),
      },
      signal: cancelToken ? this.createAbortSignal(cancelToken) : requestParams.signal,
      body: typeof body === "undefined" || body === null ? null : payloadFormatter(body),
    }).then(async (response) => {
      const r = response as HttpResponse<T, E>;
      r.data = null as unknown as T;
      r.error = null as unknown as E;

      const data = !responseFormat
        ? r
        : await response[responseFormat]()
            .then((data) => {
              if (r.ok) {
                r.data = data;
              } else {
                r.error = data;
              }
              return r;
            })
            .catch((e) => {
              r.error = e;
              return r;
            });

      if (cancelToken) {
        this.abortControllers.delete(cancelToken);
      }

      if (!response.ok) throw data;
      return data;
    });
  };
}

/**
 * @title Gazouilleur API 🐦
 * @version 1.0
 * @externalDocs git@github.com:naomi-lgt/gazouilleur.git
 * @contact Naomi Legentil <naomi.legentil@outlook.fr> (http://perdu.com)
 *
 * Gazouilleur est un réseau social unique en son genre
 *     qui permet de faire des tweets ! Euh... Gazouillis.
 */
export class Api<SecurityDataType extends unknown> extends HttpClient<SecurityDataType> {
  auth = {
    /**
     * No description
     *
     * @name AppControllerLogin
     * @summary Connexion d'un utilisateur en base de données
     * @request POST:/auth/login
     */
    appControllerLogin: (params: RequestParams = {}) =>
      this.request<User, BadRequestException>({
        path: `/auth/login`,
        method: "POST",
        format: "json",
        ...params,
      }),
  };
  tweets = {
    /**
     * No description
     *
     * @name TweetControllerCreate
     * @summary Création d'un tweet en base de données
     * @request POST:/tweets
     */
    tweetControllerCreate: (data: CreateTweetDto, params: RequestParams = {}) =>
      this.request<Tweet, BadRequestException>({
        path: `/tweets`,
        method: "POST",
        body: data,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @name TweetControllerFindAll
     * @summary Récupération des tweets en base de données.
     * @request GET:/tweets
     */
    tweetControllerFindAll: (params: RequestParams = {}) =>
      this.request<TweetResponseDto[], BadRequestException>({
        path: `/tweets`,
        method: "GET",
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @name TweetControllerFindOne
     * @summary Récupération d'un tweet avec id en base de données.
     * @request GET:/tweets/{id}
     */
    tweetControllerFindOne: (id: string, params: RequestParams = {}) =>
      this.request<Tweet, NotFoundException>({
        path: `/tweets/${id}`,
        method: "GET",
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @name TweetControllerRemove
     * @summary Suppression d'un tweet en base de données.
     * @request DELETE:/tweets/{id}
     */
    tweetControllerRemove: (id: string, params: RequestParams = {}) =>
      this.request<void, BadRequestException>({
        path: `/tweets/${id}`,
        method: "DELETE",
        ...params,
      }),

    /**
     * No description
     *
     * @name TweetControllerAddComment
     * @summary Ajout d'un commentaire à un tweet
     * @request POST:/tweets/{id}/comments
     */
    tweetControllerAddComment: (id: string, data: CreateCommentDto, params: RequestParams = {}) =>
      this.request<Tweet, BadRequestException>({
        path: `/tweets/${id}/comments`,
        method: "POST",
        body: data,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),
  };
  users = {
    /**
     * No description
     *
     * @name UsersControllerCreate
     * @request POST:/users
     */
    usersControllerCreate: (data: CreateUserDto, params: RequestParams = {}) =>
      this.request<ObjectId, any>({
        path: `/users`,
        method: "POST",
        body: data,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @name UsersControllerFindAll
     * @request GET:/users
     */
    usersControllerFindAll: (params: RequestParams = {}) =>
      this.request<object[], any>({
        path: `/users`,
        method: "GET",
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @name UsersControllerFindOne
     * @request GET:/users/{id}
     */
    usersControllerFindOne: (id: string, params: RequestParams = {}) =>
      this.request<ObjectId, any>({
        path: `/users/${id}`,
        method: "GET",
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @name UsersControllerUpdate
     * @request PATCH:/users/{id}
     */
    usersControllerUpdate: (id: string, data: UpdateUserDto, params: RequestParams = {}) =>
      this.request<string, any>({
        path: `/users/${id}`,
        method: "PATCH",
        body: data,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @name UsersControllerRemove
     * @request DELETE:/users/{id}
     */
    usersControllerRemove: (id: string, params: RequestParams = {}) =>
      this.request<string, any>({
        path: `/users/${id}`,
        method: "DELETE",
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @name UsersControllerFindOneByUsername
     * @request GET:/users/{username}
     */
    usersControllerFindOneByUsername: (username: string, params: RequestParams = {}) =>
      this.request<User, any>({
        path: `/users/${username}`,
        method: "GET",
        format: "json",
        ...params,
      }),
  };
}
