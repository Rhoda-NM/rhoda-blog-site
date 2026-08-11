import type { SchemaTypeDefinition } from "sanity";

import { articleType } from "./article";
import { categoryType } from "./category";
import { seriesType } from "./series";
import { tableType } from "./table";
import { tagType } from "./tag";



export const schema: {
  types: SchemaTypeDefinition[];
} = {
  types: [articleType, categoryType, seriesType, tagType, tableType],
};
