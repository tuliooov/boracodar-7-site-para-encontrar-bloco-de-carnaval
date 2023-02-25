import { v4 as uuidV4 } from 'uuid'
import formidable from "formidable";
import path from "path";

import next, { NextApiRequest } from "next";

export function parseBody(
    req: NextApiRequest,
): Promise<{ fields: formidable.Fields; files: formidable.Files }> {
    const options: formidable.Options = {
        uploadDir: path.join(process.cwd(), "/public/uploads"),
        filename: (name, ext, path) => {
            return `${uuidV4()}.jpeg`
        },
        multiples: false,
    }
    const form = formidable(options);
    return new Promise((resolve, reject) => {
        form.parse(req, (err, fields, files) => {
            if (err) reject(err);
            resolve({ fields, files });
        });
    });
};