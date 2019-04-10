/// <reference path="./DBOptions.d.ts" />

declare module 'orbit-db' {
    import { Store } from "orbit-db-store";
    import { KeyValueStore } from "orbit-db-kvstore";
    import { FeedStore } from "orbit-db-feedstore";
    import { EventStore } from "orbit-db-eventstore";
    import { DocumentStore } from "orbit-db-docstore";
    import { CounterStore } from "orbit-db-counterstore";
    import { Keystore } from "orbit-db-keystore";
    import { Cache } from "orbit-db-cache";
    import { Identity } from "orbit-db-identity-provider";
    import * as IPFS from "ipfs";
    import * as elliptic from "elliptic";

    export class OrbitDB {

        stores: any;
        directory: string;
        keystore: Keystore;
        key: elliptic.ec.KeyPair

        static databaseTypes: string[];
        
        /**
         * Creates and returns an instance of OrbitDB. 
         */
        static createInstance(ipfs: IPFS, options?: {
            directory?: string,
            peerId?: string,     // By default it uses the base58 string of the ipfs peer id.
            keystore?: Keystore,
            cache?: Cache,
            identity?: Identity,
        }): Promise<OrbitDB>;

        create(name: string, type: string, options?: ICreateOptions): Promise<Store>;

        open(address: string, options?: IOpenOptions): Promise<Store>;

        disconnect(): Promise<void>;
        stop(): Promise<void>;

        feed<T>(address: string, options?: IStoreOptions): Promise<FeedStore<T>>;
        log<T>(address: string, options?: IStoreOptions): Promise<EventStore<T>>;
        eventlog<T>(address: string, options?: IStoreOptions): Promise<EventStore<T>>;
        keyvalue<T>(address: string, options?: IStoreOptions): Promise<KeyValueStore<T>>;
        kvstore<T>(address: string, options?: IStoreOptions): Promise<KeyValueStore<T>>;
        counter(address: string, options?: IStoreOptions): Promise<CounterStore>;
        docs<T>(address: string, options?: IStoreOptions): Promise<DocumentStore<T>>;
        docstore<T>(address: string, options?: IStoreOptions): Promise<DocumentStore<T>>;

        static isValidType(type: string);
        static addDatabaseType(type: string, store: Store);
        static getDatabaseTypes(): {};
        static isValidAddress(address: string): boolean;
    }

    export default OrbitDB;
}