import type { SchemaTypeDefinition } from "sanity";

import { articleType } from "./article";
import { categoryType } from "./category";
import {
  flowDecisionType,
  nestedFlowStepType,
} from "./flow-diagram";
import { seriesType } from "./series";
import { tableType } from "./table";
import { tagType } from "./tag";



export const schema: {
  types: SchemaTypeDefinition[];
} = {
  types: [
    articleType,
    categoryType,
    seriesType,
    tagType,
    tableType,
    nestedFlowStepType,
    flowDecisionType,
  ],
};
