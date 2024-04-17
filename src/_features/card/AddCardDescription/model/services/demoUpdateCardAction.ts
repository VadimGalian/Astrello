"use server";

import { auth } from "@clerk/nextjs";
import { revalidatePath } from "next/cache";
import { db } from "@/_shared/config/db";
import { createSafeAction } from "@/_shared/lib/createSafeAction";
import { UpdateCardSchema } from "../types/schema";
import { InputType, ReturnType } from "../types/types";
import { createAuditLog } from "@/_shared/lib/createAuditLog";
import { ACTION, ENTITY_TYPE } from "@prisma/client";

const handler = async (data: InputType): Promise<ReturnType> => {
  const { id, boardId, ...values } = data;
  let card;

  try {
    card = await db.card.update({
      where: {
        id,
        list: {
          board: {
            orgId: "111"
          }
        }
      },
      data: {
        ...values
      }
    });

    await createAuditLog({
      entityTitle: card.title,
      entityId: card.id,
      entityType: ENTITY_TYPE.CARD,
      action: ACTION.UPDATE
    });
  } catch (error) {
    return {
      error: "Failed to update."
    };
  }

  revalidatePath(`/board/${boardId}`);
  return { data: card };
};

export const updateCardAction = createSafeAction(UpdateCardSchema, handler);