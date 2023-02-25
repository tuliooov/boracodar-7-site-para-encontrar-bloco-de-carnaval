import { v4 as uuidV4 } from 'uuid'
import next, { NextApiHandler } from "next";
import fs from "fs/promises";
import { parseBody } from "@/utils/parseBody"
import prismaClient from "@/lib/prisma"
import { storage } from "@/firebase/config";
import { ref, uploadBytes, uploadString } from "@firebase/storage";
import { randomUUID } from "crypto";
import formidable from 'formidable';
import path from 'path';

export const config = {
    api: {
        bodyParser: false,
    },
};

interface CreateBlockFields {
    name?: string
    state?: string,
    positionLng: string,
    positionLat: string,
    description: string
}


const handler: NextApiHandler = async (req, res) => {

    if (req.method === 'POST') {

        

        const requestBody = await parseBody(req) as any;

        const allowedMimes = [
            "image/jpeg",
            "image/pjpeg",
            "image/png",
            "image/jpg"
        ];
        if(requestBody.files.banner){
            if (!allowedMimes.includes(requestBody.files.banner.mimetype)) {
                await fs.unlink(requestBody.files.banner.filepath)
                return res.status(501).json({ error: `Arquivo não autorizado.` })
            }


            // const file = requestBody.files.banner
            const file = require('../../../public/uploads/default.png')
            const organizationId = 'bora-codar-7';
            const path = `/${organizationId}/${file.newFilename}`;
            const reference = ref(storage, path);
        

            uploadBytes(reference, file, {
                cacheControl: 'max-age=31536000',
                customMetadata: {
                  organizationId,
                },
              }).then((snapshot) => {
                console.log('Uploaded a blob or file!');
            });

        }

        const {
            state,
            name,
            positionLat,
            positionLng,
            description
        } = requestBody.fields as CreateBlockFields

        if (
            !state || !name || !positionLat || !positionLng
        ) {
            if(requestBody.files.banner){
                await fs.unlink(requestBody.files.banner?.filepath)
            }
            return res.status(200).json({ error: `Formulário incompleto.` })
        }

        await prismaClient.carnivalBlock.create({
            data: {
                state,
                name,
                positionLat,
                positionLng,
                description,
                imageName: requestBody.files.banner?.newFilename || 'default.png',
            }
        })

        res.json({ done: "ok" });
    } else {
        res.status(405).json({ error: `Method '${req.method}' Not Allowed` })
    }

};

export default handler;