import fs from "fs";
import path from "path";

export function saveOrganizationId(organizationId: string): void {
    fs.writeFile(
        path.resolve(__dirname, `organizationID.txt`),
        `${organizationId}`,
        "utf8",
        function (err) {
            if (err) {
                return console.error(err);
            }
            console.log("File created!");
        },
    );
}