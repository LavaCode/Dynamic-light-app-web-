import Dexie from 'dexie';

export const db = new Dexie('DynamicDB');
db.version(11).stores({
    ipSmall: '++id, ipValueSmall',
    ipLarge: '++id, ipValueLarge',
    pincode: '++id, pincodeValue'
});