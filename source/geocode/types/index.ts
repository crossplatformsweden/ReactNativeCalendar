// geocode/types/index
/**
 * Geolocation action constant string keys
 * @namespace
 * @public
 * @typedef GeocodingConstants
 * @memberof Constants
 * @type {Object}
 */
export enum GeocodingConstants {
  GEOCODING_BUSY = 'Läser kartboken',
  GEOCODING_SUCCESS = 'GEOCODE = SUCCESS',
  GEOCODING_FAILED = 'GEOCODE = FAILED',
}

/**
 * Response from Google API
 * @typedef IGeocodeReducer
 * @type {Object}
 * @memberof TypesModule
 * @public
 * @export
 * @property {Array<IAddressComponent>?} results
 */
export interface IGeocodeState {
  results?: Array<Result>;
}

export interface IGeocodeAction extends IGeocodeState {
  type: GeocodingConstants;
}

// To parse this data:
//
//   import { Convert, Geocode } from "./file";
//
//   const geocode = Convert.toGeocode(json);
//
// These functions will throw an error if the JSON doesn't
// match the expected interface, even if the JSON is valid.

export interface Geocode {
  results?: Result[];
  status?:  string;
}

export interface Result {
  address_components?: AddressComponent[];
  formatted_address?:  string;
  geometry?:           Geometry;
  place_id?:           string;
  types?:              string[];
}

export interface AddressComponent {
  long_name?:  string;
  short_name?: string;
  types?:      string[];
}

export interface Geometry {
  bounds?:        Bounds;
  location?:      Northeast;
  location_type?: string;
  viewport?:      Bounds;
}

export interface Bounds {
  northeast?: Northeast;
  southwest?: Northeast;
}

export interface Northeast {
  lat?: number;
  lng?: number;
}

// Converts JSON strings to/from your types
// and asserts the results of JSON.parse at runtime
export namespace Convert {
  export function toGeocode(json: string): Geocode {
      return cast(JSON.parse(json), o('Geocode'));
  }

  export function geocodeToJson(value: Geocode): string {
      return JSON.stringify(value, null, 2);
  }

  function cast<T>(obj: any, typ: any): T {
      if (!isValid(typ, obj)) {
          throw `Invalid value`;
      }
      return obj;
  }

  function isValid(typ: any, val: any): boolean {
      if (typ === undefined) return true;
      if (typ === null) return val === null || val === undefined;
      return typ.isUnion  ? isValidUnion(typ.typs, val)
              : typ.isArray  ? isValidArray(typ.typ, val)
              : typ.isMap    ? isValidMap(typ.typ, val)
              : typ.isEnum   ? isValidEnum(typ.name, val)
              : typ.isObject ? isValidObject(typ.cls, val)
              :                isValidPrimitive(typ, val);
  }

  function isValidPrimitive(typ: string, val: any) {
      return typeof typ === typeof val;
  }

  function isValidUnion(typs: any[], val: any): boolean {
      // val must validate against one typ in typs
      return typs.find(typ => isValid(typ, val)) !== undefined;
  }

  function isValidEnum(enumName: string, val: any): boolean {
      const cases = typeMap[enumName];
      return cases.indexOf(val) !== -1;
  }

  function isValidArray(typ: any, val: any): boolean {
      // val must be an array with no invalid elements
      return Array.isArray(val) && val.every(element => {
          return isValid(typ, element);
      });
  }

  function isValidMap(typ: any, val: any): boolean {
      if (val === null || typeof val !== 'object' || Array.isArray(val)) return false;
      // all values in the map must be typ
      return Object.keys(val).every(prop => {
          if (!Object.prototype.hasOwnProperty.call(val, prop)) return true;
          return isValid(typ, val[prop]);
      });
  }

  function isValidObject(className: string, val: any): boolean {
      if (val === null || typeof val !== 'object' || Array.isArray(val)) return false;
      let typeRep = typeMap[className];
      return Object.keys(typeRep).every(prop => {
          if (!Object.prototype.hasOwnProperty.call(typeRep, prop)) return true;
          return isValid(typeRep[prop], val[prop]);
      });
  }

  function a(typ: any) {
      return { typ, isArray: true };
  }

  // @ts-ignore
  function e(name: string) {
      return { name, isEnum: true };
  }

  function u(...typs: any[]) {
      return { typs, isUnion: true };
  }

  // @ts-ignore
  function m(typ: any) {
      return { typ, isMap: true };
  }

  function o(className: string) {
      return { cls: className, isObject: true };
  }

  const typeMap: any = {
      'Geocode': {
          results: u(null, a(o('Result'))),
          status: u(null, ''),
      },
      'Result': {
          address_components: u(null, a(o('AddressComponent'))),
          formatted_address: u(null, ''),
          geometry: u(null, o('Geometry')),
          place_id: u(null, ''),
          types: u(null, a('')),
      },
      'AddressComponent': {
          long_name: u(null, ''),
          short_name: u(null, ''),
          types: u(null, a('')),
      },
      'Geometry': {
          bounds: u(null, o('Bounds')),
          location: u(null, o('Northeast')),
          location_type: u(null, ''),
          viewport: u(null, o('Bounds')),
      },
      'Bounds': {
          northeast: u(null, o('Northeast')),
          southwest: u(null, o('Northeast')),
      },
      'Northeast': {
          lat: u(null, 3.14),
          lng: u(null, 3.14),
      },
  };
}
