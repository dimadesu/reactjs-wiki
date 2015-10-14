import expect from 'expect';
import jsdomReact from '../jsdomReact';
import React from 'react/addons';
import WikiPage from '../../components/WikiPage';
import WikiTextInput from '../../components/WikiTextInput';

const { TestUtils } = React.addons;

function setup( editing = false ) {
  const props = {
    page: {
      id: 0,
      text: 'Sample page',
      bookmarked: false
    },
    editPage: expect.createSpy(),
    deletePage: expect.createSpy(),
    bookmarkPage: expect.createSpy()
  };

  const renderer = TestUtils.createRenderer();

  renderer.render(
    <WikiPage {...props} />
  );

  let output = renderer.getRenderOutput();

  if (editing) {
    const label = output.props.children.props.children[1];
    label.props.onDoubleClick({});
    output = renderer.getRenderOutput();
  }

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

    it('label onDoubleClick should put component in edit state', () => {
      const { output, renderer } = setup();
      const label = output.props.children.props.children[1];
      label.props.onDoubleClick({});
      const updated = renderer.getRenderOutput();
      expect(updated.type).toBe('li');
      expect(updated.props.className).toBe('editing');
    });

    it('edit state render', () => {
      const { output } = setup(true);

      expect(output.type).toBe('li');
      expect(output.props.className).toBe('editing');

      const input = output.props.children;
      expect(input.type).toBe(WikiTextInput);
      expect(input.props.text).toBe('Sample page');
      expect(input.props.editing).toBe(true);
    });

    it('WikiTextInput onSave should call editPage', () => {
      const { output, props } = setup(true);
      output.props.children.props.onSave('Sample page');
      expect(props.editPage).toHaveBeenCalledWith(0, 'Sample page');
    });

    it('WikiTextInput onSave should call deletePage if text is empty', () => {
      const { output, props } = setup(true);
      output.props.children.props.onSave('');
      expect(props.deletePage).toHaveBeenCalledWith(0);
    });

    it('WikiTextInput onSave should exit component from edit state', () => {
      const { output, renderer } = setup(true);
      output.props.children.props.onSave('Sample page');
      const updated = renderer.getRenderOutput();
      expect(updated.type).toBe('li');
      expect(updated.props.className).toBe('');
    });
  });
});
