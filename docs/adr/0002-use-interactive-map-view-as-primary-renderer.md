# Use Interactive Map View As Primary Renderer

System Understanding Maps still use a strict typed YAML/JSON Map Source as the source of truth, but the primary user-facing renderer is now an interactive HTML/JS map view rather than generated D2/SVG artifacts. D2 and SVG support should be removed instead of kept as a parallel visual system, because the static renderer adds toolchain weight and maintenance surface without satisfying the needed clickable, drilldown-oriented map experience. Cytoscape.js is the first renderer library because System Mapper needs a generated local graph view, not an editable React application; AI agents remain responsible for editing the Map Source.

**Considered Options**: Keep D2/SVG as primary output, keep D2/SVG as optional smoke artifacts, replace D2/SVG with an interactive HTML/JS view, use Cytoscape.js, use React Flow for an editable React app, keep Mermaid as a rough chat/docs preview.

**Consequences**: Renderer implementation moves into the local HTML/JS toolchain. Mermaid may remain only as a lightweight compatibility preview if it improves chat-native readability, but it must not constrain the canonical Map Source or the interactive map experience.
