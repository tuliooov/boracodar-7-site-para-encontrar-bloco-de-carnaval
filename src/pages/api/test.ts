import { NextApiHandler } from "next";
import prismaClient from "@/lib/prisma"

export const config = {
    api: {
        bodyParser: false,
    },
};

const handler: NextApiHandler = async (_req, res) => {
    res.json({ done: "ok" });
};

export default handler;