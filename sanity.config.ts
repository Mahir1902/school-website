// sanity.config.ts
import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";
import { schemaTypes } from "./sanity/schemas";

export default defineConfig({
  name: "default",
  title: "Singapore International School",

  projectId: "m7t9w5hz",
  dataset: "production",

  plugins: [structureTool()],

  schema: {
    types: schemaTypes,  // add your schema types here
  },
});