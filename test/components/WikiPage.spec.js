import expect from 'expect';
import jsdomReact from '../jsdomReact';
import React from 'react/addons';
import WikiPage from '../../components/WikiPage';

const { TestUtils } = React.addons;

function setup() {
  const props = {
    page: {
      id: 0,
      text: 'Sample page',
      bookmarked: false
    },
    deletePage: expect.createSpy(),
    bookmarkPage: expect.createSpy()
  };

  const renderer = TestUtils.createRenderer();

  renderer.render(
    <WikiPage {...props} />
  );

  let output = renderer.getRenderOutput();

  return {
    props: props,
    output: output,
    renderer: renderer
  };
}

describe('components', () => {
  jsdomReact();

  describe('WikiPage', () => {
    it('initial render', () => {
      const { output } = setup();

      expect(output.type).toBe('li');
      expect(output.props.className).toBe('');

      const div = output.props.children;

      expect(div.type).toBe('div');
      expect(div.props.className).toBe('view');

      const [input, label, button] = div.props.children;

      expect(input.type).toBe('input');
      expect(input.props.checked).toBe(false);

      expect(label.type).toBe('label');
      expect(label.props.children).toBe('Sample page');

      expect(button.type).toBe('button');
      expect(button.props.className).toBe('destroy');
    });

    it('input onChange should call bookmarkPage', () => {
      const { output, props } = setup();
      const input = output.props.children.props.children[0];
      input.props.onChange({});
      expect(props.bookmarkPage).toHaveBeenCalledWith(0);
    });

    it('button onClick should call deletePage', () => {
      const { output, props } = setup();
      const button = output.props.children.props.children[2];
      button.props.onClick({});
      expect(props.deletePage).toHaveBeenCalledWith(0);
    });
  });
});
