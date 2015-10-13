import expect from 'expect';
import jsdomReact from '../jsdomReact';
import React from 'react/addons';
import WikiTextInput from '../../components/WikiTextInput';

const { TestUtils } = React.addons;

function setup(propOverrides) {
  const props = Object.assign({
    onSave: expect.createSpy(),
    text: 'Sample page',
    placeholder: 'Page title',
    editing: false,
    newPage: false
  }, propOverrides);

  const renderer = TestUtils.createRenderer();

  renderer.render(
    <WikiTextInput {...props} />
  );

  let output = renderer.getRenderOutput();

  output = renderer.getRenderOutput();

  return {
    props: props,
    output: output,
    renderer: renderer
  };
}

describe('components', () => {
  jsdomReact();

  describe('WikiTextInput', () => {
    it('should render correctly', () => {
      const { output } = setup();
      expect(output.props.placeholder).toEqual('Page title');
      expect(output.props.value).toEqual('Sample page');
      expect(output.props.className).toEqual('');
    });

    it('should render correctly when editing=true', () => {
      const { output } = setup({ editing: true });
      expect(output.props.className).toEqual('edit');
    });

    it('should render correctly when newPage=true', () => {
      const { output } = setup({ newPage: true });
      expect(output.props.className).toEqual('new-page');
    });

    it('should update value on change', () => {
      const { output, renderer } = setup();
      output.props.onChange({ target: { value: 'Use it' }});
      const updated = renderer.getRenderOutput();
      expect(updated.props.value).toEqual('Use it');
    });

    it('should call onSave on return key press', () => {
      const { output, props } = setup();
      output.props.onKeyDown({ which: 13, target: { value: 'Sample page' }});
      expect(props.onSave).toHaveBeenCalledWith('Sample page');
    });

    it('should reset state on return key press if newPage', () => {
      const { output, renderer } = setup({ newPage: true });
      output.props.onKeyDown({ which: 13, target: { value: 'Sample page' }});
      const updated = renderer.getRenderOutput();
      expect(updated.props.value).toEqual('');
    });

    it('should call onSave on blur', () => {
      const { output, props } = setup();
      output.props.onBlur({ target: { value: 'Sample page' }});
      expect(props.onSave).toHaveBeenCalledWith('Sample page');
    });

    it('shouldnt call onSave on blur if newPage', () => {
      const { output, props } = setup({ newPage: true });
      output.props.onBlur({ target: { value: 'Sample page' }});
      expect(props.onSave.calls.length).toBe(0);
    });
  });
});
