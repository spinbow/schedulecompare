import type { AnyRelationsBuilderConfig } from 'drizzle-orm';

// cursed relation merging typing and logic made by codex so our relations can be a bit cleaner.
// i'll add a special !AI flag here since this was written with AI.
// i think the use of AI here is justifiable IMO since this isn't strictly needed,
// but it makes relations a bit more manageable and maintainable
// - Harper

type RelationConfig = AnyRelationsBuilderConfig;

type Prettify<T> = {
  [Key in keyof T]: T[Key];
};

type UnionToIntersection<TUnion> = (
  TUnion extends unknown ? (value: TUnion) => void : never
) extends (value: infer TIntersection) => void
  ? TIntersection
  : never;

type RelationFieldsForTable<
  TConfig,
  TTableName extends PropertyKey,
> = TConfig extends RelationConfig
  ? TTableName extends keyof TConfig
    ? NonNullable<TConfig[TTableName]>
    : never
  : never;

type MergedRelationConfigs<TConfigs extends readonly RelationConfig[]> = Prettify<{
  [TTableName in keyof UnionToIntersection<TConfigs[number]>]: Prettify<
    UnionToIntersection<RelationFieldsForTable<TConfigs[number], TTableName>>
  >;
}>;

/**
 * Merges scoped Drizzle relation configs without widening their relation keys.
 *
 * Generic deep-merge libraries lose the literal return type that Drizzle uses
 * to type relational queries, which turns valid `with` clauses into `never`.
 * This helper only supports the relation-config shape we use: table names at
 * the top level and relation fields one level below.
 */
export function mergeRelationConfigs<const TConfigs extends readonly RelationConfig[]>(
  ...configs: TConfigs
): MergedRelationConfigs<TConfigs> {
  const merged: RelationConfig = {};

  for (const config of configs) {
    mergeConfigInto(merged, config);
  }

  return merged as MergedRelationConfigs<TConfigs>;
}

function mergeConfigInto(target: RelationConfig, source: RelationConfig) {
  for (const [tableName, tableRelations] of Object.entries(source)) {
    if (!tableRelations) {
      continue;
    }

    target[tableName] = {
      ...target[tableName],
      ...tableRelations,
    };
  }
}
