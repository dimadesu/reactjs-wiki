import expect from 'expect';
import jsdomReact from '../jsdomReact';
import React from 'react/addons';
import MainSection from '../../components/MainSection';
import WikiPage from '../../components/WikiPage';
import Footer from '../../components/Footer';
import { SHOW_ALL, SHOW_BOOKMARKED } from '../../constants/PageFilters';

const { TestUtils } = React.addons;

function setup(propOverrides) {
  const props = Object.assign({
    pages: [{
      text: 'Sample page',
      bookmarked: false,
      id: 0
    }, {
      text: 'Run the tests',
      bookmarked: true,
      id: 1
    }],
    actions: {
      deletePage: expect.createSpy(),
      bookmarkPage: expect.createSpy(),
      emptyBookmarks: expect.createSpy()
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

      it('should be checked if all pages bookmarked', () => {
        const { output } = setup({ pages: [{
          text: 'Sample page',
          bookmarked: true,
          id: 0
        }]});
        const [toggle] = output.props.children;
        expect(toggle.props.checked).toBe(true);
      });

      /*it('should call bookmarkAll on change', () => {
        const { output, props } = setup();
        const [toggle] = output.props.children;
        toggle.props.onChange({});
        expect(props.actions.bookmarkAll).toHaveBeenCalled();
      });*/
    });

    describe('footer', () => {
      it('should render', () => {
        const { output } = setup();
        const [,, footer] = output.props.children;
        expect(footer.type).toBe(Footer);
        expect(footer.props.bookmarkedCount).toBe(1);
        expect(footer.props.notBookmarkedCount).toBe(1);
        expect(footer.props.filter).toBe(SHOW_ALL);
      });

      it('onShow should set the filter', () => {
        const { output, renderer } = setup();
        const [,, footer] = output.props.children;
        footer.props.onShow(SHOW_BOOKMARKED);
        const updated = renderer.getRenderOutput();
        const [,, updatedFooter] = updated.props.children;
        expect(updatedFooter.props.filter).toBe(SHOW_BOOKMARKED);
      });

      it('onEmptyBookmarked should call emptyBookmarks', () => {
        const { output, props } = setup();
        const [,, footer] = output.props.children;
        footer.props.onEmptyBookmarked();
        expect(props.actions.emptyBookmarks).toHaveBeenCalled();
      });

      it('onEmptyBookmarked shouldnt call emptyBookmarks if no pages bookmarked', () => {
        const { output, props } = setup({ pages: [{
          text: 'Sample page',
          bookmarked: false,
          id: 0
        }]});
        const [,, footer] = output.props.children;
        footer.props.onEmptyBookmarked();
        expect(props.actions.emptyBookmarks.calls.length).toBe(0);
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
        footer.props.onShow(SHOW_BOOKMARKED);
        const updated = renderer.getRenderOutput();
        const [, updatedList] = updated.props.children;
        expect(updatedList.props.children.length).toBe(1);
        expect(updatedList.props.children[0].props.page).toBe(props.pages[1]);
      });
    });
  });
});
