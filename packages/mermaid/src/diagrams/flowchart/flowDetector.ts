import type {
  DiagramDetector,
  DiagramLoader,
  ExternalDiagramDefinition,
} from '../../diagram-api/types.js';

const id = 'flowchart';

const detector: DiagramDetector = (txt, config) => {
  // If we have conferred to only use new flow charts this function should always return false
  // as in not signalling true for a legacy flowchart
  if (
    config?.flowchart?.defaultRenderer === 'dagre-wrapper' ||
    config?.flowchart?.defaultRenderer === 'elk'
  ) {
    return false;
  }
  return /^\s*graph/.test(txt);
};

const loader: DiagramLoader = async () => {
  const { diagram } = await import('./flowDiagram.js');
  return { id, diagram };
};

const plugin: ExternalDiagramDefinition = {
  id,
  detector,
  loader,
};

export default plugin;
