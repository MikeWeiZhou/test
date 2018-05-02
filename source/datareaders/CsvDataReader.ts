
import * as csv from "csv-parse"
import * as fs from "fs"

import { IDataReader } from "./IDataReader"

/**
 * CsvDataReader.
 * 
 * Returns a stream to the CSV file.
 */
export class CsvDataReader implements IDataReader
{
    private _filepath: string;

    /**
     * Constructor.
     * @param {string} filepath to CSV to-be read
     */
    constructor(filepath: string)
    {
        this._filepath = filepath;
    }

    /**
     * Initialize the data source.
     */
    Initialize(): void
    {
    }

    /**
     * Returns a stream of the csv file.
     * @returns {any} stream to the csv file
     */
    GetStream(): any
    {
        return fs.createReadStream(this._filepath)
            .pipe(csv({columns: true}));
    }

    /**
     * Cleanup/dispose any open resources.
     */
    Cleanup(): void
    {
    }
}