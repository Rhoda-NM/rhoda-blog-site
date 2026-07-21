import type { SchemaTypeDefinition } from "sanity";

import { articleType } from "./article";
import { categoryType } from "./category";
import { seriesType } from "./series";
import { tagType } from "./tag";
import { flowDiagramType } from "./flowDiagram";


export const schema: {
  types: SchemaTypeDefinition[];
} = {
  types: [articleType, categoryType, seriesType, tagType, flowDiagramType],
};