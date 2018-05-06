import { Writable } from "stream"
import { IStorage } from "./IStorage";
import { IDataInterface } from "../datainterfaces/IDataInterface"

/**
 * WriteStream.
 * 
 * Writes JSON objects using a given Storage medium and pushes it down the pipeline.
 */
export class WriteStream extends Writable
{
    private _storage: IStorage;
    private _dataInterface: IDataInterface;

    /**
     * Constructor.
     * @param {IStorage} storage used to store the data
     * @param {IDataInterface} dataInterface used to transform the JSON object
     */
    public constructor(storage: IStorage, dataInterface: IDataInterface)
    {
        // objectMode: stream accepts any JS object rather than the default string/buffer
        super({objectMode: true});
        this._storage = storage;
        this._dataInterface = dataInterface;
    }

    /**
     * Writes stream data to storage using a StorageWriter.
     * @param {Array<any>} data from the stream
     * @param {string} encoding not used
     * @param {Function} callback callback when finished writing data
     * @override
     */
    public _write(data: Array<any>, encoding: string, callback: Function): void
    {
        this._storage.Write(this._dataInterface.TableName, this._dataInterface.TableKeys, data);

        // callback signals successful writing of data,
        // ommit callback() to signal error,
        // or pass a parameter with any object/message to signal with an error
        callback();
    }
}