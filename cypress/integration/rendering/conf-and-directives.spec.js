import { imgSnapshotTest, urlSnapshotTest } from '../../helpers/util.ts';

describe('Configuration and directives - nodes should be light blue', () => {
  it('No config - use default', () => {
    imgSnapshotTest(
      `
      graph TD
          A(Default) --> B[/Another/]
          A --> C[End]
          subgraph section
            B
            C
          end
        `,
      {}
    );
  });
  it('Settings from initialize - nodes should be green', () => {
    imgSnapshotTest(
      `
graph TD
          A(Forest) --> B[/Another/]
          A --> C[End]
          subgraph section
            B
            C
          end          `,
      { theme: 'forest' }
    );
  });
  it('Settings from initialize overriding themeVariable - nodes should be red', () => {
    imgSnapshotTest(
      `


        %%{init: { 'theme': 'base', 'themeVariables':{ 'primaryColor': '#ff0000'}}}%%
graph TD
          A(Start) --> B[/Another/]
          A[/Another/] --> C[End]
          subgraph section
            B
            C
          end
        `,
      { theme: 'base', themeVariables: { primaryColor: '#ff0000' }, logLevel: 0 }
    );
  });
  it('Settings from directive - nodes should be grey', () => {
    imgSnapshotTest(
      `
        %%{init: { 'logLevel': 0, 'theme': 'neutral'} }%%
graph TD
          A(Start) --> B[/Another/]
          A[/Another/] --> C[End]
          subgraph section
            B
            C
          end
        `,
      {}
    );
  });
  it('Settings from frontmatter - nodes should be grey', () => {
    imgSnapshotTest(
      `
---
config:
  theme: neutral
---
graph TD
          A(Start) --> B[/Another/]
          A[/Another/] --> C[End]
          subgraph section
            B
            C
          end
        `,
      {}
    );
  });

  it('Settings from directive overriding theme variable - nodes should be red', () => {
    imgSnapshotTest(
      `
          %%{init: {'theme': 'base', 'themeVariables':{ 'primaryColor': '#ff0000'}}}%%
graph TD
          A(Start) --> B[/Another/]
          A[/Another/] --> C[End]
          subgraph section
            B
            C
          end
        `,
      {}
    );
  });
  it('Settings from initialize and directive - nodes should be grey', () => {
    imgSnapshotTest(
      `
      %%{init: { 'logLevel': 0, 'theme': 'neutral'} }%%
graph TD
          A(Start) --> B[/Another/]
          A[/Another/] --> C[End]
          subgraph section
            B
            C
          end
        `,
      { theme: 'forest' }
    );
  });
  it('Theme from initialize, directive overriding theme variable - nodes should be red', () => {
    imgSnapshotTest(
      `
      %%{init: {'theme': 'base', 'themeVariables':{ 'primaryColor': '#ff0000'}}}%%
graph TD
          A(Start) --> B[/Another/]
          A[/Another/] --> C[End]
          subgraph section
            B
            C
          end
        `,
      { theme: 'base' }
    );
  });
  it('Theme from initialize, frontmatter overriding theme variable - nodes should be red', () => {
    imgSnapshotTest(
      `
---
config:
  theme: base
  themeVariables:
    primaryColor: '#ff0000'
---
graph TD
          A(Start) --> B[/Another/]
          A[/Another/] --> C[End]
          subgraph section
            B
            C
          end
        `,
      { theme: 'forest' }
    );
  });
  it('Theme from initialize, frontmatter overriding theme variable, directive overriding primaryColor - nodes should be red', () => {
    imgSnapshotTest(
      `
---
config:
  theme: base
  themeVariables:
    primaryColor: '#00ff00'
---
%%{init: {'theme': 'base', 'themeVariables':{ 'primaryColor': '#ff0000'}}}%%
graph TD
          A(Start) --> B[/Another/]
          A[/Another/] --> C[End]
          subgraph section
            B
            C
          end
        `,
      { theme: 'forest' }
    );
  });

  it('should render if values are not quoted properly', () => {
    // #ff0000 is not quoted properly, and will evaluate to null.
    // This test ensures that the rendering still works.
    imgSnapshotTest(
      `---
config:
  theme: base
  themeVariables:
    primaryColor: #ff0000
---
graph TD
          A(Start) --> B[/Another/]
          A[/Another/] --> C[End]
          subgraph section
            B
            C
          end
        `,
      { theme: 'forest' }
    );
  });

  it('Theme variable from initialize, theme from directive - nodes should be red', () => {
    imgSnapshotTest(
      `
      %%{init: { 'logLevel': 0, 'theme': 'base'} }%%
graph TD
          A(Start) --> B[/Another/]
          A[/Another/] --> C[End]
          subgraph section
            B
            C
          end
        `,
      { themeVariables: { primaryColor: '#ff0000' } }
    );
  });
  describe('when rendering several diagrams', () => {
    it('diagrams should not taint later diagrams', () => {
      const url = 'http://localhost:9000/theme-directives.html';
      urlSnapshotTest(url, {});
    });
  });
});
