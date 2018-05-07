import * as assert from "assert";
import * as fs from "fs"
import { PythonShellJsonDataCollector } from "../../datacollectors/PythonShellJsonDataCollector"

describe("datacollectors/PythonShellJsonDataCollector", () =>
{
    // pyfile input command:
    // 1 = spit out valid json objects
    // 2 = spit out invalid json objects
    // 3 = crash with division by zero in middle of transfering valid json objects
    // 4 = exit program with exit code
    const pyfile: string = "./source/unittests/datacollectors/unittests.py";

    // valid json objects matching pyfile
    // const monkey: any = {name: "Banana", age: 3};
    // const person: Array<any> = [{name: "Joey Zap", age: 5}, {name: "Ren", age: 22}];

    // python shell
    const pyshell: PythonShellJsonDataCollector = new PythonShellJsonDataCollector(pyfile, "*");

    describe("Pre-requisite(s)", () =>
    {
        it("python test file exists", () =>
        {
            assert.equal(fs.existsSync(pyfile), true);
        });
    });

    describe("Receive JSON Objects", () =>
    {
        it("should receive correct # and identical json objects to ones sent", (done: Function) =>
        {
            var counter = 1;
            pyshell.Initialize(new Date("2018-01-01"), new Date());
            pyshell.GetStream()
                .on("data", (data: any) =>
                {
                    if (counter++ == 1)
                    {
                        assert.equal(data.name, "Banana");
                        assert.equal(data.age, 3);
                    }
                    if (counter == 3)
                    {
                        done();
                    }
                });
        }),

        it("should throw error and no data when python sends invalid json objects", (done: Function) =>
        {
            pyshell.Initialize(new Date("2018-01-02"), new Date());
            pyshell.GetStream()
                .on("data", (data: any) =>
                {
                    assert.equal(true, false);
                    done();
                })
                .on("error", (err: any) =>
                {
                    if (!/Invalid JSON/.test(err.message))
                    {
                        assert.equal(true, false);
                    }
                    done();
                });
        }),

        it("should throw 'exited with code 10' error when python script crashes from sys.exit(10)", (done: Function) =>
        {
            pyshell.Initialize(new Date("2018-01-03"), new Date());
            pyshell.GetStream()
                .on("data", (data: any) => {})
                .on("error", (err: Error) =>
                {
                    if (!/exited with code 10/.test(err.message))
                    {
                        assert.equal(true, false);
                    }
                    done();
                });
        });

        it("should throw 'ZeroDivisionError' when python script crashes from division by zero", (done: Function) =>
        {
            pyshell.Initialize(new Date("2018-01-04"), new Date());
            pyshell.GetStream()
                .on("data", (data: any) => {})
                .on("error", (err: any) =>
                {
                    if (!/ZeroDivisionError/.test(err.message))
                    {
                        assert.equal(true, false);
                    }
                    done();
                });
        });
    });
});