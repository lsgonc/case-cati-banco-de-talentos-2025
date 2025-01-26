import { z } from 'zod';

const createListBodySchema = z.object({
  title: z.string(),
});

const updateListParamSchema = z.object({
  id: z.string().uuid(),
});

const updateListBodySchema = z.object({
  title: z.string(),
});

const deleteListParamSchema = z.object({
  id: z.string().uuid(),
});

const getListByIdParamSchema = z.object({
  id: z.string().uuid(),
});

type CreateListBodySchema = z.infer<typeof createListBodySchema>;
type UpdateListParamSchema = z.infer<typeof updateListParamSchema>;
type UpdateListBodySchema = z.infer<typeof updateListBodySchema>;
type DeleteListParamSchema = z.infer<typeof deleteListParamSchema>;
type GetListByIdParamSchema = z.infer<typeof getListByIdParamSchema>;

export {
  createListBodySchema,
  updateListParamSchema,
  updateListBodySchema,
  deleteListParamSchema,
  getListByIdParamSchema,
  CreateListBodySchema,
  UpdateListParamSchema,
  UpdateListBodySchema,
  DeleteListParamSchema,
  GetListByIdParamSchema,
};
