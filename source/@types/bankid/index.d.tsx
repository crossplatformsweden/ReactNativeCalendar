declare module 'bankid' {
  import * as React from 'react';

  export default class BankId {
    authenticateAndCollect(personalNr: string): any;
    authenticate(personalNr: string): any;
    collect(orderRef: string): any;
    authenticateAndCollect(personalNr: string): any;
    signAndCollect(personalNumber: string, message: string): any;
  }
}
