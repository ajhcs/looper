---
Status: superseded by ADR-0002
---

# Render System Maps From A Typed Source

System Understanding Maps use a strict typed YAML/JSON Map Source as the source of truth, with D2 as the first visual renderer and Mermaid as a compatibility export. This keeps the model computable and validatable while still producing useful diagrams; React Flow may become a later interactive renderer if progressive visual disclosure needs a richer end-user experience than D2 can provide.

**Considered Options**: Mermaid as source, D2 as source, Structurizr/C4, React Flow as source, renderer-neutral typed source with D2/Mermaid adapters.

**Consequences**: Map validation, proof, and traceability live in the typed source rather than in diagram syntax. D2 diagrams are generated artifacts, not canonical model files.
