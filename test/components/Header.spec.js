import expect from 'expect';
import jsdomReact from '../jsdomReact';
import React from 'react/addons';
import Header from '../../components/Header';
import WikiTextInput from '../../components/WikiTextInput';

const { TestUtils } = React.addons;

function setup() {
  const props = {
    addPage: expect.createSpy()
  };

  const renderer = TestUtils.createRenderer();
  renderer.render(<Header {...props} />);
  const output = renderer.getRenderOutput();

  return {
    props: props,
    output: output,
    renderer: renderer
  };
}

describe('components', () => {
  jsdomReact();

  describe('Header', () => {
    it('should render correctly', () => {
      const { output } = setup();

      expect(output.type).toBe('header');
      expect(output.props.className).toBe('header');

      const [h1, input] = output.props.children;

      expect(h1.type).toBe('h1');
      expect(h1.props.children).toBe('WikiPages');

      expect(input.type).toBe(WikiTextInput);
      expect(input.props.newPage).toBe(true);
      expect(input.props.placeholder).toBe('Page title');
    });

    it('should call call addPage if length of text is greater than 0', () => {
      const { output, props } = setup();
      const input = output.props.children[1];
      input.props.onSave('');
      expect(props.addPage.calls.length).toBe(0);
      input.props.onSave('Sample page');
      expect(props.addPage.calls.length).toBe(1);
    });
  });
});
