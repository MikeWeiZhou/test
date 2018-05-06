import { IDataInterface } from "./IDataInterface"
const config = require("../../config/config");

/**
 * QaBuildsAndRunsFromBambooDataInterface.
 * 
 * Returns only the wanted properties from original JSON.
 */
export class QaBuildsAndRunsFromBambooDataInterface implements IDataInterface
{
    /**
     * Table name for data set.
     * @override
     */
    public readonly TableName: string = config.db.tablenames.qa_builds_and_runs_from_bamboo;

    /**
     * Table keys/fields for data set.
     * Order must match data array returned from Transform().
     * @override
     */
    public readonly TableKeys: Array<string> = ["MINUTES_TOTAL_QUEUE_AND_BUILD", "BUILD_COMPLETED_DATE", "CYCLE", "PLATFORM", "PRODUCT", "IS_DEFAULT", "IS_SUCCESS", "BRANCH_ID"];

    /**
     * SQL query that setup the database.
     */
    public readonly DbSetupQuery: string = `
        CREATE TABLE ${this.TableName}
        (
            MINUTES_TOTAL_QUEUE_AND_BUILD   INT             NOT NULL,
            BUILD_COMPLETED_DATE            DATETIME        NOT NULL,
            CYCLE                           CHAR(6)         NOT NULL,
            PLATFORM                        CHAR(3)         NOT NULL,
            PRODUCT                         CHAR(2)         NOT NULL,
            IS_DEFAULT                      TINYINT(1)      NOT NULL,
            IS_SUCCESS                      TINYINT(1)      NOT NULL,
            BRANCH_ID                       INT             NOT NULL
        )
    `;

    private readonly _NO_BRANCH_ID: number = -1;

    /**
     * Returns a data array.
     * Order must match TableKeys.
     * @param {any} o original JSON object
     * @returns {Array<any>} data array
     * @override
     */
    public Transform(o: any): Array<any>
    {
        // count:       012345 678 9012 34 56 7
        // BUILD_KEY is aaaaaa LAT bbb- cc 64 [d]
        // example:     S2018B LAT LIN- DX 64 45
        //              S2018A LAT WIN- FX64
        //
        // where aaaaaa = cycle e.g. S2018B
        //          bbb = platform e.g. LIN
        //           cc = product: FX, MX, DX, IX
        //            d = branch id (if omitted, then default, otherwise unique number identifying branch)

        var values: Array<any> = [];
        values.push(o.MINUTES_TOTAL_QUEUE_AND_BUILD);       // MINUTES_TOTAL_QUEUE_AND_BUILD
        values.push(o.BUILD_COMPLETED_DATE);                // BUILD_COMPLETED_DATE
        values.push(o.BUILD_KEY.substring(0, 6));           // CYCLE aaaaaa
        values.push(o.BUILD_KEY.substring(9, 12));          // PLATFORM bbb
        values.push(o.BUILD_KEY.substring(13, 15));         // PRODUCT cc
        values.push((o.BUILD_KEY.length > 17) ? 0 : 1);     // IS_DEFAULT [d]
        values.push((o.BUILD_STATE == "Failed") ? 0 : 1);   // IS_SUCCESS
        values.push((o.BUILD_KEY.length > 17)               // BRANCH_ID [d]
            ? o.BUILD_KEY.substring(17)
            : this._NO_BRANCH_ID
            );
        return values;
    }
}