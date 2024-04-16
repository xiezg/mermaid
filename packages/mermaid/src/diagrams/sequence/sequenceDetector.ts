import type {
  DiagramDetector,
  DiagramLoader,
  ExternalDiagramDefinition,
} from '../../diagram-api/types.js';

const id = 'sequence';

const detector: DiagramDetector = (txt) => {
  return /^\s*sequenceDiagram/.test(txt);
};

const loader: DiagramLoader = async () => {
  const { diagram } = await import('./sequenceDiagram.js');
  return { id, diagram };
};

const plugin: ExternalDiagramDefinition = {
  id,
  detector,
  loader,
};

export default plugin;
