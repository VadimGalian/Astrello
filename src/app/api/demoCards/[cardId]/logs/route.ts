import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";
import { ENTITY_TYPE } from "@prisma/client";
import { db } from "@/_shared/config/db";

export async function GET(request: Request, { params }: { params: { cardId: string } }) {
  try {
    const auditLogs = await db.auditLog.findMany({
      where: {
        orgId: "111",
        entityId: params.cardId,
        entityType: ENTITY_TYPE.CARD
      },
      orderBy: {
        createdAt: "desc"
      },
      take: 3
    });

    return NextResponse.json(auditLogs);
  } catch (error) {
    return new NextResponse("Internal Error", { status: 500 });
  }
}
