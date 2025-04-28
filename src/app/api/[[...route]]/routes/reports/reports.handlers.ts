import * as HTTPStatusCodes from "stoker/http-status-codes";
import * as HTTPStatusPhrases from "stoker/http-status-phrases";
import { UserRole } from "@prisma/client";
import fs from "fs-extra";
import path from "path";

import db from "../../lib/db";
import { AppRouteHandler } from "../../lib/types";
import { uploadFile } from "../../lib/upload";
import {
  CreateRoute,
  GetOneRoute,
  ListRoute,
  PatchRoute,
  RemoveRoute,
} from "./reports.routes";

export const list: AppRouteHandler<ListRoute> = async (c) => {
  const query = c.req.valid("query");

  const reports = await db.report.findMany({
    where: {
      title: {
        contains: query.search,
        mode: "insensitive",
      },
    },
    orderBy: {
      createdAt: query.search === "desc" ? "desc" : "asc",
    },
  });

  return c.json({ data: reports }, HTTPStatusCodes.OK);
};

export const getOne: AppRouteHandler<GetOneRoute> = async (c) => {
  const params = c.req.valid("param");

  const report = await db.report.findUnique({
    where: {
      id: params.id,
    },
    include: {
      user: true,
    },
  });

  if (!report)
    return c.json(
      { message: HTTPStatusPhrases.NOT_FOUND },
      HTTPStatusCodes.NOT_FOUND
    );

  return c.json({ data: report }, HTTPStatusCodes.OK);
};

export const create: AppRouteHandler<CreateRoute> = async (c) => {
  const form = c.req.valid("form");
  const user = c.get("user")!;

  let fileName: string | undefined;

  if (form.image) {
    const upload = await uploadFile(form.image);

    fileName = upload.fileName;
  }

  const report = await db.report.create({
    data: {
      ...form,
      image: fileName,
      userId: user.id,
    },
  });

  return c.json({ data: report }, HTTPStatusCodes.CREATED);
};

export const patch: AppRouteHandler<PatchRoute> = async (c) => {
  const params = c.req.valid("param");
  const form = c.req.valid("form");
  const user = c.get("user")!;

  const report = await db.report.findUnique({
    where: {
      id: params.id,
    },
  });

  if (!report)
    return c.json(
      { message: HTTPStatusPhrases.NOT_FOUND },
      HTTPStatusCodes.NOT_FOUND
    );

  if (report.userId !== user.id)
    return c.json(
      { message: HTTPStatusPhrases.FORBIDDEN },
      HTTPStatusCodes.FORBIDDEN
    );

  let fileName: string | undefined;

  if (form.image) {
    const upload = await uploadFile(form.image);

    fileName = upload.fileName;
  }

  const updatedReport = await db.report.update({
    where: {
      id: params.id,
    },
    data: {
      ...form,
      image: fileName,
    },
  });

  return c.json({ data: updatedReport }, HTTPStatusCodes.OK);
};

export const remove: AppRouteHandler<RemoveRoute> = async (c) => {
  const params = c.req.valid("param");
  const user = c.get("user")!;

  const report = await db.report.findUnique({
    where: {
      id: params.id,
    },
  });

  if (!report)
    return c.json(
      { message: HTTPStatusCodes.NOT_FOUND },
      HTTPStatusCodes.NOT_FOUND
    );

  if (report.userId !== user.id && user.role !== UserRole.admin)
    return c.json(
      { message: HTTPStatusCodes.FORBIDDEN },
      HTTPStatusCodes.FORBIDDEN
    );

  await db.report.delete({
    where: {
      id: params.id,
    },
  });

  if (report.image) await fs.remove(path.join("./", "public", report.image));

  return c.body(null, HTTPStatusCodes.NO_CONTENT);
};
