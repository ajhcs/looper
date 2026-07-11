const endpointPairs = (...pairs) => pairs.map(([sourceKind, targetKind]) => Object.freeze({ sourceKind, targetKind }));

// The core vocabulary intentionally records semantics separately from the
// direction used for universal neighborhood navigation.
export const relationshipVocabularyRegistry = new Map([
  ["core.relationships.v1", {
    definitions: [
      definition("contains", "contains", "contained by", endpointPairs(["System Component", "System Component"]), "States structural containment."),
      definition("uses", "uses", "is used by", endpointPairs(["Surface", "Interface"], ["Interface", "System Component"], ["Workflow", "Concept"], ["Workflow", "System Component"], ["Concept", "Concept"], ["System Component", "Code Area"], ["System Component", "System Component"]), "States that the source relies on the target."),
      definition("flows_to", "flows to", "flows from", endpointPairs(), "States that information or work flows from source to target; endpoint pairs require an explicit registration."),
      definition("derives_from", "derives from", "derived by", endpointPairs(), "States that the source is derived from the target; endpoint pairs require an explicit registration."),
      definition("satisfies", "satisfies", "satisfied by", endpointPairs(), "States that the source satisfies the target requirement or constraint; endpoint pairs require an explicit registration."),
      definition("implements", "implements", "implemented by", endpointPairs(["Code Area", "Surface"], ["Code Area", "System Component"], ["Code Area", "Data Source"], ["Concept", "Data Source"]), "States that code or a controlled concept realizes the target."),
      definition("verifies", "verifies", "verified by", endpointPairs(), "States that the source verifies the target; endpoint pairs require an explicit registration."),
      definition("constrains", "constrains", "constrained by", endpointPairs(), "States that the source constrains the target; endpoint pairs require an explicit registration."),
      definition("protects", "protects", "protected by", endpointPairs(["System Component", "Interface"], ["Code Area", "System Component"]), "States that the source protects the target."),
      definition("risks", "risks", "at risk from", endpointPairs(["Risk", "Metric"], ["Risk", "Data Source"], ["Unknown", "Interface"], ["Unknown", "Workflow"], ["System Component", "Workflow"]), "States that the source is a risk or unknown affecting the target."),
      definition("depends_on", "depends on", "depended on by", endpointPairs(["Concept", "Concept"], ["Workflow", "Interface"]), "States a direct dependency.")
    ]
  }],
  ["system-map.relationships.v1", {
    definitions: [
      definition("feeds", "feeds", "fed by", endpointPairs(["Metric", "Concept"], ["Data Source", "Data Source"], ["Data Source", "Surface"], ["Data Source", "System Component"], ["Data Source", "Workflow"], ["Workflow", "Workflow"]), "Legacy System Map flow relationship.", "flows_to"),
      definition("transforms", "transforms", "transformed by", endpointPairs(["System Component", "Data Source"], ["Workflow", "Data Source"]), "Legacy System Map transformation relationship.", "derives_from"),
      definition("exposes", "exposes", "exposed by", endpointPairs(["System Component", "Interface"], ["Surface", "Workflow"]), "Legacy System Map exposure relationship."),
      definition("measures", "measures", "measured by", endpointPairs(["Surface", "Metric"], ["Workflow", "Metric"]), "Legacy System Map measurement relationship."),
      definition("unknown", "has unknown relationship to", "has unknown relationship from", endpointPairs(), "Legacy System Map unknown relationship; endpoint pairs require an explicit registration.")
    ]
  }]
]);

export function getRelationshipDefinition(relationshipType, extensionIds = []) {
  for (const vocabularyId of ["core.relationships.v1", ...extensionIds]) {
    const definition = relationshipVocabularyRegistry.get(vocabularyId)?.definitions
      .find((candidate) => candidate.id === relationshipType);
    if (definition) return definition;
  }
  return null;
}

export function validateRelationship({ relationshipType, sourceKind, targetKind, inverseLabel }, extensionIds = []) {
  const definition = getRelationshipDefinition(relationshipType, extensionIds);
  if (!definition) {
    return [`relationship type ${relationshipType ?? "(missing)"} is not registered in the controlled vocabulary`];
  }

  const diagnostics = [];
  if (!definition.endpointPairs.some((pair) => pair.sourceKind === sourceKind && pair.targetKind === targetKind)) {
    diagnostics.push(`relationship type ${relationshipType} does not allow ${sourceKind ?? "(missing)"} -> ${targetKind ?? "(missing)"}`);
  }
  if (inverseLabel !== undefined && inverseLabel !== definition.inverseLabel) {
    diagnostics.push(`relationship type ${relationshipType} inverse label must be "${definition.inverseLabel}"`);
  }
  return diagnostics;
}

export function deriveDependencyDirection(relationship, selectedElementId) {
  if (selectedElementId === relationship.from) {
    return { group: "Depends On", relatedElementId: relationship.to };
  }
  if (selectedElementId === relationship.to) {
    return { group: "Depended On By", relatedElementId: relationship.from };
  }
  return null;
}

function definition(id, forwardLabel, inverseLabel, validEndpointPairs, intendedUse, canonicalRelationshipType = id) {
  return Object.freeze({
    id,
    forwardLabel,
    inverseLabel,
    sourceKinds: [...new Set(validEndpointPairs.map((pair) => pair.sourceKind))],
    targetKinds: [...new Set(validEndpointPairs.map((pair) => pair.targetKind))],
    endpointPairs: validEndpointPairs,
    intendedUse,
    canonicalRelationshipType
  });
}
