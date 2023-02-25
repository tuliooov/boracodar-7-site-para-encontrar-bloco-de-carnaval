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
    nameBanner?: string,
    positionLng: string,
    positionLat: string,
    description: string
}


const handler: NextApiHandler = async (req, res) => {

    if (req.method === 'POST') {

        

        const requestBody = await parseBody(req) as any;

        const {
            state,
            name,
            positionLat,
            positionLng,
            description,
            nameBanner
        } = requestBody.fields as CreateBlockFields

        if (
            !state || !name || !positionLat || !positionLng
        ) {
            return res.status(200).json({ error: `Formulário incompleto.` })
        }

        await prismaClient.carnivalBlock.create({
            data: {
                state,
                name,
                positionLat,
                positionLng,
                description,
                imageName: nameBanner || 'default.png',
            }
        })

        res.json({ done: "ok" });
    } else {
        res.status(405).json({ error: `Method '${req.method}' Not Allowed` })
    }

};

export default handler;