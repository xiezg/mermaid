import type {
  DiagramDetector,
  DiagramLoader,
  ExternalDiagramDefinition,
} from '../../diagram-api/types.js';

const id = 'classDiagram';

const detector: DiagramDetector = (txt, config) => {
  // If we have configured to use dagre-wrapper then we should return true in this function for classDiagram code thus making it use the new class diagram
  if (/^\s*classDiagram/.test(txt) && config?.class?.defaultRenderer === 'dagre-wrapper') {
    return true;
  }
  // We have not opted to use the new renderer so we should return true if we detect a class diagram
  return /^\s*classDiagram-v2/.test(txt);
};

const loader: DiagramLoader = async () => {
  const { diagram } = await import('./classDiagram-v2.js');
  return { id, diagram };
};

const plugin: ExternalDiagramDefinition = {
  id,
  detector,
  loader,
};

export default plugin;
