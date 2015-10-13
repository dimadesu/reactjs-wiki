import expect from 'expect';
import jsdomReact from '../jsdomReact';
import React from 'react/addons';
import MainSection from '../../components/MainSection';
import WikiPage from '../../components/WikiPage';
import Footer from '../../components/Footer';
import { SHOW_ALL, SHOW_ARCHIVED } from '../../constants/PageFilters';

const { TestUtils } = React.addons;

function setup(propOverrides) {
  const props = Object.assign({
    pages: [{
      text: 'Sample page',
      archived: false,
      id: 0
    }, {
      text: 'Run the tests',
      archived: true,
      id: 1
    }],
    actions: {
      editPage: expect.createSpy(),
      deletePage: expect.createSpy(),
      archivePage: expect.createSpy(),
      emptyArchive: expect.createSpy()
    }
  }, propOverrides);

  const renderer = TestUtils.createRenderer();
  renderer.render(<MainSection {...props} />);
  const output = renderer.getRenderOutput();

  return {
    props: props,
    output: output,
    renderer: renderer
  };
}

describe('components', () => {
  jsdomReact();

  describe('MainSection', () => {
    it('should render container', () => {
      const { output } = setup();
      expect(output.type).toBe('section');
      expect(output.props.className).toBe('main');
    });

    describe('toggle all input', () => {
      it('should render', () => {
        const { output } = setup();
        const [toggle] = output.props.children;
        expect(toggle.type).toBe('input');
        expect(toggle.props.type).toBe('checkbox');
        expect(toggle.props.checked).toBe(false);
      });

      it('should be checked if all pages archived', () => {
        const { output } = setup({ pages: [{
          text: 'Sample page',
          archived: true,
          id: 0
        }]});
        const [toggle] = output.props.children;
        expect(toggle.props.checked).toBe(true);
      });

      /*it('should call archiveAll on change', () => {
        const { output, props } = setup();
        const [toggle] = output.props.children;
        toggle.props.onChange({});
        expect(props.actions.archiveAll).toHaveBeenCalled();
      });*/
    });

    describe('footer', () => {
      it('should render', () => {
        const { output } = setup();
        const [,, footer] = output.props.children;
        expect(footer.type).toBe(Footer);
        expect(footer.props.archivedCount).toBe(1);
        expect(footer.props.activeCount).toBe(1);
        expect(footer.props.filter).toBe(SHOW_ALL);
      });

      it('onShow should set the filter', () => {
        const { output, renderer } = setup();
        const [,, footer] = output.props.children;
        footer.props.onShow(SHOW_ARCHIVED);
        const updated = renderer.getRenderOutput();
        const [,, updatedFooter] = updated.props.children;
        expect(updatedFooter.props.filter).toBe(SHOW_ARCHIVED);
      });

      it('onEmptyArchived should call emptyArchive', () => {
        const { output, props } = setup();
        const [,, footer] = output.props.children;
        footer.props.onEmptyArchived();
        expect(props.actions.emptyArchive).toHaveBeenCalled();
      });

      it('onEmptyArchived shouldnt call emptyArchive if no pages archived', () => {
        const { output, props } = setup({ pages: [{
          text: 'Sample page',
          archived: false,
          id: 0
        }]});
        const [,, footer] = output.props.children;
        footer.props.onEmptyArchived();
        expect(props.actions.emptyArchive.calls.length).toBe(0);
      });
    });

    describe('page list', () => {
      it('should render', () => {
        const { output, props } = setup();
        const [, list] = output.props.children;
        expect(list.type).toBe('ul');
        expect(list.props.children.length).toBe(2);
        list.props.children.forEach((item, i) => {
          expect(item.type).toBe(WikiPage);
          expect(item.props.page).toBe(props.pages[i]);
        });
      });

      it('should filter items', () => {
        const { output, renderer, props } = setup();
        const [,, footer] = output.props.children;
        footer.props.onShow(SHOW_ARCHIVED);
        const updated = renderer.getRenderOutput();
        const [, updatedList] = updated.props.children;
        expect(updatedList.props.children.length).toBe(1);
        expect(updatedList.props.children[0].props.page).toBe(props.pages[1]);
      });
    });
  });
});
