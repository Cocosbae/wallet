/* tslint:disable */
/* eslint-disable */
/**
 * REST api to TON blockchain explorer
 * Provide access to indexed TON blockchain
 *
 * The version of the OpenAPI document: 2.0.0
 * Contact: support@tonkeeper.com
 *
 * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
 * https://openapi-generator.tech
 * Do not edit the class manually.
 */

import { exists, mapValues } from '../runtime';
/**
 * 
 * @export
 * @interface TonConnectProof200Response
 */
export interface TonConnectProof200Response {
    /**
     * 
     * @type {string}
     * @memberof TonConnectProof200Response
     */
    token: string;
}

/**
 * Check if a given object implements the TonConnectProof200Response interface.
 */
export function instanceOfTonConnectProof200Response(value: object): boolean {
    let isInstance = true;
    isInstance = isInstance && "token" in value;

    return isInstance;
}

export function TonConnectProof200ResponseFromJSON(json: any): TonConnectProof200Response {
    return TonConnectProof200ResponseFromJSONTyped(json, false);
}

export function TonConnectProof200ResponseFromJSONTyped(json: any, ignoreDiscriminator: boolean): TonConnectProof200Response {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        
        'token': json['token'],
    };
}

export function TonConnectProof200ResponseToJSON(value?: TonConnectProof200Response | null): any {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        
        'token': value.token,
    };
}

